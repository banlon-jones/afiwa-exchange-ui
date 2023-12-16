import { useQuery } from "react-query";
import { useAxios } from "../../../data/api";
import { Spinner } from "../../spinner/Spinner";
import { FilterExchanges } from "./FilterExchanges";

export const Exchanges = () => {
    const { getCurrentUser } = useAxios()
    const { data, isLoading } = useQuery('currentUser', getCurrentUser, { retry: 0 })
    return (
        <>
            {isLoading && <div className="flex w-full min-h-[100%] items-center justify-center"> <Spinner /></div> }
            {data && <FilterExchanges exchanges={data?.data[0]?.transactions} />}
        </>
    )
}