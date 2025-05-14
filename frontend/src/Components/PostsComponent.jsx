import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartOutlined, EllipsisOutlined, CommentOutlined, HeartFilled } from '@ant-design/icons';
import { Avatar, Carousel, Modal, Divider, List, Input, Button, Form, Dropdown, Menu } from 'antd';
import UserService from '../ServiceController/UserServices';
import PostController from '../ServiceController/PostController'; // Import PostController
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import State from '../State/UserState'; // Import State for global state management
import { useSnapshot } from 'valtio';

const PostsComponent = ({ post, onDelete, onPostUpdated }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const userId = post.userId;
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [commentsObject, setCommentsObject] = useState({}); // Store comments as object
  const [commentText, setCommentText] = useState('');
  const [commenterNames, setCommenterNames] = useState({}); // Store names of commenters
  const snap = useSnapshot(State); // Use Valtio for global state management
  const CurrentuserId = snap.userId; // Get userId from global state
  const [commentForm] = Form.useForm();
  const [commentUsers, setCommentUsers] = useState({}); // Store user info for comments

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await UserService.getUserById(userId);
      setUser(response);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }, [userId]);

  const fetchPostComments = useCallback(async () => {
    try {
      const response = await PostController.getPostById(post.id);
      setCommentsObject(response.comments);
      // Fetch user info for each commenter
      if (response.comments) {
        Object.keys(response.comments).forEach(async commenterId => {
          if (!commentUsers[commenterId]) {
            try {
              const userResponse = await UserService.getUserById(commenterId);
              setCommentUsers(prev => ({ ...prev, [commenterId]: userResponse }));
            } catch (error) {
              console.error('Error fetching comment user:', error);
            }
          }
        });
      }
      console.log('Fetched comments:', response.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }, [post.id, commentUsers]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  useEffect(() => {
    if (commentModalVisible) {
      fetchPostComments();
    }
  }, [commentModalVisible, fetchPostComments]);

  const showImageModal = useCallback((index) => {
    setCurrentImageIndex(index);
    setModalVisible(true);
  }, []);

  const handleCancelModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleLike = useCallback(async () => {
    try {
      await PostController.likePost(post.id, CurrentuserId); // Use logged-in user ID for liking
      onPostUpdated();
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  }, [post.id, CurrentuserId, onPostUpdated]);

  const isLiked = useCallback(() => {
    return post.likes && post.likes[CurrentuserId]; // Check if the logged-in user liked it
  }, [post.likes, CurrentuserId]);

  const likeCount = post.likes ? Object.keys(post.likes).length : 0;

  const showCommentModal = useCallback(() => {
    setCommentModalVisible(true);
  }, []);

  const handleCloseCommentModal = useCallback(() => {
    setCommentModalVisible(false);
    setCommentText('');
    commentForm.resetFields();
    setCommentUsers({});
  }, [commentForm]);

  const handleAddComment = useCallback(async (values) => {
    try {
      await PostController.addCommentPost(post.id, CurrentuserId, values.comment);
      setCommentText('');
      commentForm.resetFields();
      fetchPostComments(); // Refresh comments
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  }, [post.id, CurrentuserId, fetchPostComments, commentForm]);

  const getCommentObject = (commentString) => {
    try {
      return JSON.parse(commentString);
    } catch (e) {
      console.error("Error parsing comment:", commentString, e);
      return { comment: "Invalid comment" };
    }
  };

  const commentMenu = (commentId, commentString) => (
    <Menu>
      <Menu.Item key="edit">Edit</Menu.Item>
      <Menu.Item key="delete">Delete</Menu.Item>
    </Menu>
  );

  return (
    <div className=" w-[660px] mt-5 mb-5 rounded-lg shadow-md bg-white p-4">
      <div className="flex justify-between items-center pb-3">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(`/otherUserProfile/${userId}`)}>
          <Avatar size={48} src={`http://localhost:4000/api/v1/${user.profileImg}`} />
          <div>
            <p className="my-0 mx-0 font-semibold">{user.name}</p>
            <p className="my-0 mx-0 text-xs text-gray-500">{user.occupation}</p>
          </div>
        </div>
        <EllipsisOutlined className="text-2xl cursor-pointer" />
      </div>
      <div className="pb-4">
        <p className="text-sm font-normal text-slate-900">{post.caption}</p>
      </div>
      {post.imageUrls && post.imageUrls.length > 0 && (
        <div className="w-full">
          {post.imageUrls.length === 1 ? (
            <img
              className="w-full h-auto object-cover cursor-pointer rounded-md"
              alt="post"
              src={`http://localhost:4000/api/v1/${post.imageUrls[0]}`}
              onClick={() => showImageModal(0)}
            />
          ) : (
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 1200: 2 }}
              gutterBreakPoints={{ 350: "8px", 750: "8px", 1200: "8px" }} >
              <Masonry>
                {post.imageUrls.map((imageUrl, index) => (
                  <div key={index} className="mb-1 rounded-md overflow-hidden">
                    <img
                      className="w-full h-auto block cursor-pointer object-cover"
                      alt={`post-${index}`}
                      src={`http://localhost:4000/api/v1/${imageUrl}`}
                      onClick={() => showImageModal(index)}
                    />
                  </div>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          )}
        </div>
      )}

      <Divider solid className='my-3 bg-slate-400 bg-opacity-20'></Divider>
      <div className="flex items-center justify-between">
        <div onClick={handleLike} className="flex items-center cursor-pointer">
          {isLiked() ? <HeartFilled className="mr-1 text-lg text-red-500" /> : <HeartOutlined className="mr-1 text-lg" />}
          <span>{likeCount > 0 && likeCount}</span>
        </div>
        <div onClick={showCommentModal} className='flex items-center cursor-pointer'>
          <CommentOutlined className="mr-1 text-lg" /><p>Comments</p>
        </div>
      </div>

      <Modal
        visible={modalVisible}
        onCancel={handleCancelModal}
        footer={null}
        bodyStyle={{ padding: 0 }}
      >
        <Carousel
          initialSlide={currentImageIndex}
          dots={false}
          autoplay={false}
          arrows={true}
          className='w-auto p-3'
        >
          {post.imageUrls &&
            post.imageUrls.map((imageUrl, index) => (
              <div key={index} className='w-auto'>
                <img
                  className="w-full h-auto object-cover"
                  alt={`full-post-${index}`}
                  src={`http://localhost:4000/api/v1/${imageUrl}`}
                />
              </div>
            ))}
        </Carousel>
      </Modal>

      <Modal
        title="Comments"
        visible={commentModalVisible}
        onCancel={handleCloseCommentModal}
        footer={null}
      >
        <div className='w-full h-auto mt-2'>
          {commentsObject && Object.entries(commentsObject).map(([commentId, commentString]) => {
            const commentData = getCommentObject(commentString);
            const user = commentUsers[commentId] || { name: 'Unknown User' };
            return (
              <div key={commentId} className='bg-slate-200 rounded-lg px-3 py-2 mb-2 relative'>
                <Dropdown overlay={commentMenu(commentId, commentString)} trigger={['click']} placement="bottomRight">
                  <EllipsisOutlined className='absolute top-2 right-2 text-slate-950 text-lg cursor-pointer' />
                </Dropdown>
                <div className='flex flex-col gap-[2px]'>
                  <p className='font-bold text-sm'>{user.name}</p>
                  <p>{commentData.comment}</p> {/* This line is likely causing the error */}
                </div>
              </div>
            );
          })}
        </div>
        <Form
          form={commentForm}
          layout="horizontal"
          onFinish={handleAddComment}
          className="mt-6"
        >
          <Form.Item name="comment" rules={[{ required: true, message: 'Please input your comment!' }]}>
            <Input placeholder="Add a comment..." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Comment
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PostsComponent;