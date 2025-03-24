import { motion } from "framer-motion";
import TournamentCard from "../../components/Home/tournamentsCard/TournamentCard";

const LiveTournaments = () => {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold">Live Tournaments</h2>
            <p className="text-[#94a3b8] mt-2">
              Compete with other players and win big prizes
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 bg-[#FF6FE5] rounded-full animate-pulse"></div>
            <span className="text-[#FF6FE5] font-medium">Live Now</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TournamentCard />
          <TournamentCard />
          <TournamentCard />
        </div>

        <div className="flex justify-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <div className="relative bg-[#121a2a] hover:bg-[#192338] border border-[#1e293b] hover:border-[#FF6FE5]/30 px-6 py-3 rounded-lg font-medium transition-all text-[#94a3b8] hover:text-white flex items-center gap-2">
              <span>View All Tournaments</span>
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
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default LiveTournaments;
