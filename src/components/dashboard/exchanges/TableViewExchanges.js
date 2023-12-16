import PaymentChannel from "./PaymentChannel"
import PaymentStatus from "./PaymentStatus"

export const TableViewExchanges = ({exchanges}) => {
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
                        exchanges.map(ex => {
                            return (<tr className={'[&>*]:px-5 [&>*]:py-3'} key={ex.id}>
                                <td><PaymentChannel name={'Orange Money Burkina'} /></td>
                                <td><PaymentChannel name={'TRON'} /></td>
                                <td><PaymentStatus status={ex.status} /></td>
                                <td>
                                    <ul>
                                        <li>
                                            <span>{'Transaction ID:'} </span> <span className={'text-secondary-2'}>{ex.id}</span>

                                        </li>
                                        <li>
                                            <span>{'Date:'} </span> <span className={'text-secondary-2'}>{ex.createdAt}</span>

                                        </li>
                                        <li>
                                            <span>{'Exchange rate:'} </span> <span className={'text-secondary-2'}>{'65 FCFA - 1 TRON'}</span>

                                        </li>
                                        <li>
                                            <span>{'Email Address:'} </span> <span className={'text-secondary-2'}>{'example@email.com'}</span>

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