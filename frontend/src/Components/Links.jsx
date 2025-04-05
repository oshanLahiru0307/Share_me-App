import React from 'react'
import { Link } from 'react-router-dom'
import { TeamOutlined,FileTextFilled, WechatFilled, ProductFilled, ContainerFilled, ThunderboltFilled} from '@ant-design/icons'
import logo from '../assets/airbnb_1724634.png'

const LinksCard = () => {
    return (
        <div className='w-[auto] bg-white h-auto rounded-lg shadow-lg mt-6 p-4 flex flex-col '>
            <div className='flex flex-col gap-3'>
                <div className='flex justify-around items-top gap-12'>
                    <div className='flex flex-col gap-3'>
                        <Link className='text-sm text-black  font-semibold'><FileTextFilled className='mr-2 text-amber-300' />About</Link>
                        <Link className='text-sm text-black font-semibold display block'><WechatFilled className='mr-2 text-sky-500' />Help Center</Link>
                        <Link className='text-sm text-black font-semibold display block'><ProductFilled className='mr-2 text-violet-600' />Accessibility</Link>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Link className='text-sm text-black font-semibold display block'><ContainerFilled className='mr-2 text-fuchsia-500'/>Privacy and Terms</Link>
                        <Link className='text-sm text-black font-semibold display block'><ThunderboltFilled className='mr-2 text-pink-600' />ShareMe Blog</Link>
                    </div>
                </div>
                <div className='flex flex-row justify-center items-center gap-2 mt-2'>
                    <img src={logo} alt="Logo" style={{ width: "20px", height: "20px",}} />
                    <p className='text-sm '>Share Me Corporation © 2025</p>
                </div>
            </div>
        </div>
    )
}

export default LinksCard
