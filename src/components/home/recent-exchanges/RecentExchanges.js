import { Icon } from "@iconify/react"
import { Exchange } from "./Exchange"

export const RecentExchanges = ({currencies}) => {
    return (
        <div className="flex py-20 justify-center pb-40">
            <div className="bg-accent w-[95%] lg:w-[70%] rounded-xl p-8 lg:p-20 flex flex-col gap-10 lg:gap-20">
                <h2 className="text-[20px] lg:text-[40px] text-center font-bold text-white">Recent Exchanges</h2>

                <div className="flex flex-col gap-10">
                        {currencies.map((exchange, i ) => {
                            return (
                                <div key={`exchange-${i}`} className="flex flex-col lg:flex-row items-center gap-2 lg:gap-8 justify-between">
                                    <Exchange exchange={exchange}/>
                                    <Icon height={32} className="text-white rotate-90 lg:rotate-0" icon="ic:baseline-arrow-right-alt" />
                                    <Exchange reverse={true} exchange={exchange}/>
                                </div>
                            )
                        })}
                    </div>
            </div>
        </div>
    )
}
