import React, { useState, useEffect } from 'react';
 import { useNavigate } from 'react-router-dom';
 import { HeartOutlined, EllipsisOutlined, CommentOutlined, HeartFilled } from '@ant-design/icons';
 import { Avatar, Carousel, Modal, Divider } from 'antd';
 import UserService from '../ServiceController/UserServices';
 import PostController from '../ServiceController/PostController'; // Import PostController
 import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

 const PostsComponent = ({ post, onDelete , onPostUpdated}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const userId = post.userId;

  const fetchUserProfile = async () => {
   try {
    const response = await UserService.getUserById(userId);
    setUser(response);
   } catch (error) {
    console.error('Error fetching user profile:', error);
   }
  };

  useEffect(() => {
   fetchUserProfile();
  }, [userId]);

  const showImageModal = (index) => {
   setCurrentImageIndex(index);
   setModalVisible(true);
  };

  const handleCancelModal = () => {
   setModalVisible(false);
  };

  const handleLike = async () => {
   try {
    await PostController.likePost(post.id, userId);
    onPostUpdated();
   } catch (error) {
    console.error('Error liking/unliking post:', error);
   }
  };

  const isLiked = () => {
   return post.likes && post.likes[userId];
  };

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
     <div onClick={handleLike} className="cursor-pointer">
      {isLiked() ? <HeartFilled className=" mx-5 text-lg text-red-500" /> : <HeartOutlined className=" mx-5 text-lg" />}
     </div>
     <div className='flex'><CommentOutlined className="ml-5 mr-1 text-lg cursor-pointer" /><p>Comments</p></div>
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
   </div>
  );
 };

 export default PostsComponent;