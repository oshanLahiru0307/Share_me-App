import React, { useState, useEffect } from 'react';
import { Avatar, Button, message, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import userState from '../State/UserState';
import UserService from '../ServiceController/UserServices';
import ProfileCard from '../Components/ProfileCard'
import NavigationBar from '../Components/NavigationBar'

const MyNetwork = () => {
    const navigate = useNavigate();
    const snap = useSnapshot(userState);
    const userId = snap.userId;
    const [myFriends, setMyFriends] = useState([]);
    const [allFriends, setAllFriends] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchMyFriends = async () => {
        if (!userId) return;
        setLoading(true);
        try {
            const friendsData = await UserService.getUserFriends(userId);
            setMyFriends(friendsData);
        } catch (error) {
            console.error('Error fetching friends:', error);
            message.error('Failed to fetch friends');
        } finally {
            setLoading(false);
        }
    };

    const fetchAllFriends = async () => {
        if (!userId) return;
        setLoading(true);
        try {
            const nonFriendsData = await UserService.getNonFriends(userId);
            setAllFriends(nonFriendsData);
        } catch (error) {
            console.error('Error fetching non-friends:', error);
            message.error('Failed to fetch non-friends');
        } finally {
            setLoading(false);
        }
    };

    const handleFollowUnfollowUser = async (friendId, friendName, listToUpdate) => {
        try {
            const response = await UserService.followUnfollowUser(userId, friendId);
            if (response) {
                if (listToUpdate === 'myFriends') {
                    message.success(`You unfollowed ${friendName}`); // Consistent message
                } else {
                    message.success(`You followed ${friendName}`);
                }
                // Refresh both lists after the action
                fetchMyFriends();
                fetchAllFriends();
            }
        } catch (error) {
            console.error('Error following/unfollowing user', error);
            message.error('Failed to update user list');
        }
    };

    useEffect(() => {
        if (userId) {
            fetchMyFriends();
            fetchAllFriends();
        }
    }, [userId]);

    const MyFriendsComponent = () => {
        return (
            <div className='w-auto h-auto bg-white'>
                <div className='h-[auto] px-4'>
                    {loading ? (
                        <div>Loading friends...</div>
                    ) : myFriends && myFriends.length > 0 ? (
                        myFriends.map((friend) => (
                            <div
                                key={friend.id}
                                className='w-[1000px] bg-white rounded-lg border-2 border-blue-100 p-4 my-5 flex flex-row gap-10 items-center justify-between hover:shadow-md transition-shadow duration-300 ease-in-out'
                            >
                                <div className='flex flex-row gap-2 items-center'>
                                    <Avatar
                                        onClick={() => navigate(`/otherUserProfile/${friend.id}`)}
                                        style={{
                                            border: '3px solid white',
                                            cursor: 'pointer'
                                        }}
                                        size={48}
                                        src={`http://localhost:4000/api/v1/${friend.profileImg}`}
                                        alt={friend.name}
                                        className=''
                                    />
                                    <div>
                                        <p className='font-bold'>{friend.name}</p>
                                        <p className='text-sm'>{friend.occupation || 'No occupation'}</p>
                                    </div>
                                </div>
                                <Button
                                    danger
                                    style={{ width: '80px' }}
                                    onClick={() => handleFollowUnfollowUser(friend.id, friend.name, 'myFriends')} // Pass list identifier
                                >
                                    Unfollow
                                </Button>
                            </div>
                        ))
                    ) : (
                        <p>No friends to display.</p>
                    )}
                </div>
            </div>
        );
    };

    const AllFriendsComponent = () => {
        return (
            <div className='flex flex-row justify-start flex-wrap gap-4 mx-12'>
                {loading ? (
                    <div>Loading users...</div>
                ) : allFriends && allFriends.length > 0 ? (
                    allFriends.map((friend) => (
                        <div
                            key={friend.id}
                            className='w-[200px] mx-4 bg-white rounded-lg border-2 border-blue-100 p-4 my-5 flex flex-col gap-5 items-center hover:shadow-lg transition-shadow duration-300 ease-in-out'
                        >
                            <div className='flex items-center'>
                                <Avatar
                                    style={{
                                        border: '3px solid white',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => navigate(`/otherUserProfile/${friend.id}`)}
                                    size={64}
                                    src={`http://localhost:4000/api/v1/${friend.profileImg}`}
                                    alt={friend.name}
                                    className=''
                                />
                            </div>
                            <div className='text-center'>
                                <p className='font-bold'>{friend.name}</p>
                                <p className='text-sm'>{friend.occupation || 'No occupation'}</p>
                            </div>
                            <Button
                                type='primary'
                                style={{ width: '80px' }}
                                onClick={() => handleFollowUnfollowUser(friend.id, friend.name, 'allFriends')} // Pass list identifier
                            >
                                + Follow
                            </Button>
                        </div>
                    ))
                ) : (
                    <p>No users to display.</p>
                )}
            </div>
        );
    };

    return (
        <div className='bg-slate-200 h-auto pb-5'>
            <NavigationBar />
            <div className='flex flex-row gap-10 mt-10 mx-10'>
                <div className='w-auto'>
                    <ProfileCard />
                </div>
                <div className='w-[1200px] h-auto bg-white rounded-lg shadow-lg p-4'>
                    <div>
                        <p className='text-blue-500 text-lg font-semibold '>My Friends</p>
                        <MyFriendsComponent />
                    </div>
                    <Divider style={{ borderColor: '#bbbbbb', height: '2px', margin: '50px 0 30px 0' }}></Divider>
                    <div>
                        <p className='text-blue-500 text-lg font-semibold '>People you may know</p>
                        <AllFriendsComponent />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyNetwork;
