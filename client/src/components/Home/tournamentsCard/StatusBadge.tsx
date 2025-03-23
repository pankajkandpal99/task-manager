import React from "react";

const StatusBadge: React.FC = () => {
  return (
    <div className="bg-[#6FFFB4]/20 text-[#6FFFB4] px-3 py-1 rounded-full text-sm flex items-center gap-1">
      <span className="w-2 h-2 bg-[#6FFFB4] rounded-full"></span>
      <span>Live</span>
    </div>
  );
};

export default StatusBadge;
