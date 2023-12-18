import { Navigate } from 'react-router-dom';
import { AuthContext } from './ContextAuth';
import { useContext } from 'react';

export function PrivateRoute({ children }) {
    const { authToken } = useContext(AuthContext);
    
    if (authToken === "") {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login"/>
    }

    // authorized so return child components
    return children;
}

export default PrivateRoute;

