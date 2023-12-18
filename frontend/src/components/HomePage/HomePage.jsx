import axios from 'axios';
import './HomePage.css'
import { AuthContext } from '../../ContextAuth';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

const Homepage = () => {
  const { authToken } = useContext(AuthContext);

  return (<>
  <header>
    <nav>
      <NavLink to ="/home">Home</NavLink>
      <NavLink to ="/messages">Messages</NavLink>
    </nav>
  </header>
  <div className="div">
    <h1></h1>
  </div>
</>
);

};

export default Homepage;