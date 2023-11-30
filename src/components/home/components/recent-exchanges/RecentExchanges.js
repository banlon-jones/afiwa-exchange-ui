import { Icon } from "@iconify/react"
import { Exchange } from "./Exchange"

export const RecentExchanges = () => {
    const exchanges = [
        1, 2, 3
    ]
    return (
        <div className="flex justify-center pb-40">
            <div className="bg-accent max-w-[1424px] rounded-xl p-20 flex flex-col gap-16">
                <h2 className="text-[40px] text-center font-bold text-white">Recent Exchanges</h2>

                <div className="flex flex-col gap-10">
                        {exchanges.map(exchange => {
                            return (
                                <div className="flex items-center gap-8 justify-between">
                                    <Exchange exchange={exchange}/>
                                    <Icon height={32} className="text-white" icon="ic:baseline-arrow-right-alt" />
                                    <Exchange reverse={true} exchange={exchange}/>
                                </div>
                            )
                        })}
                    </div>
            </div>
        </div>
    )
}