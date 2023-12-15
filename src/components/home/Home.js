import Hero from "./components/hero/Hero";
import { RecentExchanges } from "./components/recent-exchanges/RecentExchanges";
import Reserve from "./components/reserve/Reserve";
import Reviews from "./components/reviews/Reviews";
import {useEffect, useState} from "react";
import {recentEntities} from "../../libs/appUtil";
import { useAxios } from "../../data/api";

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
