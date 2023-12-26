import PaymentChannel from "./PaymentChannel"
import PaymentStatus from "./PaymentStatus"
import { TransactionStatusForm } from "./TransactionStatusForm"

export const TableViewExchanges = ({ transactions = [], onStatusChange }) => {
    return (
        <div className={'rounded-xl overflow-hidden border-2 overflow-x-scroll lg:overflow-x-hidden'}>
            <table className={'min-w-[700px] lg:min-w-[1500px] text-left'}>
                <thead>
                    <tr className={'bg-secondary-1 [&>*]:px-5 [&>*]:py-3'}>
                        <th>{'Send'}</th>
                        <th>{'Receive'}</th>
                        <th>{'Status'}</th>
                        <th>{'Details'}</th>
                    </tr>
                </thead>
                <tbody className={'[&>*]:border'}>
                    {
                        transactions.map(transaction => {
                            return (<tr className={'[&>*]:px-5 [&>*]:py-3'} key={transaction.id}>
                                <td>
                                    <PaymentChannel currentId={transaction?.from} />
                                    <span> {transaction?.amount} </span>
                                </td>
                                <td>
                                    <PaymentChannel currentId={transaction?.to} />
                                    <span> {transaction?.receivedAmount} </span>
                                </td>
                                <td><PaymentStatus status={transaction?.status} /></td>
                                <td>
                                    <div>
                                        <ul>
                                            <li>
                                                <span>{'Transaction ID:'} </span> <span className={'text-secondary-2'}>{transaction?.transactionId}</span>

                                            </li>
                                            <li>
                                                <span>{'Date:'} </span> <span className={'text-secondary-2'}>{transaction?.createdAt}</span>

                                            </li>
                                            <li>
                                                <span>{'Exchange rate:'} </span> <span className={'text-secondary-2'}>{transaction?.exchangeRate}</span>

                                            </li>
                                            <li>
                                                <span>{'Email Address:'} </span> <span className={'text-secondary-2'}>{transaction?.email}</span>

                                            </li>
                                        </ul>

                                        {
                                            onStatusChange && <TransactionStatusForm transaction={transaction} onSubmit={onStatusChange} />
                                        }
                                    </div>
                                </td>
                            </tr>)
                        })
                    }

                    {
                        transactions.length === 0 && <tr>
                            <td colSpan={4}>
                                <div className="flex items-center justify-center py-8 text-secondary-2">
                                    {'No items'}
                                </div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>

    )
}
