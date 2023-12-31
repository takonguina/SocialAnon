import axios from 'axios';
import email_icon from '../assets/email_icon.png';
import padlock_icon from '../assets/padlock_icon.png';
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../ContextAuth';
import { useForm } from 'react-hook-form';
import './LoginSignup.css';


const LoginSignup = () => {
  const {handleSubmit, register, formState: {errors}} = useForm();
  const navigate = useNavigate();
  const [action, setAction] = useState("Login");
  const apiUrl = action === 'Login' ? "http://0.0.0.0:3000/auth/login/" : "http://0.0.0.0:3000/auth/register/";
  const { setAuthToken } = useAuth();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${apiUrl}`, {
        email: data.email,
        password: data.password
      });

      if (action === 'Login' && response.status === 200) {
        navigate('/home');
        setAuthToken(response.data.access_token);
        localStorage.setItem('token', response.data.access_token);
      } 
      
      if (action === 'Sign Up' && response.status === 201){
        return toast.success('User created successfully')
      }

    } catch (error) {
      console.error('Erreur de requête:', error.message);
      if (error.response?.status === 400 && action === 'Login') {
        return toast.error("Wrong Password.")
      } else if (error.response?.status === 401 && action === 'Login'){
        return toast.error('Email not registered')
      } else if (error.response?.status === 302 && action === 'Sign Up'){
        return toast.error('Email already registered')
      } else {
        return toast.error('An unexpected error has occurred.')
      }
      

    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home');
      setAuthToken(localStorage.getItem('token'))
    }
  }, [navigate]);



  return (
    <>
    <div className='container'>
      <div className="header">
      <div className="action-container">
        <div className={action==="Login"?"action-button grey":"action-button"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
        <div className={action==="Sign Up"?"action-button grey":"action-button"} onClick={()=>{setAction("Login")}}>Login</div>
      </div>
        <div className="underline"></div>
    </div>
    <div className="inputs">
    <form onSubmit={handleSubmit(onSubmit)}>

        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder='Email' {...register('email', {
            required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email',
                },
              })}/>
          {errors.email && <span className="error-message">{errors.email.message}</span>}
        </div>
        <div className="input">
          <img src={padlock_icon} alt="" />
          <input type="password" placeholder='Password'{...register('password', {
            required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must contain at least 6 characters',
                },
              })}/>
              {errors.password && <span className="error-message">{errors.password.message}</span>}
        </div>
          <button type="submit" className='submit'>Send</button>
          <Toaster richColors position="bottom-center"/>
    </form>
    </div>
      {action==="Sign Up"?<div></div>:<div className="forgot-password">Lost Password? <span>Click here</span></div>}
      
    </div>
    
    </>
  )
};


export default LoginSignup
