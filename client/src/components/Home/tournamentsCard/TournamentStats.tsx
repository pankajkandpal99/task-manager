import React from "react";

const TournamentStats: React.FC = () => {
  const stats = [
    { label: "Prize Pool", value: "₹100,000", highlight: true },
    { label: "Entry Fee", value: "₹99" },
    { label: "Players", value: "762/1000" },
    { label: "Starts In", value: "01:24:36", countdown: true },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-[#0a101f]/80 rounded-lg p-3 border border-[#1e293b]/30"
        >
          <p className="text-xs text-[#94a3b8]">{stat.label}</p>
          <p
            className={`text-lg font-bold ${
              stat.highlight ? "text-[#6FFFB4]" : ""
            } ${stat.countdown ? "text-[#FF6FE5]" : ""}`}
          >
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TournamentStats;
