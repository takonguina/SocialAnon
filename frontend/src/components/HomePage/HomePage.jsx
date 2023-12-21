import axios from 'axios';
import './HomePage.css'
import { AuthContext } from '../../ContextAuth';
import { useContext } from 'react';

const Homepage = () => {
  const { authToken } = useContext(AuthContext);

  return (<>

  <div className="div">
    <h1></h1>
  </div>
</>
);

};

export default Homepage;