import { Exchanges } from "../components/dashboard/exchanges/Exchanges";
import { Profile } from "../components/dashboard/Profile";
import Welcome from "../components/dashboard/welcome/Welcome";

const { Routes, Route } = require("react-router-dom");

const DashboardViews = () => (
    <Routes>
        <Route index element={<Welcome />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/exchanges" element={<Exchanges />} />
    </Routes>
);

export default DashboardViews;