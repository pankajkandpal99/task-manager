import React from "react";
import { CategoryGamesLayout } from "../../../../layouts/categoryGamesLayout";
import { CategoryGamesContent } from "./CategoryGamesTypes";

const CategoryGamesPreview: React.FC<{ content: CategoryGamesContent }> = ({
  content,
}) => {
  const [activeCategory, setActiveCategory] = React.useState("popular");

  return (
    <CategoryGamesLayout
      sectionTitle={content.sectionTitle}
      sectionDescription={content.sectionDescription}
      categories={content.categories}
      games={content.games}
      viewAllButtonText={content.viewAllButtonText}
      activeCategory={activeCategory}
      setActiveCategory={setActiveCategory}
      showAllGames={false}
    />
  );
};

export default CategoryGamesPreview;
