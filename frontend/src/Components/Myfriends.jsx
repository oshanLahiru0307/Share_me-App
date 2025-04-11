import React from 'react'
import { Avatar, Button } from 'antd'
import { useSnapshot } from 'valtio'
import { useState, useEffect } from 'react'
import userState from '../State/UserState'
import UserService from '../ServiceController/UserServices'

const Myfriends = () => {
    const snap = useSnapshot(userState)
    const userId = snap.userId
    const [user, setUser] = useState({})
    const [friends, setFriends] = useState([])

    const fetchUserProfile = async () => {
        try {
            const response = await UserService.getUserById(userId)
            console.log('User Profile:', response)
            setUser(response)
        } catch (error) {
            console.error('Error fetching user profile:', error)
        }
    }

    const fetchFriends = async () => {
        try {
            const friendsData = await UserService.getUserFriends(userId)
            console.log('Friends:', friendsData)
            setFriends(friendsData)
        } catch (error) {
            console.error('Error fetching friends:', error)
        }
    }

    useEffect(() => {
        fetchUserProfile()
        fetchFriends()
    }, [])

    return (
        <div className='w-auto h-auto bg-white'>
            <div className='h-[auto] px-4'>
                {friends.length > 0 ? (
                    friends.map((friend) => (
                        <div
                            key={friend.id} // Important: Add a unique key for each friend
                            className='w-[1000px] bg-white rounded-lg border-2 border-blue-100 p-4 my-5 flex flex-row gap-10 items-center justify-between hover:shadow-md transition-shadow duration-300 ease-in-out'
                        >
                            <div className='flex flex-row gap-2 items-center' >
                                <Avatar
                                    style={{
                                        border: '3px solid white',
                                    }}
                                    size={48}
                                    src={`http://localhost:4000/api/v1/${friend.profileImg}`} // Assuming your friend object has a profileImg property
                                    alt={friend.name} // Add alt text for accessibility
                                    className=''
                                />
                                <div>
                                    <p className='font-bold'>{friend.name}</p> {/* Assuming your friend object has a name property */}
                                    <p className='text-sm'>{friend.occupation || 'No occupation'}</p> {/* Assuming an optional occupation property */}
                                </div>
                            </div>
                            <Button
                                danger
                                style={{
                                    width: '80px'
                                }}>Unfollow</Button>
                        </div>
                    ))
                ) : (
                    <p>No friends to display.</p>
                )}
            </div>
        </div>
    )
}

export default Myfriends