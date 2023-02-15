import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import {POSTS} from '../Shared/Posts'

const Feed = ({ user}) => {

  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const {catagoryId} = useParams();

  useEffect(() => {
    setLoading(true)
    if(catagoryId) {
      setTimeout(() => {
        
        const catg = POSTS.filter(post => post.catagory === catagoryId)
        setPins(catg)
        setLoading(false)
      }, 1000)
    }
    else{
      setTimeout(() => {
        setPins(POSTS)
        setLoading(false)
      }, 1000)
    }

  }, [catagoryId])

  if(loading) return <Spinner message="We are adding new ideas to your feed!"/>

  if(!pins.length) return <h1 className="text-center">No Pins Available</h1>
    
  return (
    <div> 
      {pins && <MasonryLayout pins={pins} user={user}/>}
    </div>
  )
}

export default Feed