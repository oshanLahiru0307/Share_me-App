import React from 'react'
import { Avatar, Button } from 'antd'

const CreatePost = () => {
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
        </div>
    )
}

export default CreatePost
