import React from 'react'
import { Avatar, Button} from 'antd'
import { useNavigate } from 'react-router-dom'
import { useSnapshot } from 'valtio'
import { useState, useEffect } from 'react'
import UserService from '../ServiceController/UserServices'
import userState from '../State/UserState'


const CreatePost = () => {
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

    const handleAvatarClick = () => {
        navigate('/userProfile')
    }

    useEffect(()=> {
        fetchUserProfile()
    }, [userId])

    return (
        <div>
            <div className='w-auto bg-white h-auto rounded-lg shadow-lg  p-6 flex flex-row gap-2 items-center'>
                <Avatar 
                onClick={
                    ()=> {handleAvatarClick()}
                }
                style={{
                    border: '3px solid white',
                    cursor: 'pointer'
                }}
                    size={48} src={`http://localhost:4000/api/v1/${user.profileImg}`}
                    className='' />
                <Button style={{
                    width: '550px'
                }}>Create New Post</Button>
            </div>
        </div>
    )
}

export default CreatePost
