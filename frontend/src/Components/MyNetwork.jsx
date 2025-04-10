import React from 'react'
import NavigationBar from './NavigationBar'
import MyFriends from './Myfriends'
import AllFriends from './AllFriends'
import ProfileCard from './ProfileCard'
import { Divider } from 'antd'

const MyNetwork = () => {
  return (
    <div className='bg-slate-200 h-auto pb-5'>
        <NavigationBar/>
        <div className='flex flex-row gap-10 mt-10 mx-10'>
            <div className='w-auto'>
                <ProfileCard/>
            </div>
            <div className='w-[1200px] h-auto bg-white rounded-lg shadow-lg p-4'>
                <div>
                <p className='text-blue-500 text-lg font-semibold '>My Friends</p>
                <MyFriends/>
                <MyFriends/>
                <MyFriends/>
                </div>
                <Divider style={{borderColor:'#bbbbbb', height:'2px', margin:'50px 0 30px 0'}}></Divider>
                <div>
                <p className='text-blue-500 text-lg font-semibold ' >People you may know</p>
                <AllFriends/>
                </div>
        </div>
        </div>
    </div>
  )
}

export default MyNetwork
