import React from "react";
import {
  BonusesIcon,
  MultiplayerIcon,
  PaymentIcon,
  SecurityIcon,
} from "./FeatureIcon";
import FeaturesSection from "../../../sections/categoryGames/CategoryGamesSection";
import { Feature } from "../../../sections/categoryGames";

const gameHiGameFeatures: Feature[] = [
  {
    id: "secure-payments",
    title: "Secure Payments",
    description:
      "Multiple payment options with instant deposits and withdrawals.",
    icon: <PaymentIcon />,
  },
  {
    id: "fair-games",
    title: "100% Fair Games",
    description:
      "All games are certified fair with transparent results and statistics.",
    icon: <SecurityIcon />,
  },
  {
    id: "live-multiplayer",
    title: "Live Multiplayer",
    description:
      "Play with friends or compete against players from across the country.",
    icon: <MultiplayerIcon />,
  },
  {
    id: "daily-bonuses",
    title: "Daily Bonuses",
    description:
      "Get free coins, spins, and exciting rewards every day you log in.",
    icon: <BonusesIcon />,
  },
];

const GameHiGameFeatures: React.FC = () => {
  return (
    <FeaturesSection
      title="Why Choose GameHiGame?"
      subtitle="We provide the best gaming experience with exciting features"
      features={gameHiGameFeatures}
      variant="boxed"
      columns={4}
    />
  );
};

export default GameHiGameFeatures;
