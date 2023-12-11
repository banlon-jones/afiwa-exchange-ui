import DashboardViews from "../views/DashboardViews";
import Sidebar from "./Sidebar";

const Dashboard = () => {
    return (
        <div className={'flex gap-24 px-12 py-12 pb-32'}>
            <div className={'w-[315px]'}>
                <Sidebar />
            </div>

            <div className="w-full">
                <DashboardViews />
            </div>
        </div>
    )
}


export default Dashboard;