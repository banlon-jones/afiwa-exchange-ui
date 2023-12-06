const PaymentStatus = ({status}) => {
    let color = 'rounded-2xl px-2 py-1 opacity-70 ';
    switch(status) {
        case 'Cancelled':
            color += 'bg-red-300';
            break;
            case 'Completed':
                color += 'bg-green-300';
                break;
            default:
                color += 'bg-yellow-300'
    }
    return (
        <span className={color}>{status}</span>
    )
}

export default PaymentStatus;