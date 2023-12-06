import Hero from "./components/hero/Hero";
import { RecentExchanges } from "./components/recent-exchanges/RecentExchanges";
import Reserve from "./components/reserve/Reserve";
import Reviews from "./components/reviews/Reviews";
import {useEffect, useState} from "react";
import {getCurrencies} from "../../data/api";
import {recentExhangeRate} from "../../libs/appUtil";

const Home = () => {
  const [currencies, setCurrencies] = useState([]);

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
      <RecentExchanges currencies={recentExhangeRate(currencies)} />
    </div>
  )
}
export default Home;
