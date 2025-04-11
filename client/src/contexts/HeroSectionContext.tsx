import { createContext, useContext, useEffect, useState } from "react";
import { HeroSectionContent } from "../components/admin/Home/hero-section";
import { HeroSectionService } from "../services/admin/hero-section.service";
import { getFullImageUrl } from "../utils/imageUtils";

interface HeroSectionContextType {
  heroData: HeroSectionContent | null;
  setHeroData: (data: HeroSectionContent) => void;
  loading: boolean;
  error: string | null;
}

const HeroSectionContext = createContext<HeroSectionContextType | undefined>(
  undefined
);

export const HeroSectionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [heroData, setHeroData] = useState<HeroSectionContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  const updateHeroData = (data: HeroSectionContent) => {
    setHeroData(data);
  };

  const fetchHeroData = async () => {
    setLoading(true);
    try {
      const response = await HeroSectionService.getHeroSection();
      const processedData = {
        ...response.data,
        backgroundImages: response.data.backgroundImages.map((img: string) =>
          getFullImageUrl(img)
        ),
      };

      setHeroData(processedData);
    } catch (error) {
      setError("Failed to fetch hero section data");
      console.error(error);
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  };

  useEffect(() => {
    if (!initialized) {
      fetchHeroData();
    }
  }, [initialized]);

  return (
    <HeroSectionContext.Provider
      value={{
        heroData,
        setHeroData: updateHeroData,
        loading,
        error,
      }}
    >
      {children}
    </HeroSectionContext.Provider>
  );
};

export const useHeroSection = () => {
  const context = useContext(HeroSectionContext);
  if (context === undefined) {
    throw new Error("useHeroSection must be used within a HeroSectionProvider");
  }
  return context;
};
