/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import HeroSectionForm from "./HeroSectionForm";
import HeroSectionPreview from "./HeroSectionPreview";
import { HeroSectionContent } from "./HeroSectionTypes";
import { Save } from "lucide-react";
import { HeroSectionFormValues } from "../../../../schema/admin/HeroSectionSchema";
import { HeroSectionService } from "../../../../services/admin/hero-section.service";
import { toast } from "sonner";
import { getFullImageUrl } from "../../../../utils/imageUtils";
import { useHeroSection } from "../../../../contexts/HeroSectionContext";
import { defaultHeroContent } from "./heroSectionDefaults";

// mainHeading: "Play Exciting Games",
//     subHeading:
//       "Join thousands of players in our skill-based gaming tournaments",
//     buttonText: "Play Games Now",
//     buttonLink: "/games",
//     backgroundImages: [],
//     scrollingTexts: [
//       "🏆 Win Daily Prizes up to ₹50,000 • Instant Withdrawals • 24/7 Support",
//       "💰 Get a Chance to Win Bumper Prizes Worth ₹5 Lakhs • Play Anytime, Anywhere",
//       "🎮 Play Skill-Based Games & Earn Real Money • Refer Friends & Get Bonus Cash",
//       "🏅 Compete Against Top Players Across India • Daily Tournaments • Low Entry Fees",
//     ],

const HeroSectionAdmin: React.FC = () => {
  const { heroData, setHeroData } = useHeroSection();
  const [previewMode, setPreviewMode] = useState(false);

  const handleSubmit = async (values: HeroSectionFormValues) => {
    try {
      const savedData = await HeroSectionService.postHeroSection(values);

      const updatedContent: HeroSectionContent = {
        ...savedData.data,
        backgroundImages: savedData.data.backgroundImages.map(getFullImageUrl),
      };

      setHeroData(updatedContent);
      // saveChanges(updatedContent);
      toast.success("Hero section saved successfully!");
    } catch (error: any) {
      console.error("Error saving hero section:", error);
      toast.error("Failed to save hero section");
    }
  };

  const saveChanges = (content?: HeroSectionContent) => {
    // Use the passed content if available, otherwise use the state
    const dataToSave = content || heroData;
    console.log("Saving changes:", dataToSave);
    // Here you would typically make an API call to save the changes
    toast.success("Changes saved successfully!");
  };

  console.log("hero data : ", heroData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a101f] to-[#060d1b] text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#6FFFB4] to-[#3694FF] bg-clip-text text-transparent">
            Hero Section Management
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
          <div className="bg-[#0a101f] rounded-xl p-4 pt-0 sm:p-6 sm:pt-0">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Preview</h2>
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden border border-[#1e293b]">
              <HeroSectionPreview content={heroData || defaultHeroContent} />
            </div>
          </div>
        ) : (
          <HeroSectionForm
            content={heroData || defaultHeroContent}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default HeroSectionAdmin;
