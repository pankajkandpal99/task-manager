import { motion } from "framer-motion";

interface GameCardProps {
  title: string;
  category: string;
  image: string;
  players: string;
  prize: number;
  hot?: boolean;
  playButton?: boolean;
}

const GameCard = ({
  title,
  category,
  image,
  players,
  prize,
  hot = false,
  playButton = false,
}: GameCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 0 20px rgba(111, 255, 180, 0.3)" }}
      className="bg-[#121a2a]/90 rounded-lg overflow-hidden border border-[#1e293b] hover:border-[#6FFFB4]/50 transition-all shadow-lg group relative h-full flex flex-col"
    >
      {/* Glowing effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#6FFFB4]/0 to-[#FF6FE5]/0 opacity-0 group-hover:opacity-10 transition-opacity rounded-lg"></div>

      <div className="relative w-full h-36 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#121a2a]/80 to-transparent opacity-50"></div>

        {hot && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-[#FF6FE5]/20 text-[#FF6FE5] backdrop-blur-sm px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow-lg border border-[#FF6FE5]/30">
              <span className="w-1.5 h-1.5 bg-[#FF6FE5] rounded-full animate-pulse"></span>
              Hot
            </span>
          </div>
        )}

        <div className="absolute bottom-3 left-3">
          <span className="bg-[#0a101f]/80 backdrop-blur-sm text-[#94a3b8] px-2.5 py-1 rounded-full text-xs border border-[#1e293b]/50">
            {category}
          </span>
        </div>
      </div>

      <div className="p-4 flex-grow">
        <h3 className="text-lg font-bold group-hover:text-[#6FFFB4] transition-colors line-clamp-1">
          {title}
        </h3>

        <div className="mt-3 flex justify-between items-center text-sm">
          <div className="flex items-center gap-1.5 text-[#94a3b8]">
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
          <div className="flex items-center gap-1 text-[#6FFFB4] font-medium">
            <span>₹{prize}</span>
          </div>
        </div>
      </div>

      {playButton && (
        <div className="bg-[#0a101f]/80 py-3 px-6 border-t border-[#1e293b]/50 mt-auto">
          <button className="w-full text-white/90 hover:text-white font-medium text-sm flex items-center justify-center gap-1.5 group-hover:text-[#6FFFB4] transition-colors">
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
      )}
    </motion.div>
  );
};

export default GameCard;
