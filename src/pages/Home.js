import Hero from "../components/home/hero/Hero";
import { RecentExchanges } from "../components/home/recent-exchanges/RecentExchanges";
import Reserve from "../components/home/reserve/Reserve";
import Reviews from "../components/home/reviews/Reviews";
import {useEffect, useState} from "react";
import {recentExhangeRate} from "../libs/appUtil";
import { useAxios } from "../data/api";

const Home = () => {
  const [currencies, setCurrencies] = useState([]);
  const {getCurrencies} = useAxios();

  const fetchCurrencies = async () => {
    try {
      setCurrencies((await getCurrencies()).data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchCurrencies();
  }, []);
  return (
    <div>
      <Hero currencies={currencies}/>
      <Reserve currencies={currencies}/>
      <Reviews/>
      <RecentExchanges currencies={recentEntities(currencies)} />
    </div>
  )
}
export default Home;
