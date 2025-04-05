import React from 'react'
import { Link } from 'react-router-dom'
import { GlobalOutlined, BookOutlined, TeamOutlined } from '@ant-design/icons'

const LinksCard = () => {
    return (
            <div className='w-[auto] bg-white h-auto rounded-lg shadow-lg mt-6 p-4 flex flex-col '>
                <Link className='text-m text-black my-1 font-semibold'><BookOutlined className='mr-2' />Saved items</Link>
                <Link className='text-m text-black my-1 font-semibold'><GlobalOutlined className='mr-2' />Newsletters</Link>
                <Link className='text-m text-black my-1 font-semibold'><TeamOutlined className='mr-2' />Groups</Link>
            </div>
    )
}

export default LinksCard
