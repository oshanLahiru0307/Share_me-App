import React from 'react'
import { Avatar } from 'antd'
import { Link } from 'react-router-dom'
import logo from '../assets/airbnb_1724634.png'
import { HomeOutlined, UsergroupAddOutlined, MessageOutlined, BellOutlined, SlackOutlined, LaptopOutlined} from '@ant-design/icons'

const NavigationBar = () => {
  return (
    <div className='w-full flex justify-between items-center bg-gradient-to-r from-blue-50 to-blue-500  shadow-lg px-8 py-3'>
      <div className='flex items-center'>
        <img src={logo} alt="Logo" style={{ width: "50px", height: "50px" }} />
        <h1 className='mx-3 text-blue-500 font-semibold text-lg'>Share Me</h1>
      </div>
      <div>
        <ul className='flex items-center space-x-12'>
          <li>
            <Link className='flex flex-col items-center gap-2' to="">
              <HomeOutlined />
              <p className='text-xs font-semibold'>Home</p>
            </Link>
          </li>
          <li>
            <Link className='flex flex-col items-center gap-2' to="">
            <UsergroupAddOutlined/>
            <p className='text-xs font-semibold'>My Network</p>
            </Link>
          </li>
          <li>
            <Link className='flex flex-col items-center gap-2' to="">
            <SlackOutlined/>
            <p className='text-xs font-semibold'>Events</p>
            </Link>
          </li>
          <li>
            <Link className='flex flex-col items-center gap-2' to="">
            <MessageOutlined/>
            <p className='text-xs font-semibold'>Message</p>
            </Link>
          </li>
          <li>

            <Link className='flex flex-col items-center gap-2' to="">
            <LaptopOutlined/>
            <p className='text-xs font-semibold'>Learning</p>
            </Link>
          </li>
          <li>
            <Link className='flex flex-col items-center gap-2' to="">
            <BellOutlined/>
            <p className='text-xs font-semibold'>Notificaion</p>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <Avatar size={38} src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      </div>

    </div>
  )
}

export default NavigationBar
