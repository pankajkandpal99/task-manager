import React, { ReactNode } from "react";

interface FeatureCardProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  variant?: "default" | "boxed";
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  variant = "default",
}) => {
  if (variant === "boxed") {
    return (
      <div className="bg-[#121a2a]/70 rounded-lg p-6 border border-[#1e293b] hover:border-[#6FFFB4]/30 transition-all shadow-lg group">
        <div className="w-12 h-12 bg-[#0a101f] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#6FFFB4]/10 transition-colors">
          {typeof icon === "string" ? (
            <span className="text-[#6FFFB4]">{icon}</span>
          ) : (
            icon
          )}
        </div>
        <h3 className="text-lg font-semibold mb-2 group-hover:text-[#6FFFB4] transition-colors">
          {title}
        </h3>
        <p className="text-[#94a3b8]">{description}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#121a2a]/50 p-6 rounded-xl border border-[#1e293b]/50 backdrop-blur-sm shadow-lg relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6FFFB4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative">
        <div className="text-4xl mb-4">
          {typeof icon === "string" ? (
            icon
          ) : (
            <div className="text-[#6FFFB4]">{icon}</div>
          )}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-[#94a3b8]">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
