import { Link } from "react-router-dom";

const Coin = ({name, rate, fill='bg-orange-500'}) => (
    <Link className={'py-7 px-10 bg-white flex flex-col gap-2 rounded-xl'} to={name}>
        <div className={'flex items-center gap-4'}>
            <div className={'rounded-xl h-[30px] w-[51px] '+ fill}></div>
            <span className={'font-[600]'}>{name}</span>
        </div>
        <div className={'text-secondary-2 opacity-90'}>
            {`${rate} USD`}
        </div>
    </Link>
)

export default Coin;
