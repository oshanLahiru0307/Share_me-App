import React from 'react'
import UserList from './UserList'
import ProfileCard from './ProfileCard'
import PostsComponent from './PostsComponent'
import NavigationBar from './NavigationBar'
import { Avatar, Button} from 'antd'
import CreatePost from './CreatePost'
import LinksCard from './Links'
import {CameraFilled} from '@ant-design/icons'

const UserProfile = () => {
  return (
    <div className='bg-slate-200 shadow-lg'>
      <NavigationBar />
      <div className='w-[auto] h-[450px] bg-white mx-10 rounded-b-md shadow-lg relative'>
      <div style={{
        width:'100%',
        height:'250px',
        backgroundPosition:'center',
        backgroundSize:'cover',
        backgroundImage: 'url("https://t4.ftcdn.net/jpg/05/45/42/81/360_F_545428173_uyYWJoR9n5uJFYIWfDa2C49AzIECcU20.jpg")'
      }}>
        <Button className='absolute top-[210px] right-4 font-semibold'><CameraFilled/>Edit Cover Image</Button>
      </div>
      <Avatar style={{
        border: '3px solid white',
      }}
        size={160} src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        className='absolute top-40 left-10' />
        <Button className='absolute left-40 top-44 rounded-full w-10 h-10 p-3'><CameraFilled className='text-xl'/></Button>
        <div className='absolute top-[310px] left-12 mt-4'>
        <h1 className='font-bold text-3xl mb-1'>John Doe</h1>
        <h1 className='font-normal mb-1'>Undergraduate Student at Metropholitent University</h1>
        <h1 className='font-normal mb-1'>San Francisco, CA</h1>
        </div>
      </div>

      <div className=' w-full h-auto flex flex-row gap-10 px-10 mt-10'>
        <ProfileCard />
        <div className='w-auto h-auto'>
        <CreatePost />
          <PostsComponent/>
          <PostsComponent/>
        </div>
        <div>
          <div className="w-auto h-auto bg-white rounded-lg shadow-lg p-4 ">
            <p className="text-blue-500 text-lg font-semibold pb-2">Add to your feed</p>
            <div className='h-[550px] sticky top-5 overflow-y-auto pb-4 px-4'>
              <UserList />
              <UserList />
              <UserList />
              <UserList />
              <UserList />
              <UserList />
              <UserList />
              <UserList />
              <UserList />
              <UserList />
              <UserList />
              <UserList />
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
  )
}

export default UserProfile
