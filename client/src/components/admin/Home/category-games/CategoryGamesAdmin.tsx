/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import CategoryGamesForm from "./CategoryGamesForm";
import CategoryGamesPreview from "./CategoryGamesPreview";
import { CategoryGamesContent } from "./CategoryGamesTypes";
import { Save } from "lucide-react";
import { CategoryGamesFormValues } from "../../../../schema/admin/CategoryGamesSchema";
import { toast } from "sonner";
import { useCategoryGames } from "../../../../contexts/CategoryGamesContext";
import { defaultCategoryGamesContent } from "./categoryGamesDefaults";
import { CategoryGameService } from "../../../../services/admin/category-game.service";

const CategoryGamesAdmin: React.FC = () => {
  const { categoryGames, setCategoryGames } = useCategoryGames();
  const [previewMode, setPreviewMode] = useState(false);

  const handleSubmit = async (values: CategoryGamesFormValues) => {
    try {
      const savedData = await CategoryGameService.postCategoryGames(values);

      const updatedContent: CategoryGamesContent = {
        ...savedData.data,
      };

      setCategoryGames(updatedContent);
      toast.success("Category games saved successfully!");
    } catch (error: any) {
      console.error("Error saving category games:", error);
      toast.error("Failed to save category games");
    }
  };

  const saveChanges = (content?: CategoryGamesContent) => {
    const dataToSave = content || categoryGames;
    console.log("Saving changes:", dataToSave);
    toast.success("Changes saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a101f] to-[#060d1b] text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#6FFFB4] to-[#3694FF] bg-clip-text text-transparent">
            Category Games Management
          </h1>
          <div className="flex justify-end w-full gap-2 sm:w-auto sm:gap-4">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="flex-1 sm:flex-none px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-[#6FFFB4] text-[#0a101f] font-medium hover:bg-[#5ce9a4] transition-colors text-sm sm:text-base"
            >
              {previewMode ? "Edit Mode" : "Preview Mode"}
            </button>
            <button
              onClick={() => saveChanges()}
              className="flex-1 sm:flex-none px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-[#3694FF] text-white font-medium hover:bg-[#2a7dd1] transition-colors flex items-center justify-center sm:justify-start gap-1 sm:gap-2 text-sm sm:text-base"
            >
              <Save className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>

        {previewMode ? (
          <div className="bg-[#0a101f] rounded-xl p-4 pt-2">
            <h2 className="text-lg sm:text-xl font-semibold">Preview</h2>
            <div className="relative rounded-xl overflow-hidden">
              <CategoryGamesPreview
                content={categoryGames || defaultCategoryGamesContent}
              />
            </div>
          </div>
        ) : (
          <CategoryGamesForm
            content={categoryGames || defaultCategoryGamesContent}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryGamesAdmin;
