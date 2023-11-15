import globe from '../../assets/images/globe.svg'

const Hero = () => {

    return (
        <section className={'min-h-[80vh] py-16 gap-32 flex item-center justify-center'}>
            <div className={'max-w-[700px] flex flex-col gap-4'}>
                <h1 className={'font-[600] text-[36px] leading-[50px]'}>{'An affordable, rapid method for internation money transfers currency'}</h1>
                <p className={'max-w-[537px] text-[16px] text-secondary-2'}>{'Efficient, adaptable, and safe internation money transfers worldwide. Save both time and funds when you make international transfers through us'}</p>

                <img src={globe}/>
            </div>


            <form className={'border-2 rounded-3xl px-[60px] py-[50px] w-[734px]'}>

            </form>

        </section>
    )
}

export default Hero;