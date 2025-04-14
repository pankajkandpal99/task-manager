/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import {
  CategoryGamesContent,
  Game,
} from "../components/admin/Home/category-games/CategoryGamesTypes";
import { defaultCategoryGamesContent } from "../components/admin/Home/category-games/categoryGamesDefaults";

interface CategoryGamesContextType {
  categoryGames: CategoryGamesContent;
  setCategoryGames: (data: CategoryGamesContent) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  filteredGames: Game[];
}

const CategoryGamesContext = createContext<
  CategoryGamesContextType | undefined
>(undefined);

export const CategoryGamesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeCategory, setActiveCategory] = useState("popular");
  const [categoryGames, setCategoryGames] = useState<CategoryGamesContent>(
    defaultCategoryGamesContent
  );

  // Filter games based on active category
  const filteredGames =
    activeCategory === "popular"
      ? categoryGames.games.filter((game) => game.tags.includes("popular"))
      : categoryGames.games.filter((game) =>
          game.tags.includes(activeCategory.toLowerCase())
        );

  return (
    <CategoryGamesContext.Provider
      value={{
        categoryGames,
        setCategoryGames,
        activeCategory,
        setActiveCategory,
        filteredGames,
      }}
    >
      {children}
    </CategoryGamesContext.Provider>
  );
};

export const useCategoryGames = () => {
  const context = useContext(CategoryGamesContext);
  if (!context) {
    throw new Error(
      "useFeaturedGames must be used within a CategoryGamesProvider"
    );
  }
  return context;
};
