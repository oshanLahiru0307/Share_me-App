import React, { useState, useEffect } from 'react';
import { Avatar, Button, Modal, Form, Input, Upload } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import UserService from '../ServiceController/UserServices';
import userState from '../State/UserState';
import { PlusOutlined } from '@ant-design/icons';
import PostService from '../ServiceController/PostController'; // Assuming you have a PostService

const CreatePost = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const snap = useSnapshot(userState);
    const userId = snap.userId;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [caption, setCaption] = useState('');
    const [imageFiles, setImageFiles] = useState([]);
    const [uploading, setUploading] = useState(false);

    const fetchUserProfile = async () => {
        try {
            const response = await UserService.getUserById(userId);
            setUser(response);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const handleAvatarClick = () => {
        navigate(`/userProfile/${userId}`);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setCaption('');
        setImageFiles([]);
    };

    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
    };

    const handleImageChange = (info) => {
        if (info.fileList.length > 0) {
            const newImageFiles = info.fileList.map(file => file.originFileObj).filter(Boolean);
            setImageFiles(newImageFiles);
        } else {
            setImageFiles([]);
        }
    };

    const handleCreatePost = async () => {
        if (!caption.trim() && imageFiles.length === 0) {
            // Optionally show a message to the user that caption or image is required
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("username", user.name);
        formData.append("occupation", user.occupation);
        formData.append("caption", caption);
        imageFiles.forEach(file => {
            formData.append("imageFiles", file);
        });

        try {
            const response = await PostService.createPost(formData);
            console.log('Post created successfully:', response);
            setIsModalOpen(false);
            setCaption('');
            setImageFiles([]);
            // Optionally show a success message and/or refresh the post list
            window.location.reload(); // Simple way to refresh posts
        } catch (error) {
            console.error('Error creating post:', error);
            // Optionally show an error message to the user
        } finally {
            setUploading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, [userId]);

    return (
        <div>
            <div className='w-auto bg-white h-auto rounded-lg shadow-lg p-6 flex flex-row gap-2 items-center'>
                <Avatar
                    onClick={() => handleAvatarClick()}
                    style={{
                        border: '3px solid white',
                        cursor: 'pointer'
                    }}
                    size={48} src={`http://localhost:4000/api/v1/${user.profileImg}`}
                    className=''
                />
                <Button
                    style={{
                        width: '550px'
                    }}
                    onClick={showModal}
                >
                    + Create New Post
                </Button>
            </div>

            <Modal
                title="Create New Post"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="create" type="primary" loading={uploading} onClick={handleCreatePost}>
                        {uploading ? 'Posting...' : 'Post'}
                    </Button>,
                ]}
            >
                <Form layout="vertical">
                    <Form.Item label="Caption">
                        <Input.TextArea rows={4} value={caption} onChange={handleCaptionChange} />
                    </Form.Item>
                    <Form.Item label="Images">
                        <Upload
                            listType="picture-card"
                            fileList={imageFiles.map(file => ({
                                uid: file.name, // Use a unique identifier for each file
                                name: file.name,
                                status: 'done', // Treat as done for display purposes
                                url: URL.createObjectURL(file), // Create a preview URL
                            }))}
                            onChange={handleImageChange}
                            multiple
                            beforeUpload={() => false} // Prevent immediate upload
                        >
                            {imageFiles.length >= 8 ? null : <PlusOutlined />}
                        </Upload>
                        <p className="text-gray-500 text-sm mt-1">You can upload up to 8 images.</p>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CreatePost;