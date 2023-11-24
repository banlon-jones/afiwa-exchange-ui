import Dashboard from "../dashboard/Dashboard";
import Home from "../home/Home";
import Login from "../login/Login";
import SignUp from "../sign-up/SignUp";
import { useAuthenticated } from "../../hooks/useAuthenticated";

const { Routes, Route, Navigate } = require("react-router-dom");

const Views = () => {
    const isAuthenticated = useAuthenticated();

    return (
        <Routes >
            <Route index element={<Home />} />
            <Route path="login" element={<AuthRoute  isAuthenticated={isAuthenticated}><Login /></AuthRoute>} />
            <Route path="signup" element={<AuthRoute isAuthenticated={isAuthenticated}><SignUp /></AuthRoute>} />
            <Route path="/dashboard/*" element={<PrivateRoute isAuthenticated={isAuthenticated}><Dashboard /></PrivateRoute>} />
        </Routes>
    )
};

function AuthRoute({isAuthenticated, children}) {
    return (
        isAuthenticated ? <Navigate to={'/dashboard'} /> : <>{children}</>
    );
}

function PrivateRoute({ isAuthenticated, children }) {
    return (
        isAuthenticated ? <>{children}</> : <Navigate to={'/login'} />
    );
}

export default Views;