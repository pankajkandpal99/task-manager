import React from "react";
import HeroContent from "./heroContent/HeroContent";
import TournamentCard from "../../components/Home/tournamentsCard/TournamentCard";
import FeatureCard from "../../components/Home/featureCard/FeatureCard";

const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-20 pb-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <HeroContent />
          <TournamentCard />
        </div>

        <FeatureCard />
      </div>
    </section>
  );
};

export default HeroSection;
