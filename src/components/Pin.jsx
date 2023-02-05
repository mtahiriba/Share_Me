import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import {MdDownloadForOffline} from 'react-icons/md'
import {AiTwotoneDelete} from 'react-icons/ai'
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs'

const Pin = ({ pin }) => {

    const [postHover, setPostHover] = useState(false);
    const navigate = useNavigate()

    const alreadySaved = !!(pin.save.filter((item) => item.id === 1))?.length

    const savePin = (id) => {
      if(!alreadySaved){
        //post to save
      }
    }

    const deletePin = (id) => {
      //delete post
    }


  return (
    <div className='m-2'>
        <div
            onMouseEnter={()=>setPostHover(true)}
            onMouseLeave={()=>setPostHover(false)}
            onClick={()=>navigate(`/post/${pin._id}`)}
            className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
        >
          <img className='rounded-lg' alt='user-post' src={pin.imageUrl}/>
          {postHover && (
            <div className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
                style={{ height:"100%" }}
            >
              <div className='flex items-center justify-between '>
                <div className='flex gap-2'>
                    <a 
                      href={`${pin.imageUrl}?dl=`}
                      download
                      onClick={(e)=>e.stopPropagation()}
                      className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover-shadow-md outline-none"
                    >
                      <MdDownloadForOffline/>
                    </a>
                </div>
                {alreadySaved ? (
                      <button type='button' className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover-shadow-md outlined-none'>
                       {pin.save.length} saved
                      </button>
                    ):(
                      <button type='button' className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover-shadow-md outlined-none'
                        onClick={(e)=>{
                          e.stopPropagation()
                          savePin(pin._id)
                        }}
                      >
                        save
                      </button>
                    )}
              </div>
              <div className='flex items-center justify-between gap-2 w-full'>
                {pin.destination && (
                  <a
                    href={pin.destination}
                    target='_blank'
                    rel='noreferrer'
                    onClick={(e)=>e.stopPropagation()}
                    className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover-shadow-md outline-none"
                  >
                    <BsFillArrowUpRightCircleFill/>
                    {pin.destination.length > 20 ? pin.destination.slice(8,20) : pin.destination.slice(8)}
                  </a>
                )}
                { pin.postedBy?.id === 1 && (
                  <button
                    type='button'
                    onClick={(e)=>{
                      e.stopPropagation()
                      deletePin(pin._id)
                    }}
                    className='bg-white p-2 opacity-70 hover:opacity-100 font-bold text-dark text-base rounded-3xl hover-shadow-md outlined-none'
                  >
                    <AiTwotoneDelete/>
                  </button>
                )}                      
              </div>
            </div>
          )}
        </div>
    </div>
  )
}

export default Pin