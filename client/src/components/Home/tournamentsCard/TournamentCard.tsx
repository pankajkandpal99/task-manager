import React from "react";
import { motion } from "framer-motion";
import StatusBadge from "./statusBadge";
import TournamentStats from "./TournamentStats";

const TournamentCard: React.FC = () => {
  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-br from-[#6FFFB4]/10 to-[#3694FF]/10 rounded-xl blur-xl"></div>
      <div className="relative bg-[#121a2a]/80 rounded-xl p-6 border border-[#1e293b]/30 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <StatusBadge />
          <div className="text-sm text-[#94a3b8]">456 players online</div>
        </div>

        <h3 className="text-2xl font-bold mb-2">Mega Tournament</h3>
        <p className="text-[#94a3b8] mb-4">Win up to ₹100,000 in prizes</p>

        <TournamentStats />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-[#6FFFB4] to-[#3694FF] text-[#0a101f] py-3 rounded-lg font-semibold transition-all"
        >
          Join Tournament
        </motion.button>
      </div>
    </div>
  );
};

export default TournamentCard;
