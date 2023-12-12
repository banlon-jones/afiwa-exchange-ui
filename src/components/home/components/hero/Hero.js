import { ExchangeForm } from "../ExchangeForm";
import { Chip } from "./Chip";

const Hero = ({currencies}) => {

    return (
        <section className={'px-4 min-h-[95vh] py-16 gap-16 lg:gap-32 flex flex-col lg:flex-row items-center justify-center'}>
            <div className={'max-w-[700px] flex flex-col gap-4'}>
                <h1 className={'font-[600] text-[36px] leading-[50px]'}>{'An affordable, rapid method for internation money transfers currency'}</h1>
                <p className={'max-w-[537px] text-[16px] text-secondary-2'}>{'Efficient, adaptable, and safe internation money transfers worldwide. Save both time and funds when you make international transfers through us'}</p>
            </div>


            <div className="lg:w-[734px] flex flex-col gap-2.5">
                <div className="text-[16px] flex gap-10 lg:gap-16 lg:pl-10">
                    <p className="opacity-80">Work time: 06:00 - 00:00 GMT</p>
                    <div>
                        <Chip fill='bg-green-500'><span className="opacity-80">Online</span></Chip>
                    </div>
                </div>
                <ExchangeForm currencies={currencies} />
            </div>

        </section>
    )
}

export default Hero;
