import Coin from "./Coin"

const Reserve = ({currencies}) => {
      return (
        <div className={'bg-secondary-1 min-h-[60vh] py-[120px] flex flex-col items-start gap-14 flex-wrap'}>
            <h2 className={'w-full text-center text-[40px] font-bold'}>{'Our Reserve'}</h2>

            <div className={'grid grid-cols-4 gap-10 w-[70vw] mx-auto justify-center'}>
                {currencies.map((coin) => <Coin key={coin.id} name={coin.name} rate={coin.rate} />)}
            </div>
        </div>
    )
}

export default Reserve;
