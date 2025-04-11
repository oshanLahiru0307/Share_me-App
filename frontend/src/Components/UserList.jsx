import React from 'react'
import { Avatar, Button } from 'antd'
import { useSnapshot } from 'valtio'
import {useState, useEffect} from 'react'
import UserState from '../State/UserState'
import UserServices from '../ServiceController/UserServices'

const UserList = () => {
    const snap = useSnapshot(UserState)
    const userId = snap.userId
    const [users, setUsers] = useState([])


    const fetchUsers = async () => {
        try {
            const response = await UserServices.getNonFriends(userId)
            setUsers(response)
            console.log('Fetched users:', response) // Debugging line
        } catch (error) {
            console.error('Error fetching users:', error)
        } 
    }

    useEffect(() => {
        if (userId) { // Only fetch if userId is available
            fetchUsers()
        }
    }, [])



    return (
        <div>
            {(
                users && users.length > 0 ? ( // Added a check if users exists
                    users.map((user) => (
                        <div
                            key={user.id}
                            className='w-[auto] bg-white rounded-lg border-2 border-blue-100 p-4 my-5 flex flex-row gap-10 items-center justify-between'
                        >
                            <div className='flex flex-row gap-2 items-center' >
                                <Avatar
                                    style={{
                                        border: '3px solid white',
                                    }}
                                    size={48}
                                    src={`http://localhost:4000/api/v1/${user.profileImg}`}
                                    alt={user.name}
                                    className=''
                                />
                                <div>
                                    <p className='font-bold'>{user.name}</p>
                                    <p className='text-sm'>{user.occupation || 'No occupation'}</p>
                                </div>
                            </div>
                            <Button
                                style={{
                                    width: '80px'
                                }}
                            >+ Follow</Button>
                        </div>
                    ))
                ) : (
                    <div>No other users to display.</div>
                )
            )}
        </div>
    )
}

export default UserList