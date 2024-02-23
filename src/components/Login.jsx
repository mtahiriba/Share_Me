import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from "jwt-decode";
import {useNavigate, Link} from 'react-router-dom'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'

const Login = () => {

    const navigate = useNavigate();

    const responseGoogle = (response) => {
        var decoded = jwt_decode(response.credential);
        localStorage.setItem('user', JSON.stringify(decoded))
        navigate('/', {replace: true})
    }

  return (

    <div className='flex justify-start items-center flex-col h-screen'>
        <div className='relative w-full h-full'>
            <video 
                src={shareVideo} 
                type="video/mp4" 
                loop 
                controls={false}
                muted 
                autoPlay
                className='w-full h-full object-cover'/>
        
            <div className='absolute flex flex-col justify-center items-center top-0 left-0 right-0 buttom-0 bg-blackOverlay h-full'>
                <div className='p-5'>
                    <Link to="/">
                        <img src={logo} width="130px" alt='logo'/>
                    </Link>
                </div>
                <div className='shadow-2xl'>
                    <GoogleLogin
                        onSuccess={responseGoogle}
                        onError={()=>{
                            console.log("Login Error")
                        }}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login