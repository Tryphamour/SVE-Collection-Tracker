import { Navigate, Route } from "react-router-dom";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    const userIsLogged = false; // replace with your auth logic

    if (!userIsLogged) {
        // Redirect to login page if user is not authenticated
        return <Navigate to="/login" />;
    }

    return <Route element={children} />;
};

export default RequireAuth;