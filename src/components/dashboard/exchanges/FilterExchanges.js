import { useEffect, useState } from "react";
import { TableViewExchanges } from "./TableViewExchanges"
import { TransactionStatus } from "../../../constants/TransactionStatus";

export const FilterExchanges = ({ exchanges, onStatusChange }) => {
    const statuses = [
        { name: 'All Exchanges', value: null },
        { name: 'In Progress', value: TransactionStatus.PENDING },
        { name: 'Completed', value: TransactionStatus.COMPLETED },
        { name: 'Cancelled', value: TransactionStatus.CANCELED },
        { name: 'Failed', value: TransactionStatus.FAILED }
    ]
    const [selectedStatus, setSelected] = useState([null]);
    const [visibleExchanges, setVisibleExchanges] = useState(exchanges)

    const chooseStatus = (status) => {
        if (selectedStatus.includes(status.value)) {
            setSelected([...selectedStatus.filter(st => st !== status.value)])
        } else {
            if (!status.value) {
                setSelected([null])
            } else {
                setSelected([...(selectedStatus.filter(st => !!st)), status.value])
            }
        }

    }

    useEffect(() => {
        if (selectedStatus.length === 0) {
            setSelected([null])
        }

        if (selectedStatus.includes(null)) {
            setVisibleExchanges([...exchanges])
        } else {
            setVisibleExchanges([...(exchanges.filter(exchange => selectedStatus.includes(exchange.status)))])
        }
    }, [selectedStatus, exchanges])


    return (
        <div className="w-full flex flex-col gap-12">
            <nav className="flex gap-2 flex-wrap md:gap-4">
                {statuses.map(status => <button key={`status-${status.name}${status.value}`} onClick={() => chooseStatus(status)} className={' py-2 px-6 ' + (selectedStatus.includes(status.value) ? 'text-accent bg-secondary-1 font-bold rounded-full' : ' opacity-70')}>{status.name}</button>)}
            </nav>
            <div>
                <TableViewExchanges onStatusChange={onStatusChange} transactions={visibleExchanges} />
            </div>
        </div>
    )
}