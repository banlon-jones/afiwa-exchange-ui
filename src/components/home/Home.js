import Hero from "./Hero";
import { RecentExchanges } from "./recent-exchanges/RecentExchanges";
import Reserve from "./reserve/Reserve";
import Reviews from "./reviews/Reviews";

const Home = () => (
    <div>
        <Hero />
        <Reserve />
        <Reviews />
        <RecentExchanges />
    </div>
)

export default Home;