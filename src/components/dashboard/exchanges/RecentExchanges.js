import { Link } from "react-router-dom";
import { TableViewExchanges } from "./TableViewExchanges";

const RecentExchanges = ({transactions}) => {
    return (
        <div className={'w-full'}>
            <TableViewExchanges transactions={transactions} />

            <div className="text-center py-8">
                <Link className="bg-secondary-1 py-2 px-6 rounded-2xl" to={'/dashboard/exchanges'}>{'View All'}</Link>
            </div>
        </div>
    )
}

export default RecentExchanges;
