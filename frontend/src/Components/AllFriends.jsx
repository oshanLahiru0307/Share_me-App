import React from 'react'
import { Avatar, Button } from 'antd'

const AllFriends = () => {
  return (
    <div className='flex flex-row justify-start flex-wrap'>
        <div className='w-[200px] mx-4 bg-white rounded-lg border-2 border-blue-100 p-4 my-5 flex flex-col gap-5 items-center hover:shadow-md transition-shadow duration-300 ease-in-out'>
                <div className='flex items-center' >
                <Avatar style={{
                    border: '3px solid white',
                }}
                    size={64} src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    className='' />
                </div>
                <div className='text-center'>
                <p className='font-bold'>Alex hayles</p>
                <p className='text-sm'>Software Engineer</p>
                </div>
                <Button 
                type='primary'
                style={{
                    width: '80px'
                }}>+ follow</Button>
        </div>
    </div>
  )
}

export default AllFriends
