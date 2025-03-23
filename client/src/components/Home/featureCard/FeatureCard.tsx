import React from "react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="bg-[#121a2a]/50 p-6 rounded-xl border border-[#1e293b]/50 backdrop-blur-sm shadow-lg relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6FFFB4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-[#94a3b8]">{description}</p>
      </div>
    </div>
  );
};

const FeatureCards: React.FC = () => {
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
        />
      ))}
    </div>
  );
};

export default FeatureCards;
