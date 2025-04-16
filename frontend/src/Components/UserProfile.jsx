import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Avatar, Button, Menu, Dropdown, Form, Input, Modal as AntdModal, Upload, message, Divider, Carousel, Modal } from 'antd';
import UserService from '../ServiceController/UserServices';
import PostController from '../ServiceController/PostController';
import UserList from './UserList';
import ProfileCard from './ProfileCard';
import NavigationBar from './NavigationBar';
import CreatePost from './CreatePost';
import LinksCard from './Links';
import { CameraFilled, EditFilled, DeleteOutlined, EllipsisOutlined, HeartOutlined, CommentOutlined } from '@ant-design/icons';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const UserProfile = () => {
  const userId = useParams().id;
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [selectedPostImages, setSelectedPostImages] = useState([]);
  const [editImageFiles, setEditImageFiles] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [editForm] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const fetchUserProfile = async () => {
    try {
      const response = await UserService.getUserById(userId);
      console.log('User Profile:', response);
      setUser(response);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await PostController.getPostsByUserId(userId);
      console.log('Posts:', response);
      setPosts(response);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchPosts();
  }, [userId]);

  const showImageModal = (imageUrls, index) => {
    console.log('Showing modal for index:', index, 'with images:', imageUrls);
    setSelectedPostImages(imageUrls);
    setCurrentImageIndex(index);
    setModalVisible(true);
  };

  const handleCancelModal = () => {
    console.log('Closing modal');
    setModalVisible(false);
    setSelectedPostImages([]);
    setCurrentImageIndex(0);
  };

  const handleMenuClick = (e, post) => {
    if (e.key === 'edit') {
      handleEditPost(post);
    } else if (e.key === 'delete') {
      handleDeletePost(post);
    }
  };

  const postMenu = (post) => (
    <Menu onClick={(e) => handleMenuClick(e, post)}>
      <Menu.Item key="edit">
        <EditFilled /> Edit
      </Menu.Item>
      <Menu.Item key="delete">
        <DeleteOutlined /> Delete
      </Menu.Item>
    </Menu>
  );

  const handleEditPost = (post) => {
    setEditingPost(post);
    editForm.setFieldsValue({
      caption: post.caption,
    });

    const initialFileList = post.imageUrls.map((url, index) => ({
      uid: `edit-${post.id}-${index}`,
      name: `image-${index}`,
      status: 'done',
      url: `http://localhost:4000/api/v1/${url}`,
    }));
    console.log('Initial file list:', initialFileList);
    setEditImageFiles(initialFileList);
    setEditModalVisible(true);
  };

  const handleCancelEditModal = () => {
    setEditModalVisible(false);
    setEditingPost(null);
    setFileList([]);
    editForm.resetFields();
  };

  const handleDeletePost = (post) => {
    AntdModal.confirm({
      title: 'Confirm Delete',
      content: 'Are you sure you want to delete this post?',
      async onOk() {
        try {
          await PostController.deletePost(post.id);
          message.success('Post deleted successfully');
          fetchPosts();
        } catch (error) {
          console.error('Error deleting post:', error);
          message.error('Failed to delete post');
        }
      },
      onCancel() {
        console.log('Delete cancelled');
      },
    });
  };

  const handleEditFormFinish = async (values) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('caption', values.caption);
      formData.append('postId', editingPost.id);

      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append('images', file.originFileObj);
        }
      });

      const response = await PostController.updatePost(formData);
      console.log('Post updated:', response);
      message.success('Post updated successfully');
      setEditModalVisible(false);
      setEditingPost(null);
      setFileList([]);
      editForm.resetFields();
      fetchPosts();
    } catch (error) {
      console.error('Error updating post:', error);
      message.error('Failed to update post.');
    } finally {
      setUploading(false);
    }
  };

  const handleEditFileUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <div className='bg-slate-200 shadow-lg overflow-x-hidden'>
      <NavigationBar />
      <div className='w-[auto] h-[450px] bg-white mx-10 rounded-b-md shadow-lg relative'>
        <div style={{
          width: '100%',
          height: '250px',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundImage: `url("http://localhost:4000/api/v1/${user.coverImg}")`,
        }}>
          <Button className='absolute top-[210px] right-4 font-semibold'><CameraFilled />Edit Cover Image</Button>
        </div>
        <Avatar
          style={{
            border: '3px solid white',
          }}
          size={160} src={`http://localhost:4000/api/v1/${user.profileImg}`}
          className='absolute top-40 left-10'
        />
        <Button className='absolute left-40 top-44 rounded-full w-10 h-10 p-3'><CameraFilled className='text-xl' /></Button>
        <div className='absolute w-full top-[310px] left-12 mt-4'>
          <h1 className='font-bold text-3xl mb-1'>{user.name}</h1>
          <h1 className='font-normal mb-1'>{user.occupation}</h1>
          <h1 className='font-normal mb-1'>{user.address}</h1>
          <Button className='absolute right-16 top-14 font-semibold mr-1'><EditFilled />Edit Profile</Button>
        </div>
      </div>

      <div className=' w-[auto] h-auto flex flex-row mx-10 mt-10 gap-10'>
        <ProfileCard />
        <div className='w-[620px] h-auto'>
          <CreatePost />
          {posts.map((post) => (
            <div key={post._id} className=" w-[auto] mt-5 mb-5 rounded-lg shadow-md bg-white p-4">
              <div className="flex justify-between items-center pb-3">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(`/userProfile/${userId}`)}>
                  <Avatar size={48} src={`http://localhost:4000/api/v1/${user.profileImg}`} />
                  <div>
                    <p className="my-0 mx-0 font-semibold">{user.name}</p>
                    <p className="my-0 mx-0 text-xs text-gray-500">{user.occupation}</p>
                  </div>
                </div>
                <Dropdown overlay={postMenu(post)} trigger={['click']}>
                  <EllipsisOutlined className="text-2xl cursor-pointer" />
                </Dropdown>
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
                      onClick={() => showImageModal(post.imageUrls, 0)}
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
                              onClick={() => showImageModal(post.imageUrls, index)}
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
            </div>
          ))}
        </div>
        <div>
          <div className="w-[auto] h-auto bg-white rounded-lg shadow-lg p-4 ">
            <p className="text-blue-500 text-lg font-semibold pb-2">Add to your feed</p>
            <div className='h-[550px] sticky top-5 overflow-y-auto pb-4 px-4'>
              <UserList />
            </div>
          </div>
          <div className='sticky top-[100px]'>
            <LinksCard />
            <LinksCard />
          </div>
        </div>
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
          className='w-auto'
        >
          {selectedPostImages.map((imageUrl, index) => (
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
        visible={editModalVisible}
        onCancel={handleCancelEditModal}
        footer={[
          <Button key="cancel" onClick={handleCancelEditModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={uploading} onClick={() => editForm.submit()}>
            {uploading ? 'Updating...' : 'Update Post'}
          </Button>,
        ]}
      >
                      {console.log('editImageFiles list:', editImageFiles)}
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleEditFormFinish}
        >
          <Form.Item
            name="caption"
            label="Caption"
          >
            <Input.TextArea rows={4} />
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
              multiple
              onChange={handleEditFileUploadChange}
              beforeUpload={() => false}
              itemRender={(originNode, file) => (
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
              {fileList.length < 5 && '+ Upload'}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserProfile;