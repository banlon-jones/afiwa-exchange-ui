import DashboardViews from "../routes/DashboardViews";
import Sidebar from "../components/dashboard/Sidebar";

const Dashboard = () => {
    return (
        <div className={'relative lg:flex gap-8 lg:gap-24 px-2 lg:py-8 lg:px-12 pb-32 max-w-full'}>
            <div className={'hidden lg:block sticky shadow top-0 bg-white md:shadow-none p-2 py-8 w-[315px]'}>
                <Sidebar />
            </div>

            <div className="py-12">
                <DashboardViews />
            </div>
        </div>
    )
}


export default Dashboard;