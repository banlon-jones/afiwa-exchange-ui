import {useEffect, useState} from "react";
import {useAxios} from "../../../data/api";

const PaymentChannel = ({currentId}) => {

  const [currency, setCurrent] = useState();

  const { getCurrency: getCurrent } = useAxios();
  const getCurrency = async () => {
    try {
      setCurrent((await getCurrent(currentId)).data)
      console.log(currency)
    } catch (e) {

    }
  }
  useEffect(() => {
    getCurrency();
  }, []);
    return (
        <div>
            <div className={'rounded-xl h-[25px] w-[40px] bg-orange-500'}></div>
            <p className={'text-secondary-2'}>{currency?.name}</p>
        </div>
    )
}

export default PaymentChannel;
