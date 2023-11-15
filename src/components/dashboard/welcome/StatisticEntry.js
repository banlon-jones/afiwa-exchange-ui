const StatisticEntry = ({children, data}) => {
    return (
        <div className={'flex gap-5 border-2 px-4 py-5 rounded-xl min-w-[450px]'}>
            <div className={'rounded-full bg-secondary-1 h-[126px] w-[126px]'}></div>

            <div className={'flex flex-col gap-3'}>
                <p className={'text-secondary-2 font-bold'}>{data.name}</p>
                <p className={'text-[30px] font-bold'}>{data.value}</p>

                {children}
            </div>
        </div>
    )
}

export default StatisticEntry;