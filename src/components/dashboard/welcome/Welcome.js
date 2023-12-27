import RecentExchanges from "../exchanges/RecentExchanges";
import StatisticEntry from "./StatisticEntry";
import {useAxios} from "../../../data/api";
import {useEffect, useState} from "react";
import {recentEntities} from "../../../libs/appUtil";

const Welcome = () => {
    const [transactions, setTransaction] = useState([]);

    const {getCurrentUser: getUserTransactions} = useAxios();

    const fetchTransactions = async () => {
        try {
            setTransaction((await getUserTransactions()).data?.transactions)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchTransactions();
    }, []);

    const stats = [
        {
            name: 'Total exchanges',
            value: transactions?.length || 0,
            extra: <button className={'py-2 px-5 text-accent border-2 rounded-full hover:bg-accent hover:text-white'}>{'New Exchange'}</button>
        },
        {
            name: 'Total Referrals',
            value: '0',
            extra: <button className={'py-2 px-5 text-accent border-2 rounded-full hover:bg-accent hover:text-white'}>{'New Referral'}</button>
        },
        {
            name: 'Discount',
            value: '0.03%',
            extra: <p className={'max-w-[225px] text-secondary-2'}>Discounts are a result of accumulated exchanges and referrals</p>
        }
    ]
    return (
        <div className={'max-w-[1450px] flex flex-col gap-10'}>
            <div>
                <h2 className={'text-lg text-secondary-2 pb-3'}>{'Statistics'}</h2>

                <div className={'flex gap-5'}>
                    {stats.map((stat, i) => <StatisticEntry key={stat.name} data={stat}>{stat.extra}</StatisticEntry>)}
                </div>
            </div>


            <div>
                <h2 className={'text-lg text-secondary-2 pb-3'}>{'Last Exchanges'}</h2>
                <RecentExchanges transactions={recentEntities(transactions)}/>
            </div>
        </div>
    )
}

export default Welcome;
