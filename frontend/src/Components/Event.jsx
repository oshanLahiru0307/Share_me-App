import React from 'react'
import NavigationBar from './NavigationBar'
import ProfileCard from './ProfileCard'
import { Button, Divider } from 'antd'

const Event = () => {
  return (
    <div className='bg-slate-200 h-auto pb-5'>
      <NavigationBar />
      <div className='flex flex-row gap-10 mt-10 mx-10'>
        <div className='w-auto'>
          <ProfileCard />
        </div>
        <div className='w-[1200px] h-auto bg-white rounded-lg shadow-lg p-8'>
          <div className='flex flex-row gap-10 items-center justify-between mb-5'>
            <p className='text-blue-500 text-2xl font-semibold '>Events</p>
            <Button className='text-black'>+ Create New Event</Button>
          </div>
          <Divider style={{borderColor:'#bbbbbb', height:'2px'}}></Divider>
          <div>
            <p className='text-blue-500 text-lg font-semibold '>Your Events</p>
            <div className='w-full h-auto flex flex-row gap-8 items-center justify-start my-5'>
              <div className='w-[250px] h-auto bg-white rounded-lg shadow-lg hover:shadow-md transition-shadow duration-300 ease-in-out'>
                <div style={{
                  width: '100%',
                  height: '150px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '8px 8px 0 0',
                  backgroundImage:'url("https://www.echelonedge.com/wp-content/uploads/2023/06/National-Technology-Week-feature.png")',
                }}>
                </div>
                <div className='p-4'>
                <p className='text-md font-medium mb-2'>Your Events</p>
                <p className=''>Date & time</p>
                <p className=''>Place</p>
                <p className=''>Organization</p>
                </div>
                <div className='mb-4 flex justify-center items-center'><Button type='primary' className='w-28'>View</Button></div>
              </div>
              <div className='w-[250px] h-auto bg-white rounded-lg shadow-lg hover:shadow-md transition-shadow duration-300 ease-in-out'>
                <div style={{
                  width: '100%',
                  height: '150px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '8px 8px 0 0',
                  backgroundImage:'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvb-1h2ar_TvnchzdepiLTyWyoKf8Zt1EuvA&s")',
                }}>
                </div>
                <div className='p-4'>
                <p className='text-md font-medium mb-2'>Your Events</p>
                <p className=''>Date & time</p>
                <p className=''>Place</p>
                <p className=''>Organization</p>
                </div>
                <div className='mb-4 flex justify-center items-center'><Button type='primary' className='w-28'>View</Button></div>
              </div>
            </div>
          </div>

          <Divider style={{borderColor:'#bbbbbb', height:'2px', margin:'50px 0 30px 0'}}></Divider>

          <div>
            <p className='text-blue-500 text-lg font-semibold ' >Recomonded for you</p>
            <div className='w-full h-auto flex flex-row gap-8 items-center justify-start my-5'>
              <div className='w-[250px] h-auto bg-white rounded-lg shadow-lg hover:shadow-md transition-shadow duration-300 ease-in-out'>
                <div style={{
                  width: '100%',
                  height: '150px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '8px 8px 0 0',
                  backgroundImage:'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtUZz3LObEXEWZq5dd9KH-wqaR_qW_j7L2Bg&s")',
                }}>
                </div>
                <div className='p-4'>
                <p className='text-md font-medium mb-2'>Your Events</p>
                <p className=''>Date & time</p>
                <p className=''>Place</p>
                <p className=''>Organization</p>
                </div>
                <div className='mb-4 flex justify-center items-center'><Button type='primary' className='w-28'>View</Button></div>
              </div>
              <div className='w-[250px] h-auto bg-white rounded-lg shadow-lg hover:shadow-md transition-shadow duration-300 ease-in-out'>
                <div style={{
                  width: '100%',
                  height: '150px',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '8px 8px 0 0',
                  backgroundImage:'url("https://thewaltdisneycompany.com/app/uploads/2025/01/Rita-Ferro-%E2%80%93-Disney-Global-Tech-Data-Showcase-2025-1024x700.jpg")',
                }}>
                </div>
                <div className='p-4'>
                <p className='text-md font-medium mb-2'>Your Events</p>
                <p className=''>Date & time</p>
                <p className=''>Place</p>
                <p className=''>Organization</p>
                </div>
                <div className='mb-4 flex justify-center items-center'><Button type='primary' className='w-28'>View</Button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Event
