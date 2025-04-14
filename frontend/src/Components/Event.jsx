import React from 'react';
import NavigationBar from './NavigationBar';
import ProfileCard from './ProfileCard';
import { Button, Divider, Modal, Form, Input, DatePicker, TimePicker, Menu, Dropdown, message } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import { useSnapshot } from 'valtio';
import userState from '../State/UserState';
import { useState, useEffect } from 'react';
import UserServices from '../ServiceController/UserServices';
import EventService from '../ServiceController/EventService';
import dayjs from 'dayjs';

const Event = () => {
  const [form] = Form.useForm();
  const snap = useSnapshot(userState);
  const userId = snap.userId;
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState('');
  const [events, setEvents] = useState([]);
  const [othersEvents, setOthersEvent] = useState([]) // State to hold the fetched events
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [file, setFile] = useState(null);

  const fetchUserProfile = async () => {
    try {
      const response = await UserServices.getUserById(userId);
      setUser(response);
      setUserName(response.name);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchOthersEvents = async () => {
    try {
      const response = await EventService.getOtherEvents(userId);
      setOthersEvent(response);
      console.log('Fetched Events:', response);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }

  const fetchEvents = async () => {
    try {
      // Assuming you have a function in EventService to fetch events by user ID
      const response = await EventService.getEventByUserId(userId);
      setEvents(response);
      console.log('Fetched Events:', response);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchEvents();
    fetchOthersEvents() // Fetch events when the component mounts
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
        formData.append('eventId', selectedEvent ? selectedEvent.id : null); // Include event ID if editing
  
        if(!selectedEvent){
        const newEvent = await EventService.createEvent(formData);
        console.log('Event created:', newEvent);
        setModalVisible(false);
        form.resetFields();
        setFile(null);
        fetchEvents(); // Refetch events after creating a new one
        }else{
          const newEvent = await EventService.updateEvent(formData);
          console.log('Event created:', newEvent);
          setModalVisible(false);
          form.resetFields();
          setFile(null);
          fetchEvents();
        }
      } catch (error) {
        console.error('Error creating event:', error);
        message.error('Failed to create event');
      }
    
    
  };

  const showDeleteConfirm = (event) => {
    setEventToDelete(event);
    setConfirmDeleteVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (eventToDelete && eventToDelete.id) {
      try {
        await EventService.deleteEvent(eventToDelete.id); // Assuming your backend expects an 'id' to delete
        message.success('Event deleted successfully');
        fetchEvents(); // Refetch events after deletion
      } catch (error) {
        console.error('Error deleting event:', error);
        message.error('Failed to delete event');
      } finally {
        setConfirmDeleteVisible(false);
        setEventToDelete(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setConfirmDeleteVisible(false);
    setEventToDelete(null);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    form.setFieldsValue({
      topic: event.topic,
      organization: event.organization,
      date: dayjs(event.date),
      time: dayjs(event.time, 'HH:mm:ss'),
      location: event.location,
      description: event.description,
      speaker: event.speaker,
      link: event.link,
    });
    setModalVisible(true);
  };

  const eventMenu = (event) => (
    <Menu>
      <Menu.Item key='edit' onClick={() => handleEditEvent(event)}>
        Edit
      </Menu.Item>
      <Menu.Item key='delete' onClick={() => showDeleteConfirm(event)}>
        Delete
      </Menu.Item>
    </Menu>
  );

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
              {events.map((event) => (
                <div
                  key={event.id} // Assuming each event has a unique 'id'
                  className='w-[250px] h-auto bg-white rounded-lg shadow-lg hover:shadow-md transition-shadow duration-300 ease-in-out'
                >
                  <div
                    style={{
                      width: '100%',
                      height: '150px',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: '8px 8px 0 0',
                      backgroundImage: event.imgUrl ? `url("http://localhost:4000/api/v1/${event.imgUrl}")` : 'url("https://via.placeholder.com/150")', // Use actual image URL
                    }}
                  >
                    <Dropdown overlay={eventMenu(event)} trigger={['click']} placement='bottomRight'>
                      <UnorderedListOutlined className='float-right font-bold text-white text-xl m-3 cursor-pointer' />
                    </Dropdown>
                  </div>
                  <div className='p-4'>
                    <p className='text-md font-medium mb-2'>{event.topic}</p>
                    <p className=''>{dayjs(event.date).format('YYYY-MM-DD')} {event.time}</p>
                    <p className=''>{event.location}</p>
                    <p className=''>{event.organization}</p>
                  </div>
                  <div className='mb-4 flex justify-center items-center'>
                    <Button type='primary' className='w-28'>
                      View
                    </Button>
                  </div>
                </div>
              ))}
              {events.length === 0 && <p>No events created yet.</p>}
            </div>
          </div>

          <Divider
            style={{ borderColor: '#bbbbbb', height: '2px', margin: '50px 0 30px 0' }}
          ></Divider>

          <div>
            <p className='text-blue-500 text-lg font-semibold '>Recommended for you</p>
            <div className='w-full h-auto flex flex-row gap-8 items-center justify-start my-5'>
              {/* You'll need to fetch and map through recommended events here */}
              {othersEvents.map((event) => (
              <div className='w-[250px] h-auto bg-white rounded-lg shadow-lg hover:shadow-md transition-shadow duration-300 ease-in-out'>
                <div
                  style={{
                    width: '100%',
                    height: '150px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '8px 8px 0 0',
                    backgroundImage:
                      `url("http://localhost:4000/api/v1/${event.imgUrl}")`,
                  }}
                ></div>
                  <div className='p-4'>
                    <p className='text-md font-medium mb-2'>{event.topic}</p>
                    <p className=''>{dayjs(event.date).format('YYYY-MM-DD')} {event.time}</p>
                    <p className=''>{event.location}</p>
                    <p className=''>{event.organization}</p>
                  </div>
                <div className='mb-4 flex justify-center items-center'>
                  <Button type='primary' className='w-28'>
                    View
                  </Button>
                </div>
              </div>
               ))}
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
          {/* ... your form fields ... */}
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
              {(selectedEvent ? 'Update' : 'Create') } Event
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title='Confirm Delete'
        visible={confirmDeleteVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
      >
        <p>Are you sure you want to delete this event?</p>
      </Modal>
    </div>
  );
};

export default Event;