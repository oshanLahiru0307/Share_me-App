import React, { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Avatar, Button, Menu, Dropdown, Form, Input, message, Divider, Carousel, Modal, Popconfirm } from 'antd';
import { EditFilled, DeleteOutlined, EllipsisOutlined, HeartOutlined, CommentOutlined, HeartFilled } from '@ant-design/icons';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import UserService from '../ServiceController/UserServices';
import PostController from '../ServiceController/PostController';
import UserList from './UserList';
import ProfileCard from './ProfileCard';
import NavigationBar from './NavigationBar';
import LinksCard from './Links';

const OtherUserProfile = () => {
    const [commentForm] = Form.useForm();
    const userId = useParams().id;
    const navigate = useNavigate();
    const [modalVisible, setModalVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [selectedPostImages, setSelectedPostImages] = useState([]);
    const [commentModalVisible, setCommentModalVisible] = useState(false);
    const [comments, setComments] = useState({});
    const [commentUsers, setCoomentUsers] = useState({});
    const [selectedComment, setSelectedComment] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [currentPostIdForComment, setCurrentPostIdForComment] = useState('');

    const fetchUserProfile = async () => {
        try {
            const response = await UserService.getUserById(userId);
            console.log('User Profile:', response);
            setUser(response);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const fetchPosts = async () => {
        try {
            const response = await PostController.getPostsByUserId(userId);
            console.log('Posts:', response);
            setPosts(response);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setPosts([]);
        }
    };

    useEffect(() => {
        const fetchCommentUsers = async () => {
            const fetchedUsers = {};
            for (const id of Object.keys(comments)) {
                try {
                    const response = await UserService.getUserById(id);
                    console.log('Fetched user:', response); // Debugging line
                    if (response) {
                        fetchedUsers[id] = response;
                    } else {
                        console.error(`Failed to fetch user data for ID: ${id}`);
                        fetchedUsers[id] = { name: 'Unknown User' };
                    }
                } catch (error) {
                    console.error(`Error fetching user data for ID: ${id}`, error);
                    fetchedUsers[id] = { name: 'Unknown User' };
                }
            }
            setCoomentUsers(fetchedUsers);
        };

        if (comments && Object.keys(comments).length > 0) {
            fetchCommentUsers();
        }
        fetchUserProfile();
        fetchPosts();
    }, [comments, userId]);

    const getCommentObject = (commentString) => {
        try {
            return JSON.parse(commentString);
        } catch (error) {
            console.error("Error parsing comment string:", commentString, error);
            return { comment: "Invalid Comment Data" };
        }
    };

    const showImageModal = (imageUrls, index) => {
        console.log('Showing modal for index:', index, 'with images:', imageUrls);
        setSelectedPostImages(imageUrls);
        setCurrentImageIndex(index);
        setModalVisible(true);
    };

    const handleCancelModal = () => {
        console.log('Closing modal');
        setModalVisible(false);
        setSelectedPostImages([]);
        setCurrentImageIndex(0);
    };


    const handleLike = async (postId) => {
        try {
            await PostController.likePost(postId, userId);
            fetchPosts();
        } catch (error) {
            console.error('Error liking/unliking post:', error);
        }
    };

    const isLiked = (post) => {
        return post.likes && post.likes[userId];
    };

    const handleAddComment = async (commentText) => {
        try {
            if (selectedComment) {
                const response = await PostController.addCommentPost(currentPostIdForComment, userId, commentText);
                console.log('Comment updated:', response);
                message.success('Comment updated successfully');
                setSelectedComment(null);
                commentForm.resetFields();
                handleCommentClick(currentPostIdForComment);
            } else {
                const response = await PostController.addCommentPost(currentPostIdForComment, userId, commentText);
                console.log('Comment added:', response);
                message.success('Comment added successfully');
                commentForm.resetFields();
                handleCommentClick(currentPostIdForComment);
            }
            setCommentText(''); // Clear the input field after submission
        } catch (error) {
            console.error('Error adding/updating comment:', error);
            message.error('Failed to add/update comment');
        }
    };

    const handleCommentClick = async (postId) => {
        setCommentModalVisible(true);
        setCurrentPostIdForComment(postId);
        commentForm.resetFields();
        setCommentText('');
        setSelectedComment(null);
        try {
            const response = await PostController.getPostById(postId);
            console.log('Comments:', response.comments);
            setComments(response.comments || {}); // Ensure comments is an object
        } catch (error) {
            console.error('Error fetching comments:', error);
            setComments({}); // Set comments to an empty object on error
        }
    };

    const handleCancelCommentModal = () => {
        setCommentModalVisible(false);
        setSelectedComment(null);
        setCommentText('');
    };

    const handleEditComment = (commentId, commentString) => {
        setSelectedComment(commentId);
        const commentData = getCommentObject(commentString);
        setCommentText(commentData.comment);
        commentForm.setFieldsValue({ comment: commentData.comment });
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await PostController.deleteComment(currentPostIdForComment, commentId, userId);
            message.success('Comment deleted successfully');
            handleCommentClick(currentPostIdForComment); // Refresh comments
        } catch (error) {
            console.error('Error deleting comment:', error);
            message.error('Failed to delete comment');
        }
    };

    const commentMenu = (commentId, commentString) => (
        <Menu>
            <Menu.Item key="edit" onClick={() => handleEditComment(commentId, commentString)}>
                <EditFilled /> Edit
            </Menu.Item>
            <Menu.Item key="delete">
                <Popconfirm
                    title="Are you sure you want to delete this comment?"
                    onConfirm={() => handleDeleteComment(commentId)}
                    okText="Yes"
                    cancelText="No"
                >
                    <DeleteOutlined /> Delete
                </Popconfirm>
            </Menu.Item>
        </Menu>
    );


    return (
        <div className='bg-slate-200 shadow-lg overflow-x-hidden'>
            <NavigationBar />
            <div className='w-[auto] h-[450px] bg-white mx-10 rounded-b-md shadow-lg relative'>
                <div style={{
                    width: '100%',
                    height: '250px',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundImage: user.coverImg ? `url("http://localhost:4000/api/v1/${user.coverImg}")` : 'none',
                }}>
                </div>
                <Avatar
                    style={{
                        border: '3px solid white',
                    }}
                    size={160} src={`http://localhost:4000/api/v1/${user.profileImg}`}
                    className='absolute top-40 left-10'
                />
                <div className='absolute w-full top-[310px] left-12 mt-4'>
                    <h1 className='font-bold text-3xl mb-1'>{user.name}</h1>
                    <h1 className='font-normal mb-1'>{user.occupation}</h1>
                    <h1 className='font-normal mb-1'>{user.address}</h1>
                </div>
            </div>

            <div className=' w-[auto] h-auto flex flex-row mx-10 mt-10 gap-10'>
                <ProfileCard />
                <div className='w-[620px] h-auto'>
                    {posts.map((post) => (
                        <div key={post.id} className=" w-[auto] mb-5 rounded-lg shadow-md bg-white p-4">
                            <div className="flex justify-between items-center pb-3">
                                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(`/userProfile/${userId}`)}>
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
                                            onClick={() => showImageModal(post.imageUrls, 0)}
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
                                                            onClick={() => showImageModal(post.imageUrls, index)}
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
                                <div onClick={() => handleLike(post.id)} className="cursor-pointer">
                                    {isLiked(post) ? <HeartFilled className=" mx-5 text-lg text-red-500" /> : <HeartOutlined className=" mx-5 text-lg" />}
                                </div>
                                <div onClick={() => handleCommentClick(post.id)} className='flex cursor-pointer'><CommentOutlined className="ml-5 mr-1 text-lg " /><p>Comments</p></div>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <div className="w-[auto] h-auto bg-white rounded-lg shadow-lg p-4 ">
                        <p className="text-blue-500 text-lg font-semibold pb-2">Add to your feed</p>
                        <div className='h-[550px] sticky top-5 overflow-y-auto pb-4 px-4'>
                            <UserList />
                        </div>
                    </div>
                    <div className='sticky top-[100px]'>
                        <LinksCard />
                    </div>
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
                    className='w-auto'
                >
                    {selectedPostImages.map((imageUrl, index) => (
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
                onCancel={handleCancelCommentModal}
                footer={null}
            >
                <div className='w-full h-auto mt-2'>
                    {comments && Object.entries(comments).map(([commentId, commentString]) => {
                        const commentData = getCommentObject(commentString);
                        const user = commentUsers[commentId] || { name: 'Unknown User' };
                        return (
                            <div key={commentId} className='bg-slate-200 rounded-lg px-3 py-2 mb-2 relative'>
                                <Dropdown overlay={commentMenu(commentId, commentString)} trigger={['click']} placement="bottomRight">
                                    <EllipsisOutlined className='absolute top-2 right-2 text-slate-950 text-lg cursor-pointer' />
                                </Dropdown>
                                <div className='flex flex-col gap-[2px]'>
                                    <p className='font-bold text-sm'>{user.name}</p>
                                    <p>{commentData.comment}</p>
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
                        <Input placeholder="Add a comment..." value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {selectedComment ? 'Update Comment' : 'Add Comment'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

        </div>
    );
};

export default OtherUserProfile;
