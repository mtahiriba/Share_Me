import React, {useState, useEffect} from 'react'
import {AiOutlineLogout} from 'react-icons/ai'
import {useParams, useNavigate} from 'react-router-dom'
// import { GoogleLogout } from 'react-google-login'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import {POSTS} from '../Shared/Posts'


const randomImage = 'https://source.unsplash.com/1600x900/?nature,coding,photograpy'
const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';


const UserProfile = () => {

  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created');
  const navigate = useNavigate();
  
  const { userId } = useParams();

  useEffect(() => {
    
    setTimeout(() => {
      setUser(JSON.parse(localStorage.getItem('user')));
    }, 1000);
    
  }, [userId])
  
  useEffect(() => {
    if(text === 'Created'){
      const createdPins = POSTS.filter((post) => post.postedBy.id === userId)
      setPins(createdPins);     
    }
    else{
      const savedPins = POSTS.filter((post) => {
        const saved = post.save.filter((saveid) => saveid.id === userId)
        return saved.length > 0;
      })
      setPins(savedPins);
    }
  }, [text, userId])
  



  const logout = () => {
    console.log('logout');
    localStorage.clear();
    navigate('/login');
  }

  if(!user){
    return <Spinner message='Loading profile...'/>
  }

  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className='flex flex-col pb-5'>
        <div className='relative flex flex-col nb-7'>
          <div className='flex flex-col justify-center items-center'>
              <img 
                src={randomImage} 
                alt="banner-pic"
                className='w-full h-370 2xl:h-510 shadow-lg object-cover'
              />
              <img 
                src={user.picture}
                alt="user-pic"
                className='rounded-full w-50 h-50 -mt-12 shadow-xl object-cover' 
              />
              <h1 className='font-bold text-3xl text-center mt-3'>{user.name}</h1>
              <div className='absolute top-3 z-1 right-3 p-2 '>
                  {user.sub.toString() === userId && (
                    <button
                      type='button'
                      className='bg-white flex flex-row items-center gap-2 p-2 px-3 rounded-full cursor-pointer outline-none shadow-md'
                      onClick={logout}
                    >
                      <AiOutlineLogout color='red' fontSize={21}/> Logout
                    </button>
                  )}
              </div>
          </div>
          
          <div className='text-center mb-7 mt-5'>
              <button
                type='button'
                onClick={(e) => {
                  setText(e.target.textContent)
                  setActiveBtn('created')
                }}
                className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
              >
                Created
              </button>
              <button
                type='button'
                onClick={(e) => {
                  setText(e.target.textContent)
                  setActiveBtn('saved')
                }}
                className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
              >
                Saved
              </button>
          </div>
          {pins?.length ? (
            <div className='px-2'>
              <MasonryLayout pins={pins} user={user}/>
            </div>  
          ):(
            <div className='flex justify-center font-bold items-center w-full text-xl mt-2'>
              No Pins Found!
            </div>
          )}
          
        </div>
      </div>
    </div>
  )
}

export default UserProfile