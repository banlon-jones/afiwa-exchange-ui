import Dashboard from "../dashboard/Dashboard";
import Home from "../home/Home";
import Login from "../login/Login";
import SignUp from "../sign-up/SignUp";
import { useAuthenticated } from "../../hooks/useAuthenticated";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../../libs/ReactQuery";

const { Routes, Route, Navigate } = require("react-router-dom");

const Views = () => {
    const isAuthenticated = useAuthenticated();

    return (
        <QueryClientProvider client={queryClient}>
            <Routes >
                <Route index element={<Home />} />
                <Route path="login" element={<AuthRoute isAuthenticated={isAuthenticated}><Login /></AuthRoute>} />
                <Route path="signup" element={<AuthRoute isAuthenticated={isAuthenticated}><SignUp /></AuthRoute>} />
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