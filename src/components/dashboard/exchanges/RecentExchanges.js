import { Link } from "react-router-dom";
import PaymentChannel from "./PaymentChannel";
import PaymentStatus from "./PaymentStatus";
import { TableViewExchanges } from "./TableViewExchanges";

const RecentExchanges = () => {

    const exchanges = ['In Progress', 'Cancelled', 'Cancelled', 'Completed', 'Completed']

    return (
        <div className={'w-full'}>
            <TableViewExchanges exchanges={exchanges} />
            
            <div className="text-center py-8">
                <Link className="bg-secondary-1 py-2 px-6 rounded-2xl" to={'/dashboard/exchanges'}>{'View All'}</Link>
            </div>
        </div>
    )
}

export default RecentExchanges;