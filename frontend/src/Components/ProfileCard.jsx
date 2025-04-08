import { Avatar } from 'antd'
import { Link } from 'react-router-dom'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalOutlined, BookOutlined, TeamOutlined} from '@ant-design/icons'

const ProfileCard = () => {
    const navigate = useNavigate()
    const handleAvatarClick = () => {
        navigate('/userProfile')
    }
    return (
        <div className='sticky top-24'>
            <div className='w-auto bg-white h-auto rounded-lg shadow-lg relative '>
                <div style={{
                    height: '100px',
                    width: '100%',
                    borderRadius: '8px 8px 0 0',
                    backgroundPosition:'center',
                    backgroundSize:'cover',
                    backgroundImage: 'url("https://t4.ftcdn.net/jpg/05/45/42/81/360_F_545428173_uyYWJoR9n5uJFYIWfDa2C49AzIECcU20.jpg")'
                }}>
                </div>
                <Avatar 
                onClick={
                    ()=> {handleAvatarClick()}
                }
                style={{
                    border: '3px solid white',
                    cursor: 'pointer',
                }}
                    size={80} src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    className='absolute top-12 left-6' />

                <div className='flex flex-col items-start mt-8 ml-4'>
                    <h1 className='text-xl font-semibold my-1'>John Doe</h1>
                    <p className='text-sm text-black my-1 mr-4'>Undergraduate Student at Metropholitent University</p>
                    <p className='text-sm text-black my-1'>@johndoe</p>
                    <p className='text-sm text-black mb-4'>San Francisco, CA</p>
                </div>
            </div>

            <div className='w-auto bg-white h-auto rounded-lg shadow-lg mt-6 p-4'>
                <p className='text-sm text-black my-1 font-semibold'>Profile View <span className='float-right text-sky-500'>44</span></p>
                <p className='text-sm text-black my-1 font-semibold'>Profile View <span className='float-right text-sky-500'>128</span></p>
            </div>

            <div className='w-auto bg-white h-auto rounded-lg shadow-lg mt-6 p-4 flex flex-col'>
                <Link className='text-m text-black my-1 font-semibold'><BookOutlined className='mr-2 text-pink-500' />Saved items</Link>
                <Link className='text-m text-black my-1 font-semibold'><GlobalOutlined className='mr-2 text-blue-500' />Newsletters</Link>
                <Link className='text-m text-black my-1 font-semibold'><TeamOutlined className='mr-2 text-purple-500' />Groups</Link>
            </div>
        </div>
    )
}

export default ProfileCard
