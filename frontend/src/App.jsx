import './App.css';
import LoginSignup from './components/LoginSignup/LoginSignup';
import Settings from './components/Settings/Settings';
import HomePage from './components/HomePage/HomePage'
import { Outlet, RouterProvider, createBrowserRouter} from "react-router-dom";
import { AuthContextProvider } from './ContextAuth';
import { PrivateRoute } from './PrivateRoute'
import Footer from './components/Footer/Footer'
import NavigationBar from './components/NavBar/NavigationBar';

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
      },
      {
        path: '/settings',
        element: <div><Settings/></div>
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
  <NavigationBar/>
  <div>
    <Outlet/>
  </div>
  <Footer/>
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
