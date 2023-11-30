import Coin from "./Coin"

const Reserve = () => {
    const coins = ['Perfect Money', 'Perfect Money', 'Perfect Money', 'Perfect Money', 'Perfect Money', 'Perfect Money', 'Perfect Money', 'Perfect Money', 'Perfect Money', 'Perfect Money']

    return (
        <div className={'bg-secondary-1 min-h-[60vh] py-[120px] flex flex-col items-start gap-14 flex-wrap'}>
            <h2 className={'w-full text-center text-[40px] font-bold'}>{'Our Reserve'}</h2>

            <div className={'grid grid-cols-4 gap-10 w-[70vw] mx-auto'}>
                {coins.map((coin, i) => <Coin key={coin + i} name={coin} />)}
            </div>
        </div>
    )
}

export default Reserve;