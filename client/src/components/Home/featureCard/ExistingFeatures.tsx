import FeaturesSection from "../../../sections/categoryGames/CategoryGamesSection";
import FeatureCard from "./FeatureCard";

// Example of how to use your existing features with the updated component
const ExistingFeatures: React.FC = () => {
  const features = [
    {
      id: "daily-contests",
      icon: "🏆",
      title: "Daily Contests",
      description: "Join tournaments with big prize pools",
    },
    {
      id: "instant-withdrawal",
      icon: "💸",
      title: "Instant Withdrawal",
      description: "Get your winnings in 2 minutes",
    },
    {
      id: "secure-safe",
      icon: "🔒",
      title: "Secure & Safe",
      description: "100% RNG certified games",
    },
  ];

  // Using the new FeaturesSection component with the existing features
  return (
    <FeaturesSection
      title="Our Features"
      subtitle="What makes us different"
      features={features}
      variant="default"
      columns={3}
    />
  );
};

// Alternative usage keeping your original implementation style
const OriginalStyleFeatureCards: React.FC = () => {
  const features = [
    {
      icon: "🏆",
      title: "Daily Contests",
      description: "Join tournaments with big prize pools",
    },
    {
      icon: "💸",
      title: "Instant Withdrawal",
      description: "Get your winnings in 2 minutes",
    },
    {
      icon: "🔒",
      title: "Secure & Safe",
      description: "100% RNG certified games",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-20">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          variant="default"
        />
      ))}
    </div>
  );
};

export { ExistingFeatures, OriginalStyleFeatureCards };
