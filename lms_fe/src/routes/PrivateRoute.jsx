
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/contexts/UserProvider";

export const PrivateRoute = ({ children, isAuthenticate }) => {
    // get context to check login 

    const {users, loading} = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Hoặc một spinner/loading indicator khác
    }

    isAuthenticate = (users) ? true : false;

    if (!isAuthenticate) {
        return <Navigate to="/login" replace />;
    }

    return children;

};