import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export const ProtectRoutes = ({ children }) => {
    const token = Cookies.get("token");
    console.log("The token:", token); // Check if token is being retrieved

    if (!token) {
        console.log("No token found, redirecting to login."); // Log when no token
        return <Navigate to="/login" replace />;
    }

    return children;
};