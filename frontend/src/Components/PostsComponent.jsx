import React from 'react'
import { Link} from 'react-router-dom'
import { HeartOutlined, EllipsisOutlined, CommentOutlined } from '@ant-design/icons'
import { Avatar,Card } from 'antd'
import { useSnapshot } from 'valtio'
import { useState, useEffect } from 'react'
import userState from '../State/UserState'
import UserService from '../ServiceController/UserServices'

const PostsComponent = () => {

    const snap = useSnapshot(userState)
    const userId = snap.userId
    const [user, setUser] = useState({})

    const fetchUserProfile = async () => {
        try{
            const response = await UserService.getUserById(userId)
            console.log('User Profile:', response)
            setUser(response)
        }catch(error){
            console.error('Error fetching user profile:', error)
        }
    }

    useEffect(()=>{
        fetchUserProfile()
    }, [userId])

    return (
        <div>
            <Card
                style={{
                    width: 'inherit',
                    marginTop: '20px',
                    marginBottom: '20px',
                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                    paddingTop: '10px',
                }}
                title={
                    <div>
                        <div className='flex flex-row justify-between items-center'>
                        <div className='flex flex-row gap-2 items-center'>
                            <Avatar size={48} src={`http://localhost:4000/api/v1/${user.profileImg}`}
                            />
                            <div>
                                <p className='my-0 mx-0 '>{user.name}</p>
                                <p className='my-0 mx-0 font-normal text-xs'>{user.occupation}</p>
                            </div>
                        </div>
                        <Link to="/"><EllipsisOutlined /></Link>
                        </div>
                        <div className='py-4'>
                            <p className='text-sm font-normal  text-slate-900'>Hi there....</p>
                        </div>
                    </div>

                }

                actions={[
                    <HeartOutlined className='float-left ml-2 h-5 w-5' key="like" />,
                    <CommentOutlined className='float-right mr-2' key="comment" />,
                ]}
            >
                <div>
                    <img
                        style={{
                            width: '100%',
                            height: 'auto',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                        alt="example"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww"
                    />
                </div>
            </Card>
        </div>
    )
}

export default PostsComponent