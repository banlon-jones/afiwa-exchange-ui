const PaymentChannel = ({name}) => {
    return (
        <div>
            <div className={'rounded-xl h-[25px] w-[40px] bg-orange-500'}></div>
            <p className={'text-secondary-2'}>{name}</p>
        </div>
    )
}

export default PaymentChannel;