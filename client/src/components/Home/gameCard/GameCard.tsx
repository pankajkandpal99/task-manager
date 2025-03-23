import { motion } from "framer-motion";

interface GameCardProps {
  title: string;
  category: string;
  image: string;
  players: string;
  prize: number;
  hot?: boolean;
}

const GameCard = ({
  title,
  category,
  image,
  players,
  prize,
  hot = false,
}: GameCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 0 20px rgba(111, 255, 180, 0.3)" }}
      className="bg-[#121a2a]/90 rounded-lg overflow-hidden border border-[#1e293b] hover:border-[#6FFFB4]/50 transition-all shadow-lg group relative"
    >
      {/* Glowing effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#6FFFB4]/0 to-[#FF6FE5]/0 opacity-0 group-hover:opacity-10 transition-opacity rounded-lg"></div>

      <div className="p-6 relative">
        <div className="flex justify-between items-start mb-4">
          <div className="relative">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#6FFFB4]/30 to-[#6FFFB4]/0 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img src={image} alt={title} className="w-12 h-12 relative" />
          </div>
          {hot && (
            <span className="bg-[#FF6FE5]/20 text-[#FF6FE5] px-2 py-1 rounded-full text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#FF6FE5] rounded-full animate-pulse"></span>
              Hot
            </span>
          )}
        </div>
        <h3 className="text-lg font-bold group-hover:text-[#6FFFB4] transition-colors">
          {title}
        </h3>
        <p className="text-sm text-[#94a3b8] mb-4">{category}</p>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-1 text-[#94a3b8]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>{players}</span>
          </div>
          <div className="text-[#6FFFB4]">₹{prize}</div>
        </div>
      </div>
      <div className="bg-[#0a101f]/80 py-3 px-6 border-t border-[#1e293b]/50">
        <button className="w-full text-white/90 hover:text-white font-medium text-sm flex items-center justify-center gap-1 group-hover:text-[#6FFFB4] transition-colors">
          <span>Play Now</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default GameCard;
