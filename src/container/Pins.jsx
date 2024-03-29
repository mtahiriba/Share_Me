import React, {useState}  from 'react'
import {Route, Routes} from 'react-router-dom'

import {Navbar, Search, Feed, PinDetail, CreatePin} from '../components'

export const Pins = ({ user }) => {
  
  const [searchTerm, setSearchTerm] = useState('')
  
  return (
    <div className='px-2 md:px-5'>
        
        {/* Search bar */}
        <div className='bg-gray-50'>
          <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user}/>
        </div>

        {/* Remaining routes */}
        <div className='h-full'>
          <Routes>
            <Route path='/' element={<Feed user={user}/>}/>
            <Route path='/category/:catagoryId' element={<Feed user={user}/>}/>
            <Route path='/pin-detail/:pinId' element={<PinDetail user={user}/>}/>
            <Route path='/create-pin' element={<CreatePin user={user}/>}/>
            <Route path='/search' element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>}/>
          </Routes>
        </div>
    </div>
  )
}
