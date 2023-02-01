import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import {RiHomeFill} from 'react-icons/ri'
import {IoIosArrowForward} from 'react-icons/io'

import logo from '../assets/logo.png'
import profile from '../assets/profile.jpg'

const isNotActiveStyle = 'flex items-center px-3 gap-3 text-gray-500 hover:bg-gray-100 hover:text-black transition-all duration-200 ease-in-out capiatlize';
const isActiveStyle = 'flex items-center px-3 gap-3 font-extrabold border-r-2 border-black hover:bg-gray-100 transition-all duration-200 ease-in-out capiatlize';

const categories = [
  {name: 'Animals'},
  {name: 'Wallpapers'},
  {name: 'Photography'},
  {name: 'Gaming'},
  {name: 'Coding'},
  {name: 'Others'},
]

const Sidebar = ({closeToggle}) => {
  return (
    <div className='flex flex-col justify-between bg-white h-full overflow-y-scrikk min-w-210 hide-scrollbar'>
        <div className='flex flex-col'>
            <Link
              to="/"
              className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
              onClick={() => closeToggle && closeToggle(false)}
            >
              <img src={logo} alt="logo" className="w-full" />
            </Link>
            <div className='flex flex-col gap-5'>
                <NavLink
                  to="/"
                  className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}
                  onClick={() => closeToggle && closeToggle(false)}
                >
                  <RiHomeFill/>
                  Home
                </NavLink>
                <h3 className='mt-2 px-5 text-base 2xl:text-xl'>Discover categories</h3>
                {
                  categories.slice(0, categories.length - 1).map((category) => (
                    <NavLink
                      to={`/category/${category.name}`}
                      className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}
                      onClick={() => closeToggle && closeToggle(false)}
                      key={category.name}
                    >
                      {category.name}
                    </NavLink>
                  ))
                }
            </div>
        </div>

        <Link
          to='user-profile/:id'
          className='flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3'
          onClick={() => closeToggle && closeToggle(false)}
        >
          <img src={profile} alt="profile" className='w-10 h-10 rounded-full' />
          <p>Muhammad Tahir</p>
        </Link>
    </div>
  )
}

export default Sidebar