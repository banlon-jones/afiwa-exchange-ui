import Dashboard from "../dashboard/Dashboard";
import Home from "../home/Home";
import Login from "../login/Login";
import SignUp from "../sign-up/SignUp";

const { Routes, Route } = require("react-router-dom");

const Views = () => (
    <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="dashboard/*" element={<Dashboard />} />
    </Routes>
);

export default Views;