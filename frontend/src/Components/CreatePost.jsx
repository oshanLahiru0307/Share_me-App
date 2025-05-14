import React, { useState, useEffect, useCallback } from 'react';
import { Avatar, Button, Modal, Form, Input, Upload, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import UserService from '../ServiceController/UserServices';
import userState from '../State/UserState';
import { PlusOutlined } from '@ant-design/icons';
import PostService from '../ServiceController/PostController';

const CreatePost = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const snap = useSnapshot(userState);
    const userId = snap.userId;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [caption, setCaption] = useState('');
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [form] = Form.useForm();

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
        setFileList([]);
        form.resetFields();
    };

    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
    };

    const handleChange = useCallback(
        ({ fileList: newFileList }) => {
            const updatedList = newFileList.map((file) => {
                if (file.originFileObj && !file.url) {
                  return {
                    ...file,
                    url: URL.createObjectURL(file.originFileObj), // Generate preview URL
                  };
                }
                return file;
              });

            if (updatedList.length > 8) {
                message.warning('You can upload a maximum of 8 images.');
                setFileList(updatedList.slice(0, 8));
            } else {
                setFileList(updatedList);
            }
        },
        []
    );

    const handleCreatePost = async () => {
        if (!caption.trim() && (!fileList || fileList.length === 0)) {
            message.error('Please enter a caption or upload images.');
            return;
        }
        setUploading(true);
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('username', user.name);
        formData.append('occupation', user.occupation);
        formData.append('caption', caption);

        console.log({'fileList':fileList})

        if (fileList && fileList.length > 0) {
            fileList.forEach((file) => {
                if (file.originFileObj) {
                    formData.append('imageFiles', file.originFileObj);
                }
            });
        }
        try {
            const response = await PostService.createPost(formData);
            console.log('Post created successfully:', response);
            setIsModalOpen(false);
            setCaption('');
            setFileList([]);
            form.resetFields();
            window.location.reload();
            message.success('Post created successfully!');
        } catch (error) {
            console.error('Error creating post:', error);
            message.error('Failed to create post.');
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
                        cursor: 'pointer',
                    }}
                    size={48}
                    src={`http://localhost:4000/api/v1/${user.profileImg}`}
                    className=''
                />
                <Button
                    style={{
                        width: '550px',
                    }}
                    onClick={showModal}
                >
                    + Create New Post
                </Button>
            </div>

            <Modal
                title='Create New Post'
                open={isModalOpen}
                onCancel={handleCancel}
                footer={[
                    <Button key='cancel' onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key='create' type='primary' loading={uploading} onClick={handleCreatePost}>
                        {uploading ? 'Posting...' : 'Post'}
                    </Button>,
                ]}
            >
                <Form layout='vertical'>
                    <Form.Item label='Caption'>
                        <Input.TextArea rows={4} value={caption} onChange={handleCaptionChange} />
                    </Form.Item>
                    <Form.Item label='Images'>
                        <Upload
                            listType='picture-card'
                            fileList={fileList}
                            onChange={handleChange}
                            multiple
                            beforeUpload={() => false}
                        >
                            {fileList.length >= 8 ? null : <PlusOutlined />}
                        </Upload>
                    </Form.Item>
                </Form>
                <p className='text-gray-500 text-sm mt-1'>You can upload up to 8 images.</p>
            </Modal>
        </div>
    );
};

export default CreatePost;
