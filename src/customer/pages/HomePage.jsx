import Hero from "../components/Home/Hero";
import HomeCollections from "../components/Home/HomeCollections";
import HomeFavorites from "../components/Home/HomeFavorites";
import HomeFeature from "../components/Home/HomeFeature";
import HomeCTA from "../components/Home/HomeCTA";

const HomePage = () => {
  return(
    <div>
        <Hero />
        <HomeCollections />
        <HomeFavorites />
        <HomeFeature />
        <HomeCTA />
    </div>
  )
};

export default HomePage;
