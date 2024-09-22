import { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { GoHome } from 'react-icons/go'
import { RxChatBubble } from 'react-icons/rx'
import { TbCalendarEvent } from 'react-icons/tb'
import { HiOutlineTag } from 'react-icons/hi2'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { IoSettingsOutline } from 'react-icons/io5'
import { SlLogout } from 'react-icons/sl'
import '../../src/NavBar.scss'

const menuItems = [
  {
    path: '/',
    label: 'Home',
    icon: <GoHome className='stroke-1 w-[18px] h-[18px]' />
  },
  {
    path: '/properties',
    label: 'Properties',
    icon: <GoHome className='stroke-1 w-[18px] h-[18px]' />
  },
  {
    path: '/chat',
    label: 'Chat',
    icon: <RxChatBubble className='stroke w-[18px] h-[18px]' />
  },
  {
    path: '/calendar',
    label: 'Calendar',
    icon: <TbCalendarEvent className='stroke-[2px] w-[18px] h-[18px]' />
  },
  {
    path: '/offers',
    label: 'Offers',
    icon: <HiOutlineTag className='stroke-[2px] w-[18px] h-[18px]' />
  },
  {
    path: '/documents',
    label: 'Documents',
    icon: <IoDocumentTextOutline className='stroke-[3px] w-[18px] h-[18px]' />
  },
  {
    path: '/settings',
    label: 'Settings',
    icon: <IoSettingsOutline className='stroke-1 w-[18px] h-[18px]' />
  }
]

export default function NavBar({ avatar, userName, handleLogout }) {
  const [active, setActive] = useState('/')

  const handleActive = (path) => {
    setActive(path)
  }

  return (
    <div className='bg-[#D6D7F1] flex flex-col  h-full text-[#9EA8BB] min-w-[280px]'>
      <div className='user my-10 text-center'>
        <img
          src={avatar}
          alt={avatar}
          className='w-[80px] h-[80px] rounded-full block mx-auto border-4 border-white mb-4'
        />
        <div className='user-info'>
          <h3 className='text-md font-semibold capitalize text-title'>
            {userName}
          </h3>
        </div>
      </div>
      <ul className='menu-items flex flex-col flex-1 gap-4'>
        {menuItems.map((item) => (
          <li
            key={item.path}
            className={`menu-item ${active === item.path ? 'is-active' : ''}`}
          >
            <Link to={item.path} onClick={() => handleActive(item.path)}>
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <button
        className='bg-transparent flex items-center gap-4 pl-[30px] py-4 text-red-500 text-left text-[12px] font-semibold uppercase'
        onClick={handleLogout}
      >
        <SlLogout className='stroke-[2px] w-[18px] h-[18px]' />
        <span>Logout</span>
      </button>
    </div>
  )
}
NavBar.propTypes = {
  userName: PropTypes.string,
  avatar: PropTypes.string,
  handleLogout: PropTypes.func
}
