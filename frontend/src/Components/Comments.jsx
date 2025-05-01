import React, { useState, useEffect } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import UserServices from '../ServiceController/UserServices';

const PostComments = ({ comments }) => {
  const [commentUsers, setCoomentUsers] = useState({}); 

  useEffect(() => {

    const fetchCommentUsers = async () => {
      const fetchedUsers = {};
      for (const userId of Object.keys(comments)) {
        try {
          const response = await UserServices.getUserById(userId);
          console.log('Fetched user:', response); // Debugging line
          if (response) {
            fetchedUsers[userId] = response;
          } else {
            console.error(`Failed to fetch user data for ID: ${userId}`);
            fetchedUsers[userId] = { name: 'Unknown User' };
          }
        } catch (error) {
          console.error(`Error fetching user data for ID: ${userId}`, error);
          fetchedUsers[userId] = { name: 'Unknown User' };
        }
      }
      setCoomentUsers(fetchedUsers);
    };

    if (comments && Object.keys(comments).length > 0) {
      fetchCommentUsers();
    }
  }, [comments]);

  const getCommentObject = (commentString) => {
    try {
      return JSON.parse(commentString);
    } catch (error) {
      console.error("Error parsing comment string:", commentString, error);
      return { comment: "Invalid Comment Data" };
    }
  };

  return (
    <div className='w-full h-auto mt-2'>
      {comments && Object.entries(comments).map(([userId, commentString]) => {
        const commentData = getCommentObject(commentString);
        const user = commentUsers[userId] || { name: 'Unknown User' }; 
        return (
          <div key={userId} className='bg-slate-200 rounded-lg px-3 py-2 mb-2'>
            <EllipsisOutlined className='float-right text-slate-950 text-lg cursor-pointer' />
            <div className='flex flex-col gap-[2px]'>
              <p className='font-bold text-sm'>{user.name}</p>
              <p>{commentData.comment}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostComments;
