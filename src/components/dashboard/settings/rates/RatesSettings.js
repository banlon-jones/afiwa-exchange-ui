import { EditRate } from "./EditRate"
import { useAxios } from "../../../../data/api";
import { useQuery } from "react-query";
import { Spinner } from "../../../spinner/Spinner";
import { Rate } from "./Rate";
import { useState } from "react";
import { Icon } from "@iconify/react";

export const RatesSettings = () => {
    const { getCurrencies } = useAxios();
    const { data, isLoading } = useQuery('currencies', getCurrencies)
    const [newRate, setNewRate] = useState()

    return (
        <div>
            {isLoading && <div className="h-[1100%] min-h-[40vh] flex w-full items-center justify-center"> <Spinner /> </div>}
            {data && <table>
                <thead>
                    <tr className="text-left text-[22px] [&>*]:py-4">
                        <th className="min-w-[350px] ">{'Name'}</th>
                        <th className="min-w-[150px]">{'Wallet'}</th>
                        <th className="min-w-[450px]">{'Rate Per $'}</th>
                        <th>{'Manage'}</th>
                    </tr>
                </thead>

                <tbody className="text-secondary-2 text-left text-[18px] ">
                    {
                        data?.data.map(rate => <Rate rate={rate} key={rate.id} />)
                    }

                    {
                        newRate && <Rate removeTemoporary={()=> setNewRate(null)} rate={newRate} adding={true} />
                    }

                    <tr>
                        <td colSpan={3}>
                            <div className="flex py-10 flex-1 justify-end">
                                <button className="px-7 py-2 bg-accent opacity-70 hover:opacity-100 text-white text-lg rounded-xl flex items-center gap-2" onClick={() => setNewRate({})}>
                                    {'Add New Rate'}
                                    <Icon icon={'carbon:add-filled'} />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>}


        </div>
    )
}