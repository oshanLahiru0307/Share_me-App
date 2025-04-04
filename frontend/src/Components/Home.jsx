import React from 'react'
import NavBar from './NavigationBar'
import ProfileCard from './ProfileCard'
import PostsComponent from './PostsComponent'
import UserList from './UserList'
import CreatePost from './CreatePost'

const Home = () => {
  return (
    <div className='bg-slate-200 h-auto'>
      <NavBar />
      <div className='mt-10 mx-10 flex flex-row gap-10'>
        <div>
          <ProfileCard />
        </div>

        <div className='display block'>
          <CreatePost />
          <PostsComponent />
          <PostsComponent />
        </div>
        <div className="w-auto h-[550px] bg-white rounded-lg shadow-lg p-4 sticky top-5 overflow-y-auto">
          <p className="text-blue-500 text-lg font-semibold">Add to your feed</p>
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
    </div>
  )
}

export default Home
