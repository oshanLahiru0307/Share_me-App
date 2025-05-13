import React from 'react'
import { Avatar, Dropdown, Input, Menu } from 'antd'
import { Link } from 'react-router-dom'
import logo from '../assets/airbnb_1724634.png'
import { HomeFilled, UsergroupAddOutlined, MessageOutlined, BellOutlined, SlackOutlined, LaptopOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons'
import { useSnapshot } from 'valtio'
import userState from '../State/UserState'
import { useState, useEffect } from 'react'
import UserService from '../ServiceController/UserServices'
import { useNavigate } from 'react-router-dom'

const { Search } = Input

const NavigationBar = () => {

  const snap = useSnapshot(userState)
  const userId = snap.userId
  const [user, setUser] = useState({})
  const navigate = useNavigate()


  const fetchUserProfile = async () => {
    try {
      const response = await UserService.getUserById(userId)
      setUser(response)
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }


  const eventMenu = (event) => (
    <Menu>
      <Menu.Item key='settings' onClick={() => showSettings(event)}>
        <SettingOutlined className='mr-2' />Settings
      </Menu.Item>
      <Menu.Item key='logout' onClick={() => handleLogOutEvent(event)}>
        <LogoutOutlined className='mr-2' />LogOut
      </Menu.Item>
    </Menu>
  );

  const handleLogOutEvent = (event) => {
    navigate('/')
    localStorage.removeItem("user")
    console.log({"current user":user})
  }

  const showSettings = (event) => {
    //
  }



  useEffect(() => {
    fetchUserProfile()
  }, [userId])


  return (
    <div className='sticky top-0 z-10'>
      <div className='w-full flex justify-between items-center bg-gradient-to-r from-blue-50 to-blue-500  shadow-lg px-16 py-3 sticky'>
        <div className='flex items-center'>
          <Link to='/home'><img src={logo} alt="Logo" style={{ width: "50px", height: "50px" }} /></Link>
          <Link to='/home'><h1 className='mx-3 text-blue-500 font-semibold text-lg'>Share Me</h1></Link>
          <Search placeholder="Search" allowClear style={{ width: 300 }} />
        </div>
        <div>
          <ul className='flex items-center space-x-12'>
            <li>
              <Link className='flex flex-col items-center gap-2 text-black' to="/home">
                <HomeFilled />
                <p className='text-xs font-semibold'>Home</p>
              </Link>
            </li>
            <li>
              <Link className='flex flex-col items-center gap-2' to="/myNetwork">
                <UsergroupAddOutlined />
                <p className='text-xs font-semibold'>My Network</p>
              </Link>
            </li>
            <li>
              <Link className='flex flex-col items-center gap-2' to="/events">
                <SlackOutlined />
                <p className='text-xs font-semibold'>Events</p>
              </Link>
            </li>
            <li>

              <Link className='flex flex-col items-center gap-2' to="/learning">
                <LaptopOutlined />
                <p className='text-xs font-semibold'>Learning</p>
              </Link>
            </li>
            <li>
              <Link className='flex flex-col items-center gap-2' to="/notification">
                <BellOutlined />
                <p className='text-xs font-semibold'>Notificaion</p>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <Dropdown overlay={eventMenu()} trigger={['click']} placement='bottom'>
            <Avatar size={38} src={`http://localhost:4000/api/v1/${user.profileImg}`} />
          </Dropdown>
        </div>

      </div>
    </div>
  )
}

export default NavigationBar
