import React from 'react'
import { Avatar } from 'antd'
import {Link} from 'react-router-dom'
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
          <li><Link to="">Home</Link></li>
          <li><Link to="">My Network</Link></li>
          <li><Link to="">Events</Link></li>
          <li><Link to="">Message</Link></li>
          <li><Link to="">Notification</Link></li>
          <li><Link to="">Learning</Link></li>
        </ul>
      </div>
      <div>
        <Avatar size={38}/>
      </div>

    </div>
  )
}

export default NavigationBar
