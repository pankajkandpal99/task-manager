import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card, CardFooter, CardHeader } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Pagination } from "../components/general/Pagination";
import { Button } from "../components/ui/button";
import { SearchInput } from "../components/general/Search";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchAllGames } from "../features/game/game.slice";
import {
  Loader2,
  Star,
  Sparkles,
  Users,
  GamepadIcon,
  Play,
} from "lucide-react";

const Games = () => {
  const dispatch = useAppDispatch();
  const { games, loading, error } = useAppSelector((state) => state.game);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredGame, setHoveredGame] = useState(null);
  const gamesPerPage = 10;

  useEffect(() => {
    dispatch(fetchAllGames());
  }, [dispatch]);

  const filteredGames = games
    ? games.filter(
        (game) =>
          (selectedCategory === "All" || game.category === selectedCategory) &&
          (searchQuery === "" ||
            game.title.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
  const paginatedGames = filteredGames.slice(
    (currentPage - 1) * gamesPerPage,
    currentPage * gamesPerPage
  );

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleGameClick = (gameUrl: string) => {
    if (gameUrl) {
      window.open(gameUrl, "_blank", "noopener,noreferrer");
    }
  };

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [filteredGames.length, totalPages, currentPage]);

  const categories = games
    ? ["All", ...new Set(games.map((g) => g.category))]
    : ["All"];

  const gameCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -5,
      scale: 1.03,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="-mb-10 min-h-screen bg-gradient-to-b from-[#0a101f] to-[#1a263f] py-0 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-8 pt-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl font-bold text-white mb-2 relative inline-block"
            whileHover={{ scale: 1.02 }}
          >
            <GamepadIcon className="inline-block mr-2 text-primary w-8 h-8" />
            Arcade Zone
            <motion.span
              className="absolute -right-5 -top-2 text-yellow-400"
              animate={{
                rotate: [0, 20, 0, 20, 0],
                scale: [1, 1.2, 1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Browse our massive collection of games and find your next adventure
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <SearchInput
            placeholder="Search games..."
            onSearchChange={setSearchQuery}
            className="w-full sm:w-64"
            debounceTime={300}
          />

          <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2 w-full sm:w-auto">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange(category)}
                className={`whitespace-nowrap cursor-pointer transition-all ${
                  selectedCategory === category
                    ? "shadow-md shadow-primary/30"
                    : "hover:border-primary/50"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mb-4 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Showing {filteredGames.length}{" "}
          {filteredGames.length === 1 ? "game" : "games"}
          {selectedCategory !== "All" && ` in "${selectedCategory}"`}
          {searchQuery && ` matching "${searchQuery}"`}.
        </motion.div>

        {loading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
            <span className="text-muted-foreground">Loading your games...</span>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 mb-2">{error}</p>
            <Button
              variant="outline"
              onClick={() => dispatch(fetchAllGames())}
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <>
            {paginatedGames.length > 0 ? (
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
              >
                {paginatedGames.map((game, index) => (
                  <motion.div
                    key={game.id || game._id}
                    custom={index}
                    variants={gameCardVariants}
                    whileHover="hover"
                    onClick={() => handleGameClick(game.gameUrl)}
                    className="cursor-pointer"
                    title={`Play ${game.title}`}
                    onMouseEnter={() => setHoveredGame(game.id || game._id)}
                    onMouseLeave={() => setHoveredGame(null)}
                  >
                    <Card className="overflow-hidden border-border bg-card/90 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 cursor-pointer rounded-lg shadow-lg">
                      {/* Shorter aspect ratio for thumbnail */}
                      <CardHeader className="relative p-0 aspect-video overflow-hidden">
                        <motion.img
                          src={game.thumbnail?.publicUrl || game.thumbnail}
                          alt={game.title}
                          className="w-full h-full object-cover transition-transform duration-500"
                          animate={
                            hoveredGame === (game.id || game._id)
                              ? { scale: 1.1 }
                              : { scale: 1 }
                          }
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://placehold.co/400x225/1a1a2e/ffffff?text=Game";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>

                        {/* Game badges */}
                        <div className="absolute top-2 right-2 flex flex-col justify-center items-end gap-1 z-10">
                          {game.isNew && (
                            <Badge
                              variant="secondary"
                              className="text-xs font-medium bg-green-500 text-white px-2 py-0.5"
                            >
                              <Sparkles className="w-3 h-3 mr-1" />
                              New
                            </Badge>
                          )}
                          {game.isFeatured && (
                            <Badge
                              variant="destructive"
                              className="text-xs font-medium bg-amber-500 text-black px-2 py-0.5"
                            >
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>

                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="cursor-pointer bg-primary hover:bg-primary/90 text-white rounded-full w-12 h-12 flex items-center justify-center"
                          >
                            <Play className="w-6 h-6 fill-current" />
                          </Button>
                        </div>

                        {/* Game title overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent">
                          <h3 className="font-medium text-white text-sm sm:text-base truncate">
                            {game.title}
                          </h3>
                        </div>
                      </CardHeader>

                      {/* Game info footer */}
                      <CardFooter className="px-3 py-0 flex justify-between items-center bg-card">
                        <Badge
                          variant="outline"
                          className="text-xs bg-primary/10 text-primary border-primary/30"
                        >
                          {game.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {(game.players || 0).toLocaleString()}
                        </span>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="flex flex-col items-center justify-center py-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-muted-foreground text-center mb-6">
                  <GamepadIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">
                    No games found matching your criteria
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="mt-2"
                >
                  Clear filters
                </Button>
              </motion.div>
            )}

            {filteredGames.length > 0 && totalPages > 0 && (
              <motion.div
                className="mt-10 pb-6 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Games;
