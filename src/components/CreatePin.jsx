import React, {useState} from 'react'
import {AiOutlineCloudUpload} from 'react-icons/ai'
import {MdDelete} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner'
import {CATEGORIES} from '../Shared/Categories'
import {POSTS} from '../Shared/Posts'

const CreatePin = ({ user }) => {

  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [destination, setDestination] = useState('');
  const [loding, setLoding] = useState(false);
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate()

  const uploadImage = (e) => {
    const { type } = e.target.files[0];

    if( type === 'image/png' || type === 'image/svg' || type === 'image/jpeg' || type === 'image/gif' || type === 'image/tiff' || type === 'image/jpg' ){
      setWrongImageType(false);
      setLoding(true);


      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageAsset({
          url:reader.result,
          name: file.name,
        });
      });
      reader.readAsDataURL(file);

      setLoding(false)
    
    }
    else{
      setWrongImageType(true);
    }
  }


  const savePin = () => {
    if(title && about && destination && category && imageAsset.url){
      
      const pin = {
        _id: (POSTS.length+1),
        title: title,
        about: about,
        destination: destination,
        imageUrl: imageAsset.url,
        catagory: category,
        postedBy: {
            id: user.sub,
            userName: user.name,
            image: user.picture
        },
        save: [],
      }
      
      POSTS.push(pin);
      navigate('/');
    }
    else{
      setFields(true);

      setTimeout(() => {
        setFields(false)
      }, 3000);
    }
  }


  return (
    <div className='flex justify-center flex-col items-center mt-5 lg:h-4/5'>
      {fields && (
        <div class="bg-red-100 border-t-4 border-red-500 rounded-b text-teal-900 px-4 py-3 lg:w-4/5 w-full shadow-md" role="alert">
          <div class="flex">
            <div class="py-1"><svg class="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
            <div>
              <p class="text-red-500 font-bold">Please fill in all the fiekds.</p>
            </div>
          </div>
        </div>
      )}
      <div className='flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full mt-3'>
        <div className='bg-secondaryColor p-3 flex flex-0.7 w-full'>
          <div className='flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420 '>
            {loding && <Spinner />}
            {wrongImageType && <p>Wrong image type</p>}
            {!imageAsset ? (
              <label>
                <div className='flex flex-col items-center justify-center h-full'>
                  <div className='flex flex-col items-center justify-center'>
                    <p className='font-bold text-2xl'>
                      <AiOutlineCloudUpload/>
                    </p>
                    <p className='text-lg'> click to upload</p>
                    <p className='mt-32 text-gray-400'>
                      Use high-quality Images less than 20 MB
                    </p>
                  </div>
                </div>
                <input 
                type="file" 
                name='upload-image'
                onChange={uploadImage}
                className='w-0 h-0'
                />
              </label>
            ):(
              <div className='relative h-full '>
                <img src={imageAsset?.url} alt="uploaded-pic" className='h-full w-full' />
                <button
                  type='button'
                  className='absolute bottom-3 right-3 padding-3 p-1 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out '
                  onClick={() => setImageAsset(null)}
                  >
                    <MdDelete/>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full '>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Add your title here'
              className='outline-none text:2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2'
            />
            {user && (
              <div className='flex gap-2 my-2 items-center bg-white rounded-lg'>
                <img 
                  src={user.picture} 
                  className="w-10 h-10 rounded-full"
                  alt='user-profile' 
                />
                <p className='font-bold'>{user.name}</p>
              </div>
            )}
            <input 
              type="text" 
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder='What is your pin about'
              className='outline-none text:base sm:text-lg border-b-2 border-gray-200 p-2'
            />
            <input 
              type="text" 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder='Add a destination link'
              className='outline-none text:base sm:text-lg border-b-2 border-gray-200 p-2'
            />
            <div className='flex flex-col'>
              <div>
                <p className='mb-2 font-semibold text-lg sm:text-xl'>choose Pin Category</p>
                <select 
                  onChange={(e) => setCategory(e.target.value)}
                  className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                >
                  <option value="other" className='bg-white'>Select Category</option>

                  {CATEGORIES.map((category) =>(
                      <option className='text-base border-0 outline-none capitalize bg-white text-black' value={category.name}>
                        {category.name}
                      </option>
                  ))}

                </select>
              </div>

              <div className='flex justify-end items-end mt-5 '>
                <button
                  type='button'
                  onClick={savePin}
                  className='bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none'
                >
                  Save Pin
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePin