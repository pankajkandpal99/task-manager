import { motion } from "framer-motion";
import GameCard from "../../components/Home/gameCard/GameCard";
import { useState } from "react";

interface CategoryButtonProps {
  name: string;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategoryButton = ({ name, activeCategory, setActiveCategory }: CategoryButtonProps) => {
  return (
    <button
      onClick={() => setActiveCategory(name.toLowerCase())}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        activeCategory === name.toLowerCase()
          ? "bg-[#121a2a] text-[#6FFFB4] border border-[#1e293b]"
          : "text-[#94a3b8] hover:text-white"
      }`}
    >
      {name}
    </button>
  );
};

const FeaturedGames = () => {
  const [activeCategory, setActiveCategory] = useState("popular");

  // Categories data
  const categories = ["Popular", "New", "Tournaments", "Action", "Puzzle"];

  // Games data
  const games = [
    {
      id: 1,
      title: "Ludo King",
      category: "Board",
      image: "https://img.icons8.com/fluency/96/dice.png",
      players: "2,645 playing",
      prize: 5000,
      hot: true,
      tags: ["popular", "board", "tournaments"],
    },
    {
      id: 2,
      title: "Rummy Classic",
      category: "Card",
      image: "https://img.icons8.com/fluency/96/clubs.png",
      players: "1,854 playing",
      prize: 10000,
      hot: true,
      tags: ["popular", "card"],
    },
    {
      id: 3,
      title: "Fantasy Cricket",
      category: "Sports",
      image: "https://img.icons8.com/fluency/96/cricket-ball.png",
      players: "5,326 playing",
      prize: 25000,
      hot: false,
      tags: ["popular", "sports", "tournaments"],
    },
    {
      id: 4,
      title: "Car Race 3D",
      category: "Racing",
      image: "https://img.icons8.com/fluency/96/car.png",
      players: "942 playing",
      prize: 2000,
      hot: false,
      tags: ["racing", "action"],
    },
    {
      id: 5,
      title: "Carrom Disc",
      category: "Board",
      image: "https://img.icons8.com/fluency/96/poolside.png",
      players: "1,232 playing",
      prize: 3000,
      hot: false,
      tags: ["board", "new"],
    },
    {
      id: 6,
      title: "Bubble Shooter",
      category: "Arcade",
      image: "https://img.icons8.com/fluency/96/football2.png",
      players: "856 playing",
      prize: 1500,
      hot: false,
      tags: ["arcade", "puzzle"],
    },
    {
      id: 7,
      title: "Poker Nights",
      category: "Card",
      image: "https://img.icons8.com/fluency/96/diamonds.png",
      players: "3,421 playing",
      prize: 15000,
      hot: true,
      tags: ["popular", "card", "tournaments"],
    },
    {
      id: 8,
      title: "8 Ball Pool",
      category: "Sports",
      image: "https://img.icons8.com/fluency/96/billiard-ball.png",
      players: "2,150 playing",
      prize: 7500,
      hot: false,
      tags: ["sports", "popular"],
    },
  ];

  // Filter games based on active category
  const filteredGames =
    activeCategory === "popular"
      ? games.filter((game) => game.tags.includes("popular"))
      : games.filter((game) => game.tags.includes(activeCategory));

  return (
    <section className="py-16 bg-[#0a101f]/90 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#6FFFB4]/20 to-transparent"></div>
        <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-[#3694FF]/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold">Featured Games</h2>
            <p className="text-[#94a3b8] mt-2">
              Play our most popular games and win big
            </p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              category={game.category}
              image={game.image}
              players={game.players}
              prize={game.prize}
              hot={game.hot}
            />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <div className="relative bg-[#121a2a] hover:bg-[#192338] border border-[#1e293b] hover:border-[#6FFFB4]/30 px-6 py-3 rounded-lg font-medium transition-all text-[#94a3b8] hover:text-white flex items-center gap-2">
              <span>View All Games</span>
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

export default FeaturedGames;
