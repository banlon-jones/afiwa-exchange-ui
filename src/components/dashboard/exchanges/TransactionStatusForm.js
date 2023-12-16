import { useForm } from "react-hook-form"
import { TransactionStatus } from "../../../constants/TransactionStatus"

export const TransactionStatusForm = ({transaction, onSubmit}) => {
    const {register, handleSubmit} = useForm()

    const statuses = [
        TransactionStatus.PENDING,
        TransactionStatus.COMPLETED,
        TransactionStatus.FAILED,
        TransactionStatus.CANCELED
    ]

    const updateStatus = (status) => {
        onSubmit(status)
    }

    return (
        <form onSubmit={handleSubmit(updateStatus)} className="py-5 flex gap-2">
            <input hidden name="id" {...register('id', { value: transaction.id, required: false })} />
            <select defaultValue={transaction.status} name="status" {...register('status', { required: false })}>
                {statuses.map(status => <option key={'update_status' + status} >{status}</option>)}
            </select>

            <button type="submit" className="border-2 rounded-xl hover:bg-accent hover:text-white border-accent py-1 px-5">{'Save'}</button>
        </form>
    )
}