import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartOutlined, EllipsisOutlined, CommentOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Avatar, Carousel, Modal, Menu, Form, Input, Upload, message, Button, Divider, Popover } from 'antd';
import UserService from '../ServiceController/UserServices';
import PostController from '../ServiceController/PostController'; // Assuming you have PostService
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { PlusOutlined } from '@ant-design/icons';

const MyPosts = ({ post, onDelete, onPostUpdated }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const userId = post.userId;
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editCaption, setEditCaption] = useState(post.caption);
    const [editImageFiles, setEditImageFiles] = useState([]);
    const [editPostId, setEditPostId] = useState(post.id);
    const [uploading, setUploading] = useState(false);
    const [popoverVisible, setPopoverVisible] = useState(false);

    const fetchUserProfile = async () => {
        try {
            const response = await UserService.getUserById(userId);
            setUser(response);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, [userId]);


    useEffect(() => {
        if (isEditModalOpen && post.imageUrls) {
            const initialEditImageFiles = post.imageUrls.map((url, index) => ({
                uid: `edit-${post.id}-${index}`,
                name: `image-${index}`,
                status: 'done',
                url: `http://localhost:4000/api/v1/${url}`,
            }));
            setEditImageFiles(initialEditImageFiles);
        } else {
            setEditImageFiles([]);
        }
        setEditCaption(post.caption);
        setEditPostId(post.id);
    }, [isEditModalOpen, post]);

    const showImageModal = (index) => {
        setCurrentImageIndex(index);
        setModalVisible(true);
    };

    const handleCancelModal = () => {
        setModalVisible(false);
        setCurrentImageIndex(0);
    };

    const handleMenuClick = ({ key }) => {
        setPopoverVisible(false);
        if (key === 'edit') {
            setIsEditModalOpen(true);
        } else if (key === 'delete') {
            if (onDelete) {
                onDelete(post._id);
            }
        }
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="edit" icon={<EditOutlined />}>
                Edit
            </Menu.Item>
            <Menu.Item key="delete" icon={<DeleteOutlined />}>
                Delete
            </Menu.Item>
        </Menu>
    );

    const handleEditCaptionChange = (e) => {
        setEditCaption(e.target.value);
    };

    const handleEditImageChange = (info) => {
        const newEditImageFiles = info.fileList.map(file => {
            if (file.originFileObj) {
                return file.originFileObj;
            }
            return file; // Keep existing URLs
        }).filter(Boolean);
        setEditImageFiles(newEditImageFiles);
    };

    const handleUpdatePost = async () => {

        setUploading(true);

        console.log('editCaption:', editCaption);
        console.log('editPostId:', editPostId);
        console.log('editImageFiles:', editImageFiles);

        const formData = new FormData();
        formData.append("caption", editCaption);
        formData.append("postId", editPostId);

        editImageFiles.forEach(file => {
            if (file instanceof File) {
                formData.append("imageFiles", file);
            }
        });

        console.log('Form data:', formData);

        try {
            const response = await PostController.updatePost(formData);
            console.log('Post updated successfully:', response);
            const updatedPostResponse = await PostController.getPostById(editPostId)
            const updatedPost = updatedPostResponse.data;

            if (onPostUpdated) {
                onPostUpdated(updatedPost);
            }

            setIsEditModalOpen(false);
            setUploading(false);

        } catch (error) {
            console.error('Error updating post:', error);
            message.error('Failed to update post.');
            setUploading(false);
        }
    };

    const handleCancelEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handlePopoverVisibleChange = (visible) => {
        setPopoverVisible(visible);
    };

    return (
        <div className=" w-auto mt-5 mb-5 rounded-lg shadow-md bg-white p-4">
            <div className="flex justify-between items-center pb-3">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(`/userProfile/${userId}`)}>
                    <Avatar size={48} src={`http://localhost:4000/api/v1/${user.profileImg}`} />
                    <div>
                        <p className="my-0 mx-0 font-semibold">{user.name}</p>
                        <p className="my-0 mx-0 text-xs text-gray-500">{user.occupation}</p>
                    </div>
                </div>
                <Popover
                    content={menu}
                    trigger="click"
                    visible={popoverVisible}
                    onVisibleChange={handlePopoverVisibleChange}
                >
                    <EllipsisOutlined className="text-2xl cursor-pointer" />
                </Popover>
            </div>
            <div className="pb-4">
                <p className="text-sm font-normal text-slate-900">{post.caption}</p>
            </div>
            {post.imageUrls && post.imageUrls.length > 0 && (
                <div className="w-full">
                    {post.imageUrls.length === 1 ? (
                        <img
                            className="w-full h-auto object-cover cursor-pointer rounded-md"
                            alt="post"
                            src={`http://localhost:4000/api/v1/${post.imageUrls[0]}`}
                            onClick={() => showImageModal(0)}
                        />
                    ) : (
                        <ResponsiveMasonry
                            columnsCountBreakPoints={{ 350: 1, 750: 2, 1200: 2 }}
                            gutterBreakPoints={{ 350: "8px", 750: "8px", 1200: "8px" }} >
                            <Masonry>
                                {post.imageUrls.map((imageUrl, index) => (
                                    <div key={index} className="mb-1 rounded-md overflow-hidden">
                                        <img
                                            className="w-full h-auto block cursor-pointer object-cover"
                                            alt={`post-${index}`}
                                            src={`http://localhost:4000/api/v1/${imageUrl}`}
                                            onClick={() => showImageModal(index)}
                                        />
                                    </div>
                                ))}
                            </Masonry>
                        </ResponsiveMasonry>
                    )}
                </div>
            )}
            <Divider solid className='my-3 bg-slate-400 bg-opacity-20'></Divider>
            <div className="flex items-center justify-between">
                <div><HeartOutlined className=" mx-5 text-lg cursor-pointer" /></div>
                <div className='flex'><CommentOutlined className="ml-5 mr-1 text-lg cursor-pointer" /><p>Comments</p></div>
            </div>

            <Modal
                visible={modalVisible}
                onCancel={handleCancelModal}
                footer={null}
                bodyStyle={{ padding: 0 }}
            >
                <Carousel
                    initialSlide={currentImageIndex}
                    dots={false}
                    autoplay={false}
                    arrows={true}
                    className='w-auto p-3'
                >
                    {post.imageUrls &&
                        post.imageUrls.map((imageUrl, index) => (
                            <div key={index} className='w-auto'>
                                <img
                                    className="w-full h-auto object-cover"
                                    alt={`full-post-${index}`}
                                    src={`http://localhost:4000/api/v1/${imageUrl}`}
                                />
                            </div>
                        ))}
                </Carousel>
            </Modal>

            <Modal
                title="Edit Post"
                open={isEditModalOpen}
                onCancel={handleCancelEditModal}
                footer={[
                    <Button key="cancel" onClick={handleCancelEditModal}>
                        Cancel
                    </Button>,
                    <Button key="update" type="primary" loading={uploading} onClick={handleUpdatePost}>
                        {uploading ? 'Updating...' : 'Update Post'}
                    </Button>,
                ]}
            >
                <Form layout="vertical">
                    <Form.Item label="Caption">
                        <Input.TextArea rows={4} value={editCaption} onChange={handleEditCaptionChange} />
                    </Form.Item>
                    <Form.Item label="Images">
                        <Upload
                            listType="picture-card"
                            fileList={editImageFiles.map(file => ({
                                uid: file.uid,
                                name: file.name,
                                status: 'done',
                                url: file.url || URL.createObjectURL(file),
                            }))}
                            onChange={handleEditImageChange}
                            multiple
                            beforeUpload={() => false}
                            itemRender={(originNode, file, fileList) => (
                                <React.Fragment>
                                    {originNode}
                                    <div className="ant-upload-list-item-actions">
                                        <DeleteOutlined onClick={() => {
                                            setEditImageFiles(prevFiles => prevFiles.filter(f => f.uid !== file.uid));
                                        }} />
                                    </div>
                                </React.Fragment>
                            )}
                        >
                            {editImageFiles.length >= 8 ? null : <PlusOutlined />}
                        </Upload>
                        <p className="text-gray-500 text-sm mt-1">You can upload up to 8 images.</p>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default MyPosts;