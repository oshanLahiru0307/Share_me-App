import React from 'react'
import NavigationBar from './NavigationBar'
import ProfileCard from './ProfileCard'
import UserList from './UserList'

const Notification = () => {
  return (
    <div >
        <NavigationBar />
        <div className='flex flex-row justify-between mx-10 mt-10'>
            <ProfileCard />
        <div className='w-[600px] bg-white rounded-lg shadow-lg p-4 sticky top-24'>
            <h1 className='text-blue-500 text-lg font-medium'>Notification</h1>
        </div>
          <div className="w-auto h-[570px] bg-white rounded-lg shadow-lg p-4 sticky top-24 ">
            <p className="text-blue-500 text-lg font-semibold pb-2">Add to your feed</p>
            <div className='h-[500px] sticky top-5 overflow-y-auto pb-4 px-4'>
              <UserList />
            </div>
          </div>
        </div>
    </div>
  )
}

export default Notification
