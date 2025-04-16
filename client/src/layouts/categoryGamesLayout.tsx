/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import GameCard from "../components/Home/gameCard/GameCard";

interface CategoryButtonProps {
  name: string;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

interface CategoryGamesLayoutProps {
  sectionTitle: string;
  sectionDescription: string;
  categories: string[];
  games: any[];
  viewAllButtonText: string;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  showAllGames?: boolean;
}

export const CategoryButton = ({
  name,
  activeCategory,
  setActiveCategory,
}: CategoryButtonProps) => {
  return (
    <button
      onClick={() => setActiveCategory(name.toLowerCase())}
      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
        activeCategory === name.toLowerCase()
          ? "bg-[#121a2a] text-[#6FFFB4] border border-[#6FFFB4]/30 shadow-[0_0_8px_-2px_#6FFFB4]"
          : "text-[#94a3b8] hover:text-white bg-[#121a2a]/50 hover:bg-[#121a2a] border border-transparent hover:border-[#1e293b]"
      }`}
    >
      {name}
    </button>
  );
};

export const CategoryGamesLayout: React.FC<CategoryGamesLayoutProps> = ({
  sectionTitle,
  sectionDescription,
  categories,
  games,
  viewAllButtonText,
  activeCategory,
  setActiveCategory,
  showAllGames = false,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredGames =
    activeCategory === "popular"
      ? games.filter((game) => game.tags.includes("popular"))
      : games.filter((game) =>
          game.tags.includes(activeCategory.toLowerCase())
        );

  const gamesToShow = showAllGames
    ? filteredGames
    : isMobile
    ? filteredGames.slice(0, 2)
    : filteredGames.slice(0, 4);

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-[#0a101f]/90 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#6FFFB4]/20 to-transparent"></div>
        <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-[#3694FF]/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="text-center mb-6 sm:mb-10 md:mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3">
            {sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#94a3b8] max-w-2xl mx-auto">
            {sectionDescription}
          </p>
        </div>

        <div className="mb-8 sm:mb-10 md:mb-12 w-full">
          <div className="flex justify-center w-full">
            <div className="flex overflow-x-auto -mb-4 scrollbar-hide mx-auto">
              <div className="flex space-x-2 sm:space-x-3 mx-auto">
                {categories.map((category) => (
                  <CategoryButton
                    key={category}
                    name={category}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {gamesToShow.map((game) => (
            <motion.div
              key={game.id}
              className="w-full"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <GameCard
                title={game.title}
                category={game.category}
                image={game.image}
                players={game.players}
                prize={game.prize}
                hot={game.hot}
              />
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-8 sm:mt-10 md:mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <div className="relative bg-gradient-to-r from-[#6FFFB4]/10 to-[#3694FF]/10 hover:from-[#6FFFB4]/20 hover:to-[#3694FF]/20 border border-[#1e293b] hover:border-[#6FFFB4]/30 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base text-white flex items-center gap-2 shadow-lg hover:shadow-[0_0_15px_-3px_#6FFFB4/30]">
              <span>{viewAllButtonText}</span>
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
