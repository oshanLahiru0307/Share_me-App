import React from 'react'
import { Avatar, Button } from 'antd'
import { useSnapshot } from 'valtio'
import { useState, useEffect } from 'react'
import userState from '../State/UserState'
import UserService from '../ServiceController/UserServices'

const AllFriends = () => {
    const snap = useSnapshot(userState)
    const userId = snap.userId
    const [friends, setFriends] = useState([])


    const fetchNonFriends = async () => {
        try {
            const nonFriendsData = await UserService.getNonFriends(userId)
            console.log('NonFriends:', nonFriendsData)
            setFriends(nonFriendsData)
        } catch (error) {
            console.error('Error fetching friends:', error)
        }
    }

    useEffect(() => {
        fetchNonFriends()
    }, [])

    return (
        <div className='flex flex-row justify-start flex-wrap gap-4 mx-12'>
            {friends.length > 0 ? (
                friends.map((friend) => (
                    <div
                        key={friend.id} // Important: Add a unique key for each friend
                        className='w-[200px] mx-4 bg-white rounded-lg border-2 border-blue-100 p-4 my-5 flex flex-col gap-5 items-center hover:shadow-lg transition-shadow duration-300 ease-in-out'
                    >
                        <div className='flex items-center' >
                            <Avatar
                                style={{
                                    border: '3px solid white',
                                }}
                                size={64}
                                src={`http://localhost:4000/api/v1/${friend.profileImg}`} // Assuming friend object has profileImg
                                alt={friend.name} // Add alt text for accessibility
                                className=''
                            />
                        </div>
                        <div className='text-center'>
                            <p className='font-bold'>{friend.name}</p> {/* Assuming friend object has name */}
                            <p className='text-sm'>{friend.occupation || 'No occupation'}</p> {/* Assuming optional occupation */}
                        </div>
                        <Button
                            type='primary'
                            style={{
                                width: '80px'
                            }}
                        >+ follow</Button>
                    </div>
                ))
            ) : (
                <p>No friends to display.</p>
            )}
        </div>
    )
}

export default AllFriends