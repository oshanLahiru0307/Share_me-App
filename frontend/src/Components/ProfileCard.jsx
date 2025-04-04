import { Avatar } from 'antd'
import { Link } from 'react-router-dom'
import React from 'react'
import { GlobalOutlined, BookOutlined, TeamOutlined } from '@ant-design/icons'

const ProfileCard = () => {
    return (
        <div>
            <div className='w-1/4 bg-white h-auto rounded-lg shadow-lg relative'>
                <div style={{
                    height: '100px',
                    width: '100%',
                    borderRadius: '8px 8px 0 0',
                    background: 'url("https://img.freepik.com/free-vector/blue-copy-space-digital-background_23-2148821698.jpg?t=st=1743746807~exp=1743750407~hmac=c9bda7d30e8857a1e16c9b5b06b689c3ce466c4586486a9707305e97471b9bb1&w=1380")'
                }}>
                </div>
                <Avatar style={{
                    border: '3px solid white',
                }}
                    size={80} src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    className='absolute top-12 left-6' />

                <div className='flex flex-col items-start mt-8 ml-6'>
                    <h1 className='text-xl font-semibold my-1'>John Doe</h1>
                    <p className='text-sm text-black my-1'>Undergraduate Student at Metropholitent Univercity</p>
                    <p className='text-sm text-black my-1'>@johndoe</p>
                    <p className='text-sm text-black mb-3'>San Francisco, CA</p>
                </div>
            </div>

            <div className='w-1/4 bg-white h-auto rounded-lg shadow-lg mt-6 p-4'>
                <p className='text-m text-black my-1 font-semibold'>Profile View <span className='float-right text-sky-500'>44</span></p>
                <p className='text-m text-black my-1 font-semibold'>Profile View <span className='float-right text-sky-500'>128</span></p>
            </div>

            <div className='w-1/4 bg-white h-auto rounded-lg shadow-lg mt-6 p-4 flex flex-col'>
                <Link className='text-m text-black my-1 font-semibold'><BookOutlined className='mr-2' />Saved items</Link>
                <Link className='text-m text-black my-1 font-semibold'><GlobalOutlined className='mr-2' />Newsletters</Link>
                <Link className='text-m text-black my-1 font-semibold'><TeamOutlined className='mr-2' />Groups</Link>
            </div>
        </div>
    )
}

export default ProfileCard
