import React from 'react'
import NavBar from './NavigationBar'
import ProfileCard from './ProfileCard'
import PostsComponent from './PostsComponent'
import UserList from './UserList'
import CreatePost from './CreatePost'
import { FloatButton } from 'antd'
import LinksCard from './Links'
import { RocketFilled} from '@ant-design/icons'
import { useState, useEffect } from 'react'
import PostController from '../ServiceController/PostController'

const Home = () => {

  const [posts, setPosts] = useState([])

  const fetchPosts = async () => {
    try {
      const response = await PostController.getAllPosts()
      console.log('Posts:', response)
      setPosts(response)
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className='bg-slate-200 h-auto '>
      <NavBar />
      <div className='mt-10 mx-6 flex flex-row gap-10'>
          <div>
          <ProfileCard />
        </div>
        <div className='display block'>
          <CreatePost />
          {posts.map((post) => (
            <PostsComponent key={post._id} post={post} />
          ))}
        </div>
        <div>
          <div className="w-auto h-[350px] bg-white rounded-lg shadow-lg p-4 sticky top-24 ">
            <p className="text-blue-500 text-lg font-semibold pb-2">Add to your feed</p>
            <div className='h-[250px] sticky top-5 overflow-y-auto pb-4 px-4'>
              <UserList />
            </div>
          </div>
          <div className='sticky top-[470px]'>
            <LinksCard />
          </div>
        </div>

      </div>
      <div>
        <FloatButton type="primary" icon = {<RocketFilled className="text-white"/>} />
      </div>
    </div>
  )
}

export default Home
