import { AllExchanges } from "../components/dashboard/exchanges/AllExchanges";
import { Exchanges } from "../components/dashboard/exchanges/Exchanges";
import { Profile } from "../components/dashboard/Profile";
import { RatesSettings } from "../components/dashboard/settings/rates/RatesSettings";
import { WalletsSettings } from "../components/dashboard/settings/wallets/WalletsSettings";
import Welcome from "../components/dashboard/welcome/Welcome";

const { Routes, Route } = require("react-router-dom");

const DashboardViews = () => (
    <Routes>
        <Route index element={<Welcome />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/exchanges" element={<Exchanges />} />
        <Route path="/all_exchanges" element={<AllExchanges />} />
        <Route path="/rates" element={<RatesSettings />} />
        <Route path="/wallets" element={<WalletsSettings />} />
    </Routes>
);

export default DashboardViews;