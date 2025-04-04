import React from 'react'
import NavBar from './NavigationBar'
import ProfileCard from './ProfileCard'

const Home = () => {
  return (
    <div className='bg-slate-200 h-screen'>
      <NavBar/>
      <div className='my-6 mx-4'>
        <ProfileCard/>
      </div>
    </div>
  )
}

export default Home
