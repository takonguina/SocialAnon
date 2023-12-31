import { NavLink } from 'react-router-dom';
import logo from '../assets/logosn.svg';
import iconLogout from '../assets/icon-logout.png';
import "./NavigationBar.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../ContextAuth';


const NavigationBar = () => {
    const { setAuthToken } = useAuth();
    const [menuOpen, SetMenuOpen] = useState(false);
    const navigate = useNavigate();
    const logout = () => {
        
        setAuthToken("")
        localStorage.removeItem("token")
        navigate('/login');
    }

    return(
        <nav>
        <img className="logo" src={logo}alt="Logo social network"></img>
        <div className="menu" onClick={()=> {
            SetMenuOpen(!menuOpen);
        }}>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <ul className={menuOpen ? "open":""}>
            <li>
                <NavLink to ="/home">Home</NavLink>
            </li>
            <li>
                <NavLink to ="/messages">Messages</NavLink>
            </li>
            <li>
                <NavLink to ="/settings">Settings</NavLink>
            </li>
            <li onClick={logout}>
                <img src={iconLogout} alt="icon-logout"></img>
            </li>
        </ul>
        </nav>
        )
}

export default NavigationBar;