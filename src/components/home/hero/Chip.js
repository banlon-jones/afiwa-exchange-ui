export const Chip = ({children, fill = 'bg-slate-400' }) => {
    return (
        <div className="flex items-center gap-2">
            <div className={'h-[10px] w-[10px] rounded-full ' + fill}></div>
            <div>{children}</div>
        </div>
    )
}