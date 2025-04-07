import AnimatedBackground from "../components/Home/backgroundElements/AnimatedBackground";
import HeroSection from "../sections/heroSection/HeroSection";
import FeaturedGames from "../sections/featuredGames/FeaturedGames";
import LiveTournaments from "../sections/liveTournaments/LiveTournaments";
import PlayerTestimonials from "../sections/testimonials/Testimonials";
import GameHiGameFeatures from "../components/Home/featureCard/GameHiGameFeatures";
import GameHiGameFooter from "../components/Home/gameHiGameFooter/GameHiGameFooter";

const Home = () => {
  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <AnimatedBackground />
      <HeroSection />
      <FeaturedGames />
      <LiveTournaments />
      <PlayerTestimonials />
      <GameHiGameFeatures />
      <GameHiGameFooter />
    </div>
  );
};

export default Home;
