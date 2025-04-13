import React from 'react';
import NavigationBar from './NavigationBar';
import ProfileCard from './ProfileCard';
import { Button, Divider, Modal, Form, Input, DatePicker, TimePicker } from 'antd';
import { useSnapshot } from 'valtio';
import userState from '../State/UserState';
import { useState, useEffect } from 'react';
import EventService from '../ServiceController/EventService';
import dayjs from 'dayjs';

const Event = () => {
  const [form] = Form.useForm();
  const snap = useSnapshot(userState);
  const userId = snap.userId; // Assuming userName is also available in userState
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState(''); // Initialize userName state
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [file, setFile] = useState(null);

  const fetchUserProfile = async () => {
    try {
      const response = await EventService.getUserById(userId);
      console.log('User Profile:', response);
      setUser(response);
      setUserName(response.name) // Update userName from the fetched user data
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }

  useEffect(()=> {
    fetchUserProfile();
  }, [userId]);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
    setFile(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append('topic', values.topic);
      formData.append('organization', values.organization);
      formData.append('date', dayjs(values.date).format('YYYY-MM-DD'));
      formData.append('time', dayjs(values.time).format('HH:mm:ss'));
      formData.append('location', values.location);
      formData.append('description', values.description);
      formData.append('speaker', values.speaker);
      if (file) {
        formData.append('image', file);
      }
      if (values.link) {
        formData.append('link', values.link);
      }
      formData.append('userId', userId);
      formData.append('userName', userName);

      const newEvent = await EventService.createEvent(formData);
      console.log('Event created:', newEvent);
      setModalVisible(false);
      form.resetFields();
      setFile(null);
      // Optionally, you can refetch the events list here to update the UI
    } catch (error) {
      console.error('Error creating event:', error);
      // Handle error feedback to the user
    }
  };

  return (
    <div className='bg-slate-200 h-auto pb-5'>
      <NavigationBar />
      <div className='flex flex-row gap-10 mt-10 mx-10'>
        <div className='w-auto'>
          <ProfileCard />
        </div>
        <div className='w-[1200px] h-auto bg-white rounded-lg shadow-lg p-8'>
          <div className='flex flex-row gap-10 items-center justify-between mb-5'>
            <p className='text-blue-500 text-2xl font-semibold '>Events</p>
            <Button onClick={showModal} className='text-black'>
              + Create New Event
            </Button>
          </div>
          <Divider style={{ borderColor: '#bbbbbb', height: '2px' }}></Divider>
          <div>
            <p className='text-blue-500 text-lg font-semibold '>Your Events</p>
            <div className='w-full h-auto flex flex-row gap-8 items-center justify-start my-5'>
              <div className='w-[250px] h-auto bg-white rounded-lg shadow-lg hover:shadow-md transition-shadow duration-300 ease-in-out'>
                <div
                  style={{
                    width: '100%',
                    height: '150px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '8px 8px 0 0',
                    backgroundImage:
                      'url("https://www.echelonedge.com/wp-content/uploads/2023/06/National-Technology-Week-feature.png")',
                  }}
                ></div>
                <div className='p-4'>
                  <p className='text-md font-medium mb-2'>Your Events</p>
                  <p className=''>Date & time</p>
                  <p className=''>Place</p>
                  <p className=''>Organization</p>
                </div>
                <div className='mb-4 flex justify-center items-center'>
                  <Button type='primary' className='w-28'>
                    View
                  </Button>
                </div>
              </div>
              <div className='w-[250px] h-auto bg-white rounded-lg shadow-lg hover:shadow-md transition-shadow duration-300 ease-in-out'>
                <div
                  style={{
                    width: '100%',
                    height: '150px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '8px 8px 0 0',
                    backgroundImage:
                      'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvb-1h2ar_TvnchzdepiLTyWyoKf8Zt1EuvA&s")',
                  }}
                ></div>
                <div className='p-4'>
                  <p className='text-md font-medium mb-2'>Your Events</p>
                  <p className=''>Date & time</p>
                  <p className=''>Place</p>
                  <p className=''>Organization</p>
                </div>
                <div className='mb-4 flex justify-center items-center'>
                  <Button type='primary' className='w-28'>
                    View
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Divider
            style={{ borderColor: '#bbbbbb', height: '2px', margin: '50px 0 30px 0' }}
          ></Divider>

          <div>
            <p className='text-blue-500 text-lg font-semibold '>Recomonded for you</p>
            <div className='w-full h-auto flex flex-row gap-8 items-center justify-start my-5'>
              <div className='w-[250px] h-auto bg-white rounded-lg shadow-lg hover:shadow-md transition-shadow duration-300 ease-in-out'>
                <div
                  style={{
                    width: '100%',
                    height: '150px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '8px 8px 0 0',
                    backgroundImage:
                      'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtUZz3LObEXEWZq5dd9KH-wqaR_qW_j7L2Bg&s")',
                  }}
                ></div>
                <div className='p-4'>
                  <p className='text-md font-medium mb-2'>Your Events</p>
                  <p className=''>Date & time</p>
                  <p className=''>Place</p>
                  <p className=''>Organization</p>
                </div>
                <div className='mb-4 flex justify-center items-center'>
                  <Button type='primary' className='w-28'>
                    View
                  </Button>
                </div>
              </div>
              <div className='w-[250px] h-auto bg-white rounded-lg shadow-lg hover:shadow-md transition-shadow duration-300 ease-in-out'>
                <div
                  style={{
                    width: '100%',
                    height: '150px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '8px 8px 0 0',
                    backgroundImage:
                      'url("https://thewaltdisneycompany.com/app/uploads/2025/01/Rita-Ferro-%E2%80%93-Disney-Global-Tech-Data-Showcase-2025-1024x700.jpg")',
                  }}
                ></div>
                <div className='p-4'>
                  <p className='text-md font-medium mb-2'>Your Events</p>
                  <p className=''>Date & time</p>
                  <p className=''>Place</p>
                  <p className=''>Organization</p>
                </div>
                <div className='mb-4 flex justify-center items-center'>
                  <Button type='primary' className='w-28'>
                    View
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title='Create New Event'
        visible={modalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout='vertical' onFinish={onFinish}>
          <Form.Item
            name='topic'
            label='Topic'
            rules={[{ required: true, message: 'Please enter the event topic!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='organization'
            label='Organization'
            rules={[{ required: true, message: 'Please enter the organization!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='date'
            label='Date'
            rules={[{ required: true, message: 'Please select the event date!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name='time'
            label='Time'
            rules={[{ required: true, message: 'Please select the event time!' }]}
          >
            <TimePicker style={{ width: '100%' }} format='HH:mm:ss' />
          </Form.Item>
          <Form.Item
            name='location'
            label='Location'
            rules={[{ required: true, message: 'Please enter the event location!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='description'
            label='Description'
            rules={[{ required: true, message: 'Please enter the event description!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name='speaker'
            label='Speaker'
            rules={[{ required: true, message: 'Please enter the event speaker!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name='image' label='Image'>
            <input type='file' onChange={handleFileChange} />
          </Form.Item>
          <Form.Item name='link' label='Link (Optional)'>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Create Event
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Event;