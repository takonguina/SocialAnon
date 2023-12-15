import React, { useState } from 'react'
import axios from 'axios';
import './LoginSignup.css'
import email_icon from '../assets/email_icon.png'
import padlock_icon from '../assets/padlock_icon.png'
import {useNavigate } from 'react-router-dom';



const LoginSignup = () => {

  const [action, setAction] = useState("Sign Up");
  const [authToken, setAuthToken] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const apiRegisterUrl = "http://0.0.0.0:3000/auth/register/";
  const apiLoginUrl = "http://0.0.0.0:3000/auth/login/";
  const navigate = useNavigate();


  const handleLogin = async (apiUrl) => {
    try {
      const response = await axios.post(`${apiUrl}`, {
        email: email,
        password: password
      });
      console.log('Réponse du serveur:', response.data);
      if (action === 'Login' && response.status === 200) {
        setAuthToken(response.data.token);
        navigate('/home');
      }

    } catch (error) {
      console.error('Erreur de requête:', error.message);
      
    }
  };

  return (
    <div className='container'>
      <div className="header">
      <div className="action-container">
        <div className={action==="Login"?"action-button grey":"action-button"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
        <div className={action==="Sign Up"?"action-button grey":"action-button"} onClick={()=>{setAction("Login")}}>Login</div>
      </div>
        
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className="input">
          <img src={padlock_icon} alt="" />
          <input type="password" placeholder='Password' onChange={(p)=>setPassword(p.target.value)} />
        </div>
      </div>
      {action==="Sign Up"?<div></div>:<div className="forgot-password">Lost Password? <span>Click here</span></div>
}
      <div className="submit" onClick={() =>(action==="Sign Up"?handleLogin(apiRegisterUrl):handleLogin(apiLoginUrl))}>Go!</div>
    </div>
  )
};

export default LoginSignup
