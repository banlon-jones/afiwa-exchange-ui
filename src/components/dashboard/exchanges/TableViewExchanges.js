import PaymentChannel from "./PaymentChannel"
import PaymentStatus from "./PaymentStatus"

export const TableViewExchanges = ({ transactions }) => {
    return (
        <div className={'rounded-xl overflow-hidden border-2 w-full'}>
            <table className={'w-full text-left'}>
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
                                <td><PaymentChannel currentId={transaction?.from} /></td>
                                <td><PaymentChannel currentId={transaction?.to} /></td>
                                <td><PaymentStatus status={transaction?.status} /></td>
                                <td>
                                    <ul>
                                        <li>
                                            <span>{'Transaction ID:'} </span> <span className={'text-secondary-2'}>{transaction?.id}</span>

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
                                        <li>
                                            <span>{'Our TRON Address:'} </span> <span className={'text-secondary-2'}>{'iuiuouopioioio'}</span>

                                        </li>
                                    </ul>
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}