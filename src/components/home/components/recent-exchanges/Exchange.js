export const Exchange = ({exchange, reverse}) => {
    return (
        <div className={'flex items-center gap-4 min-w-full lg:min-w-[560px] bg-white rounded-xl p-4 '+ (reverse?'flex-row-reverse': '')}>
            <div className="h-[30px] w-[50px] rounded-lg bg-orange-400"></div>
            <div className="opacity-60">{exchange.name}</div>
            <div className={reverse ? 'mr-auto' : 'ml-auto'}> {exchange.rate} USD</div>
        </div>
    )
}
