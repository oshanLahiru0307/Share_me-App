import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartOutlined, EllipsisOutlined, CommentOutlined } from '@ant-design/icons';
import { Avatar, Card, Carousel, Modal } from 'antd';
import UserService from '../ServiceController/UserServices';
import { useNavigate } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

const PostsComponent = ({ post}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const userId = post.userId;

    const fetchUserProfile = async () => {
        try {
            const response = await UserService.getUserById(userId);
            console.log('User Profile:', response);
            setUser(response);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    useState(() => {
        fetchUserProfile();
    }, [userId]);

    const showImageModal = (index) => {
        setCurrentImageIndex(index);
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };
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
                                <Avatar onClick={()=>{
                                    navigate('/userProfile/'+userId)
                                }} size={48} src={`http://localhost:4000/api/v1/${user.profileImg}`} />
                                <div>
                                    <p className='my-0 mx-0 '>{user.name}</p>
                                    <p className='my-0 mx-0 font-normal text-xs'>{user.occupation}</p>
                                </div>
                            </div>
                            <Link to="/">
                                <EllipsisOutlined />
                            </Link>
                        </div>
                        <div className='py-4'>
                            <p className='text-sm font-normal  text-slate-900'>{post.caption}</p>
                        </div>
                    </div>
                }
                actions={[
                    <HeartOutlined className='float-left ml-2 h-5 w-5' key="like" />,
                    <CommentOutlined className='float-right mr-2' key="comment" />,
                ]}
            >
                {post.imageUrls && post.imageUrls.length > 0 && (
                    <div className='w-[600px]'>
                        {post.imageUrls.length === 1 ? (
                            <img
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    objectFit: 'cover', /* Try cover to fill space */
                                    cursor: 'pointer',
                                }}
                                alt="post"
                                src={`http://localhost:4000/api/v1/${post.imageUrls[0]}`}
                                onClick={() => showImageModal(0)}
                            />
                        ) : (
                            <ResponsiveMasonry
                                columnsCountBreakPoints={{ 350: 1, 750: 2, 1200: 2 }}
                                gutterBreakpoints={{ 350: "12px", 750: "16px", 1200: "24px" }} >
                                <Masonry
                                >
                                    {post.imageUrls.map((imageUrl, index) => (
                                        <div key={index}>
                                            <img
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    display: 'block',
                                                    cursor: 'pointer',
                                                    marginBottom: '8px',
                                                    objectFit: 'cover', /* Try cover to fill space */
                                                }}
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
            </Card>
            <Modal
                visible={modalVisible}
                onCancel={handleCancel}
                footer={null}
                bodyStyle={{ padding: 0 }}
            >
                <Carousel
                    initialSlide={currentImageIndex}
                    dots={false}
                    autoplay={false}
                    arrows={true}
                    className='w-auto p-3' // Enable arrows for navigation
                >
                    {post.imageUrls &&
                        post.imageUrls.map((imageUrl, index) => (
                            <div key={index} className='w-auto'>
                                <img
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        objectFit: 'cover',
                                    }}
                                    alt={`full-post-${index}`}
                                    src={`http://localhost:4000/api/v1/${imageUrl}`}
                                />
                            </div>
                        ))}
                </Carousel>
            </Modal>
        </div>
    );
};

export default PostsComponent;