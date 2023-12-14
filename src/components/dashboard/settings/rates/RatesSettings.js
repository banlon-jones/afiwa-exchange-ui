import { Icon } from "@iconify/react"
import { EditRate } from "./EditRate"

export const RatesSettings = () => {
    const rates = [1, 2, 3, 4, 5,6]
    return (
        <div>
            <table>
                <thead>
                    <tr className="text-left text-[22px] [&>*]:py-4">
                        <th className="w-[300px] ">{'Country'}</th>
                        <th className="min-w-[150px]">{'Currency'}</th>
                        <th className="min-w-[450px]">{'Rate Per $'}</th>
                        <th>{'Manage'}</th>
                    </tr>
                </thead>

                <tbody className="text-secondary-2 text-left text-[18px] ">
                    {
                        rates.map(rate => <tr className="[&>*]:py-3">
                            <td>{'Benin'}</td>
                            <td>{'Xof-BJ'}</td>
                            <td>
                                <EditRate />
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}