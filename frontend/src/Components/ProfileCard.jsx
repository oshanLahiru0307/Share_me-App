import { Avatar } from 'antd'
import { Link } from 'react-router-dom'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalOutlined, BookOutlined, TeamOutlined} from '@ant-design/icons'
import { useSnapshot } from 'valtio'
import { useState, useEffect } from 'react'
import userState from '../State/UserState'
import UserService from '../ServiceController/UserServices' 

const ProfileCard = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const snap = useSnapshot(userState)

    const userId = snap.userId

    const fetchUserProfile = async () => {
        try{
            const response = await UserService.getUserById(userId)
            console.log('User Profile:', response)
            setUser(response)
        }catch(error){
            console.error('Error fetching user profile:', error)
        }
    }

    useEffect(()=> {
        fetchUserProfile()
    }
    , [userId])


    const handleAvatarClick = () => {
        navigate('/userProfile')
    }

    return (
        <div className='sticky top-24 w-72'>
            <div className='w-auto bg-white h-auto rounded-lg shadow-lg relative '>
                <div style={{
                    height: '100px',
                    width: '100%',
                    borderRadius: '8px 8px 0 0',
                    backgroundPosition:'center',
                    backgroundSize:'cover',
                    backgroundImage: `url("http://localhost:4000/api/v1/${user.coverImg}")`
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
                    size={80} src={`http://localhost:4000/api/v1/${user.profileImg}`}
                    className='absolute top-12 left-6' />

                <div className='flex flex-col items-start mt-8 ml-4'>
                    <h1 className='text-xl font-semibold my-1'>{user.name}</h1>
                    <p className='text-sm text-black my-1 mr-4'>{user.occupation}</p>
                    <p className='text-sm text-black my-1'>@johndoe</p>
                    <p className='text-sm text-black mb-4'>{user.address}</p>
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
