import React from 'react'
import { Link } from 'react-router-dom'
import { HeartOutlined, EditOutlined, EllipsisOutlined, CommentOutlined } from '@ant-design/icons'
import { Avatar, Button, Card } from 'antd'
import UserList from './UserList';

const { Meta } = Card;

const PostsComponent = () => {
    return (
        <div>
            <div className='w-auto bg-white h-auto rounded-lg shadow-lg  p-6 flex flex-row gap-2 items-center'>
                <Avatar style={{
                    border: '3px solid white',
                }}
                    size={48} src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    className='' />
                <Button style={{
                    width: '550px'
                }}>Create New Post</Button>
            </div>

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
                        <div className='flex flex-row gap-2 items-center'>
                            <Avatar size={48} src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                            />
                            <div>
                                <p className='my-0 mx-0 '>John Doe</p>
                                <p className='my-0 mx-0 font-normal text-xs'>Undergraduate Student at Metropholitent University</p>
                            </div>
                        </div>
                        <div className='py-4'>
                            <p className='text-sm font-normal  text-slate-900'>Hi there....</p>
                        </div>
                    </div>

                }
                extra={<Link to="/"><EllipsisOutlined /></Link>}

                actions={[
                    <HeartOutlined className='float-left ml-2' key="like" />,
                    <CommentOutlined className='float-right mr-2' key="comment" />,
                ]}
            >
                <div>
                    <img
                        className='w-full h-auto '
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                </div>
            </Card>
        </div>
    )
}

export default PostsComponent