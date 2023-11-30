export const Exchange = ({review, reverse}) => {
    return (
        <div className={'flex items-center gap-4 min-w-[560px] bg-white rounded-xl p-4 '+ (reverse?'flex-row-reverse': '')}>
            <div className="h-[30px] w-[50px] rounded-lg bg-orange-400"></div>
            <div className="opacity-60">Orange Money Burkina</div>
            <div className={reverse ? 'mr-auto' : 'ml-auto'}>15,893.00 FCFA</div>
        </div>
    )
}