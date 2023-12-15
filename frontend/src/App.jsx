
import './App.css';
import LoginSignup from './components/LoginSignup/LoginSignup';
import HomePage from './components/HomePage/HomePage'
import {NavLink, Outlet, RouterProvider, createBrowserRouter} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <PageError/>,
    children : [
      {
        path: '/login',
        element: <div><LoginSignup/></div>
      },
      {
        path: '/home',
        element: <div><HomePage/></div>
      },
      {
        path: '/messages',
        element: <div></div>
      }

    ]
  }
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
  return <RouterProvider router={router}/>
}

export default App;
