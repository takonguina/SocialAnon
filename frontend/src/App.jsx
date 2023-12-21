import './App.css';
import LoginSignup from './components/LoginSignup/LoginSignup';
import HomePage from './components/HomePage/HomePage'
import { Outlet, RouterProvider, createBrowserRouter} from "react-router-dom";
import { AuthContextProvider } from './ContextAuth';
import { PrivateRoute } from './PrivateRoute'
import { NavLink } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute><Root/></PrivateRoute>,
    errorElement: <PageError/>,
    children : [
      {
        path: '/home',
        element: <div><HomePage/></div>
      },
      {
        path: '/messages',
        element: <div></div>
      }
    ]
  },
  {
    path: '/login',
    element: <LoginSignup/>
  },
]);

function Root() {
  return <>
  <header>
    <nav>
      <NavLink to ="/home">Home</NavLink>
      <NavLink to ="/messages">Messages</NavLink>
    </nav>
  </header>
  <div>
    <Outlet/>
  </div>
  </>
}

function PageError() {
  return <>
  <h1>This page doesn't exist</h1>
  </>
}

function App() {
  return <AuthContextProvider><RouterProvider router={router}/></AuthContextProvider>
      
    
}

export default App;
