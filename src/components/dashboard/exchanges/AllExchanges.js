import { useMutation, useQuery } from "react-query";
import { useAxios } from "../../../data/api";
import { Spinner } from "../../spinner/Spinner";
import { FilterExchanges } from "./FilterExchanges";
import { useEffect, useState } from "react";

export const AllExchanges = () => {
    const { getAllTransactions, updateTransactionStatus } = useAxios()
    const [updatedTransaction, setUpdatedTransaction] = useState()
    const { data, isLoading } = useQuery('exchanges', getAllTransactions, { retry: 0 })
    const { mutate, isSuccess, isLoading: isUpdatingStatus } = useMutation(({ id, ...status }) => {
        updateTransactionStatus(status, id);
    })

    const updateStatus = (newStatus) => {
        mutate(newStatus)
        setUpdatedTransaction(newStatus)
    }

    useEffect(() => {
        if (isSuccess) {
            data.data = data.data.map(transaction => {
                if (transaction.id === updatedTransaction?.id) {
                    return { ...transaction, ...updatedTransaction }
                }
                return transaction
            })

            setUpdatedTransaction(null)
        }
    }, [isSuccess, data, updatedTransaction])

    return (
        <>
            {isUpdatingStatus && <div className="fixed left-0 top-0 h-[100vh] z-100 w-full flex items-center justify-center bg-secondary-2 bg-opacity-50"><Spinner /></div>}
            {isLoading && <div className="flex w-full min-h-[100%] items-center justify-center"> <Spinner /></div>}
            {data && <FilterExchanges onStatusChange={updateStatus} exchanges={data.data} />}
        </>
    )
}
