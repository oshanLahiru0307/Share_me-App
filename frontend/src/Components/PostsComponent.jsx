import React from 'react'
import { Link } from 'react-router-dom'
import { HeartOutlined, EllipsisOutlined, CommentOutlined } from '@ant-design/icons'
import { Avatar,Card } from 'antd'


const PostsComponent = () => {
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
                            <Avatar size={48} src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                            />
                            <div>
                                <p className='my-0 mx-0 '>John Doe</p>
                                <p className='my-0 mx-0 font-normal text-xs'>Undergraduate Student at Metropholitent University</p>
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