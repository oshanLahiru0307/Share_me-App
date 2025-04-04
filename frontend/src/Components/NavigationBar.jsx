import React from 'react'
import { Avatar } from 'antd'
import logo from '../assets/airbnb_1724634.png'

const NavigationBar = () => {
  return (
    <div className='w-full flex justify-between items-center bg-white shadow-md px-8 py-3'>
      <div className='flex items-center'>
        <img src={logo} alt="Logo" style={{ width: "50px", height: "50px" }} />
        <h1 className='mx-3 text-blue-500 font-semibold text-lg'>Share Me</h1>
      </div>
      <div>
        <ul className='flex items-center space-x-8'>
          <li>Home</li>
          <li>My Network</li>
          <li>Events</li>
          <li>Message</li>
          <li>Notification</li>
          <li>Learning</li>
        </ul>
      </div>
      <div>
        <Avatar size={38}/>
      </div>

    </div>
  )
}

export default NavigationBar
