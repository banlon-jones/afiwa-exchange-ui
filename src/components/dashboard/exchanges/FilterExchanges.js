import { useState } from "react";
import { TableViewExchanges } from "./TableViewExchanges"

export const FilterExchanges = ({exchanges, onStatusChange}) => {
    const statuses = [
        { name: 'All Exchanges', value: '' },
        { name: 'In Progress', value: 'In Progress' },
        { name: 'Completed', value: 'Completed' },
        { name: 'Cancelled', value: 'Cancelled' },
    ]
    const [selectedStatus, setSelected] = useState([]);

    const chooseStatus = (status) => {
        if (selectedStatus.includes(status.value)) {
            setSelected([...selectedStatus.filter(st => st !== status.value)])
        } else {
            setSelected([...selectedStatus, status.value])
        }
    }


    return (
        <div className="w-full flex flex-col gap-12">
            <nav className="flex gap-4">
                {statuses.map(status => <button key={`status-${status.name}${status.value}`} onClick={() => chooseStatus(status)} className={' py-2 px-6 ' + (selectedStatus.includes(status.value) ? 'text-accent bg-secondary-1 font-bold rounded-full' : ' opacity-70')}>{status.name}</button>)}
            </nav>
            <div>
                <TableViewExchanges onStatusChange={onStatusChange} transactions={exchanges} />
            </div>
        </div>
    )
}