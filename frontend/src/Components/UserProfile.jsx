import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { HeartOutlined, EllipsisOutlined, CommentOutlined } from '@ant-design/icons';
import { Avatar, Card, Carousel, Modal, Button } from 'antd';
import UserService from '../ServiceController/UserServices';
import PostController from '../ServiceController/PostController';
import UserList from './UserList';
import ProfileCard from './ProfileCard';
import PostsComponent from './PostsComponent';
import NavigationBar from './NavigationBar';
import CreatePost from './CreatePost';
import LinksCard from './Links';
import { CameraFilled, EditFilled } from '@ant-design/icons';

const UserProfile = () => {
  const userId = useParams().id;
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]); // Initialize posts as an empty array

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
      setPosts(response); // Ensure posts is an array even if response.data is null/undefined
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]); // If there's an error, ensure posts is an empty array to prevent map errors
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchPosts();
  }, [userId]);

  return (
    <div className='bg-slate-200 shadow-lg overflow-x-hidden'>
      <NavigationBar />
      <div className='w-[auto] h-[450px] bg-white mx-10 rounded-b-md shadow-lg relative'>
        <div style={{
          width: '100%',
          height: '250px',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundImage: `url("http://localhost:4000/api/v1/${user.coverImg}")`,
        }}>
          <Button className='absolute top-[210px] right-4 font-semibold'><CameraFilled />Edit Cover Image</Button>
        </div>
        <Avatar
          style={{
            border: '3px solid white',
          }}
          size={160} src={`http://localhost:4000/api/v1/${user.profileImg}`}
          className='absolute top-40 left-10'
        />
        <Button className='absolute left-40 top-44 rounded-full w-10 h-10 p-3'><CameraFilled className='text-xl' /></Button>
        <div className='absolute w-full top-[310px] left-12 mt-4'>
          <h1 className='font-bold text-3xl mb-1'>{user.name}</h1>
          <h1 className='font-normal mb-1'>{user.occupation}</h1>
          <h1 className='font-normal mb-1'>{user.address}</h1>
          <Button className='absolute right-16 top-14 font-semibold mr-1'><EditFilled />Edit Profile</Button>
        </div>
      </div>

      <div className=' w-[auto] h-auto flex flex-row mx-10 mt-10 gap-10'>
        <ProfileCard />
        <div className='w-auto h-auto'>
          <CreatePost />
          {posts.map((post) => (
            <PostsComponent key={post._id} post={post} />
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
            <LinksCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;