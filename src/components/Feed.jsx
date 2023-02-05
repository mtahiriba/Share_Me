import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'

import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import {POSTS} from '../Shared/Posts'

const Feed = () => {

  const [loading, setLoading] = useState(false)
  const [pins, setPins] = useState(null)
  const {catagoryId} = useParams()

  useEffect(() => {
    setLoading(true)

    if(catagoryId) {
      setPins(POSTS)
      setLoading(false)
    }
    else{
      setTimeout(() => {
        setPins(POSTS)
        setLoading(false)
      }, 1000)
    }

  }, [catagoryId])

  if(loading) return <Spinner message="We are adding new ideas to your feed!"/>
    
  return (
    <div>
      {pins && <MasonryLayout pins={pins}/>}
    </div>
  )
}

export default Feed