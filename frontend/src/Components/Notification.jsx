import React, { useState, useEffect } from 'react';
import NavigationBar from './NavigationBar';
import ProfileCard from './ProfileCard';
import UserList from './UserList';
import NotificationService from '../ServiceController/NotificationServies';
import { useSnapshot } from 'valtio';
import state from '../State/UserState';
import { EllipsisOutlined } from '@ant-design/icons';
import { Dropdown, Button } from 'antd';

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const snap = useSnapshot(state);
    const userId = snap.userId;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const fetchNotifications = async () => {
        try {
            const response = await NotificationService.getNotification(userId);
            setNotifications(response);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleClearAll = () => {
        setNotifications([]);
        setIsDropdownOpen(false);
    };

    const menu = {
        items: [
            {
                key: 'clear',
                label: 'Mark All As Read',
                onClick: handleClearAll,
            },
            // Add more options if needed
        ],
    };

    return (
        <div>
            <NavigationBar />
            <div className='flex flex-row justify-between mx-10 mt-10'>
                <ProfileCard />
                <div className='w-[600px] h-auto bg-white rounded-lg shadow-lg p-4 sticky top-24'>
                    <div className='flex flex-row justify-between items-center'>
                        <h1 className='text-blue-500 text-lg font-medium'>Notification</h1>
                        <Dropdown
                            menu={menu}
                            trigger={['click']}
                            open={isDropdownOpen}
                            onOpenChange={setIsDropdownOpen}
                        >
                            <Button
                                type="ghost"
                                className="p-0 h-auto"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent dropdown from closing immediately
                                    setIsDropdownOpen(!isDropdownOpen);
                                }}
                            >
                                <EllipsisOutlined className='cursor-pointer font-medium' />
                            </Button>
                        </Dropdown>
                    </div>
                    <div>
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <div key={notification._id} className='mt-2 bg-blue-200 flex flex-row gap-2 items-center border-2 rounded-md border-gray-200 p-2'>
                                    <div className=''>
                                        <p className='text-m text-black'>{notification.message}</p>
                                        <p className='text-xs text-gray-400'>{new Date(notification.createdAt).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-500 text-center mt-4">No new notifications.</div>
                        )}
                    </div>
                </div>
                <div className="w-auto h-[570px] bg-white rounded-lg shadow-lg p-4 sticky top-24 ">
                    <p className="text-blue-500 text-lg font-semibold pb-2">Add to your feed</p>
                    <div className='h-[500px] sticky top-5 overflow-y-auto pb-4 px-4'>
                        <UserList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;
