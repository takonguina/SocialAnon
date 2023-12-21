import { Navigate } from 'react-router-dom';

export function PrivateRoute({ children }) {
    
    if (!localStorage.getItem('token')) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login"/>
    }

    // authorized so return child components
    return children;
}

export default PrivateRoute;