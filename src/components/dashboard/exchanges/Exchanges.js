import { useQuery } from "react-query";
import { useAxios } from "../../../data/api";
import { FilterExchanges } from "./FilterExchanges";

export const Exchanges = () => {
    const { getCurrentUser } = useAxios()
    const { data, isLoading } = useQuery('currentUser', getCurrentUser, { retry: 0 })
    return (
        <>
            {data && <FilterExchanges exchanges={data?.data[0]?.transactions} />}
        </>
    )
}