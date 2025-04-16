import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Pagination } from "../components/general/Pagination";
import { Button } from "../components/ui/button";
import { SearchInput } from "../components/general/Search";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchAllGames } from "../features/game/game.slice";
import { Loader2 } from "lucide-react";

const Games = () => {
  const dispatch = useAppDispatch();
  const { games, loading, error } = useAppSelector((state) => state.game);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a101f] to-[#1a263f] py-0 lg:py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            All Games
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse our massive collection of games and find your next adventure
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
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
                className="whitespace-nowrap cursor-pointer"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading games...</span>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500">{error}</p>
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
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {filteredGames.length}{" "}
              {filteredGames.length === 1 ? "game" : "games"}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </div>

            {paginatedGames.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                {paginatedGames.map((game) => (
                  <motion.div
                    key={game.id || game._id}
                    whileHover={{ y: -5, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => handleGameClick(game.gameUrl)}
                    className="cursor-pointer"
                    title={`Play ${game.title}`}
                  >
                    <Card className="h-full overflow-hidden border-border hover:border-primary/30 transition-all cursor-pointer">
                      <CardHeader className="relative p-0 aspect-square">
                        <img
                          src={game.thumbnail?.publicUrl || game.thumbnail}
                          alt={game.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://placehold.co/300x300/gray/white?text=Game";
                          }}
                        />
                        <div className="absolute top-2 right-2 flex flex-col justify-center items-end gap-1">
                          {game.isNew && (
                            <Badge variant="secondary" className="text-xs">
                              New
                            </Badge>
                          )}
                          {game.isFeatured && (
                            <Badge variant="destructive" className="text-xs">
                              Featured
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="px-3 py-0">
                        <h3 className="font-medium truncate text-sm">
                          {game.title}
                        </h3>
                      </CardContent>
                      <CardFooter className="px-3 py-0 flex justify-between items-center">
                        <Badge variant="outline" className="text-xs">
                          {game.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {(game.players || 0).toLocaleString()} players
                        </span>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground text-lg">
                  No games found matching your criteria
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="mt-4"
                >
                  Clear filters
                </Button>
              </div>
            )}

            {filteredGames.length > 0 && totalPages > 0 && (
              <div className="my-10 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Games;
