import React, {useEffect, useRef, useState} from 'react'
import {HiMenu} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {Route, Link, Routes} from 'react-router-dom'

import { Sidebar, UserProfile } from '../components'
import logo from '../assets/logo.png'
import profile from '../assets/profile.jpg'
import { Pins } from './Pins'

const Home = () => {

    const [toggleSidebar, setToggleSidebar] = useState(false)
    const scrollRef = useRef()


    useEffect(() => {
        scrollRef.current.scrollTo(0, 0)
    }, [])

  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out'>
        <div className='hidden md:flex h-screen flex-initial'>
            <Sidebar />
        </div>

        <div className='flex md:hidden flex-row'>

            <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
                <HiMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSidebar(true)}/>
                <Link to='/'>
                    <img src={logo} alt="logo" className='w-28'/>
                </Link>
                <Link to='/user-profile/:id'>
                    <img src={profile} alt="logo" className='w-12 rounded-full'/>
                </Link>
            </div>

            
        </div>

        {toggleSidebar && (
            <div className='fixed  w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
                <div className='absolute w-full flex justify-end items-center p-2'>
                    <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={() => setToggleSidebar(false)}/>
                </div>
                <Sidebar closeToggle={setToggleSidebar}/>
            </div>
        )}
        <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
            <Routes>
                <Route path='/*' element={<Pins />} />
                <Route path='/user-profile/:id' element={<UserProfile />} />
            </Routes>
        </div>
    </div>
  )
}

export default Home