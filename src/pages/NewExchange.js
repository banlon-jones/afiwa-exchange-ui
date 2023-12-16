import { useQuery } from "react-query"
import { ExchangeForm } from "../components/ExchangeForm"
import { useAxios } from "../data/api"
import { Spinner } from "../components/spinner/Spinner"
import { useSearchParams } from "react-router-dom"

export const NewExchange = () => {
    const { getCurrencies } = useAxios()
    const { data, isLoading } = useQuery('currencies', getCurrencies)
    const [searchParams] = useSearchParams()


    return (
        <div className="pt-10 pb-32 flex justify-center">
            <div className="w-[90vw] md:w-[60vw] lg:w-[35vw]">
                {
                    isLoading && <div className="flex min-h-[70vh] min-w-full items-center justify-center">
                        <Spinner />
                    </div>

                }                

                {
                    data && <div>
                        <h2 className="text-xl font-bold text-center mb-4 text-secondary-2">{'New Exchange'}</h2>
                        <ExchangeForm from={searchParams.get('from')} to={searchParams.get('to')} currencies={data.data} starting={false} />
                    </div>
                }
            </div>
        </div>
    )
}