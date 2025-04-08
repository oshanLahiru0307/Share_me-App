import React from 'react'
import { Avatar, Button } from 'antd'

const Myfriends = () => {
  return (
    <div className='w-auto h-auto bg-white p-4'>
        <div className='h-[auto] pb-4 px-4'>
        <div className='w-[900px] bg-white rounded-lg border-2 border-blue-100 p-4 my-5 flex flex-row gap-10 items-center justify-between hover:shadow-md transition-shadow duration-300 ease-in-out'>
                <div className='flex flex-row gap-2 items-center' >
                <Avatar style={{
                    border: '3px solid white',
                }}
                    size={48} src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    className='' />
                <div>
                <p className='font-bold'>Alex hayles</p>
                <p className='text-sm'>Software Engineer</p>
                </div>
                </div>

                <Button 
                danger
                style={{
                    width: '80px'
                }}>Unfollow</Button>
            </div>
        </div>
         
    </div>
  )
}

export default Myfriends
