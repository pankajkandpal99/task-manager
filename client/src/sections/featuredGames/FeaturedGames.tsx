import { useState } from "react";
import GameCard from "../../components/Home/gameCard/GameCard";

const FeaturedGames = () => {
  const [activeCategory, setActiveCategory] = useState("popular");

  const games = [
    {
      title: "Ludo King",
      category: "Board",
      image: "https://img.icons8.com/fluency/96/dice.png",
      players: "2,645 playing",
      prize: 5000,
      hot: true,
    },
    // Add all other games data here
  ];

  return (
    <section className="py-16 bg-[#0a101f]/90 relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold">Featured Games</h2>
            <p className="text-[#94a3b8] mt-2">
              Play our most popular games and win big
            </p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {["popular", "new", "tournaments", "action", "puzzle"].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-[#121a2a] text-[#6FFFB4] border border-[#1e293b]"
                      : "text-[#94a3b8] hover:text-white"
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              )
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game) => (
            <GameCard key={game.title} {...game} />
          ))}
        </div>

        {/* View All Button */}
      </div>
    </section>
  );
};

export default FeaturedGames;
