import { Link } from "react-router-dom";

const Coin = ({name}) => (
    <Link className={'py-7 px-10 bg-white flex flex-col gap-2 rounded-xl'} to={name}>
        <div className={'flex items-center gap-4'}>
            <div className={'rounded-full h-[30px] w-[30px] bg-secondary-1'}></div>
            <span className={'font-[600]'}>{name}</span>
        </div>
        <div className={'text-secondary-2'}>
            {'3.99999000000048 USD'}
        </div>
    </Link>
)

export default Coin;