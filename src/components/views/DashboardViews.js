import Welcome from "../dashboard/welcome/Welcome";

const { Routes, Route } = require("react-router-dom");

const DashboardViews = () => (
    <Routes>
        <Route index element={<Welcome />} />
    </Routes>
);

export default DashboardViews;