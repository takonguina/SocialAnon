
import './App.css';
import LoginSignup from './components/LoginSignup/LoginSignup';
import HomePage from './components/HomePage/HomePage'
import { Outlet, RouterProvider, createBrowserRouter} from "react-router-dom";
import { AuthContextProvider } from './ContextAuth';

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
