import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
    let token = localStorage.getItem("token");
    let isUser = localStorage.getItem("isUser");
    let isVerified = localStorage.getItem("isVerified");
    if (!isUser && !token && !isVerified) {
        return <Navigate to="/login" />;
    }
    return children;
};
export default UserRoute;
