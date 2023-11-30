import Hero from "./components/hero/Hero";
import { RecentExchanges } from "./components/recent-exchanges/RecentExchanges";
import Reserve from "./components/reserve/Reserve";
import Reviews from "./components/reviews/Reviews";

const Home = () => (
    <div>
        <Hero />
        <Reserve />
        <Reviews />
        <RecentExchanges />
    </div>
)

export default Home;