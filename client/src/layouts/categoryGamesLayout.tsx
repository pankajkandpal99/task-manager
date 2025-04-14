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
      className={`px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
        activeCategory === name.toLowerCase()
          ? "bg-[#121a2a] text-[#6FFFB4] border border-[#1e293b]"
          : "text-[#94a3b8] hover:text-white"
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

  // Adjust number of games to show based on screen size
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

      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 sm:mb-8 md:mb-10 gap-3 md:gap-4">
          <div className="flex-1 min-w-0 mb-4 md:mb-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight break-words">
              {sectionTitle}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#94a3b8] mt-1 sm:mt-2 break-words">
              {sectionDescription}
            </p>
          </div>

          <div className="w-full md:w-auto">
            <div className="relative">
              <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-hide no-scrollbar">
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

        <div className="relative">
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
              {gamesToShow.map((game) => (
                <div key={game.id} className="w-full pt-2">
                  <GameCard
                    title={game.title}
                    category={game.category}
                    image={game.image}
                    players={game.players}
                    prize={game.prize}
                    hot={game.hot}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6 sm:mt-8 md:mt-10 lg:mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <div className="relative bg-[#121a2a] hover:bg-[#192338] border border-[#1e293b] hover:border-[#6FFFB4]/30 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg font-medium transition-all text-xs sm:text-sm md:text-base text-[#94a3b8] hover:text-white flex items-center gap-2">
              <span>{viewAllButtonText}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform"
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
