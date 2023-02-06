import React, {useEffect, useRef, useState} from 'react'
import {HiMenu} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {Route, Link, Routes} from 'react-router-dom'

import { Sidebar, UserProfile } from '../components'
import logo from '../assets/logo.png'
import { Pins } from './Pins'

const Home = () => {

    const [toggleSidebar, setToggleSidebar] = useState(false)
    const scrollRef = useRef()
    const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear()

    const logindata = () => {
        if(user){
            return (
            <Link to={`/user-profile/${user.sub}`}>
                <img src={user.picture} alt="logo" className='w-12 rounded-full'/>
            </Link>
            )
        }
        else{
            return(
                <button className='bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md'>Login</button>
            )
        }
    }
    

    useEffect(() => {
        scrollRef.current.scrollTo(0, 0)
    }, [])

  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out'>
        <div className='hidden md:flex h-screen flex-initial'>
            <Sidebar user={user && user}/>
        </div>

        <div className='flex md:hidden flex-row'>

            <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
                <HiMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSidebar(true)}/>
                <Link to='/'>
                    <img src={logo} alt="logo" className='w-28'/>
                </Link>
                {logindata()}
                
            </div>

            
        </div>

        {toggleSidebar && (
            <div className='fixed  w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
                <div className='absolute w-full flex justify-end items-center p-2'>
                    <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={() => setToggleSidebar(false)}/>
                </div>
                <Sidebar closeToggle={setToggleSidebar} user={user && user}/>
            </div>
        )}
        <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
            <Routes>
                <Route path='/*' element={<Pins user={user && user}/>} />
                {user && (
                    <Route path={`/user-profile/${user.sub}`} element={<UserProfile />} />
                )}
                
            </Routes>
        </div>
    </div>
  )
}

export default Home