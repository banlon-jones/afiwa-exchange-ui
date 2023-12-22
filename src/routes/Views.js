import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { useAuthenticated } from "../hooks/useAuthenticated";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../libs/ReactQuery";
import { NewExchange } from "../pages/NewExchange";
import ResetPassword from "../pages/ResetPassword";

const { Routes, Route, Navigate } = require("react-router-dom");

const Views = () => {
    const isAuthenticated = useAuthenticated();

    return (
        <QueryClientProvider client={queryClient}>
            <Routes >
                <Route index element={<Home />} />
                <Route path="login" element={<AuthRoute isAuthenticated={isAuthenticated}><Login /></AuthRoute>} />
                <Route path="reset_password" element={<AuthRoute isAuthenticated={isAuthenticated}><ResetPassword /></AuthRoute>} />
                <Route path="signup" element={<AuthRoute isAuthenticated={isAuthenticated}><SignUp /></AuthRoute>} />
                <Route path="/new_exchange" element={<PrivateRoute isAuthenticated={isAuthenticated}><NewExchange /></PrivateRoute>} />
                <Route path="/dashboard/*" element={<PrivateRoute isAuthenticated={isAuthenticated}><Dashboard /></PrivateRoute>} />
            </Routes>
        </QueryClientProvider>

    )
};

function AuthRoute({ isAuthenticated, children }) {
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