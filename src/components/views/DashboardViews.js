import { Profile } from "../dashboard/profile/Profile";
import Welcome from "../dashboard/welcome/Welcome";

const { Routes, Route } = require("react-router-dom");

const DashboardViews = () => (
    <Routes>
        <Route index element={<Welcome />} />
        <Route path="/profile" element={<Profile />} />
    </Routes>
);

export default DashboardViews;