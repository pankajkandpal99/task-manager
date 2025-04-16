/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { HeroSectionContent } from "../components/admin/Home/hero-section";
import { HeroSectionService } from "../services/admin/hero-section.service";
import { getFullImageUrl } from "../utils/imageUtils";

interface HeroSectionContextType {
  heroData: HeroSectionContent;
  setHeroData: (data: HeroSectionContent) => void;
  loading: boolean;
  error: string | null;
}

const HeroSectionContext = createContext<HeroSectionContextType | undefined>(
  undefined
);

const defaultHeroContent: HeroSectionContent = {
  mainHeading: "Welcome to Our Platform",
  subHeading: "Discover amazing features and services",
  buttonText: "Get Started",
  buttonLink: "",
  backgroundImages: [
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  ],
  scrollingTexts: [
    "New features added weekly",
    "Join 10,000+ satisfied customers",
    "24/7 customer support available",
  ],
  transitionDuration: 3000,
  active: true,
};

export const HeroSectionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [heroData, setHeroData] =
    useState<HeroSectionContent>(defaultHeroContent);
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
      setError("Failed to fetch hero section data. Using default values.");
      console.error(error);
      // Keep the default values if fetch fails
      setHeroData(defaultHeroContent);
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

// /* eslint-disable react-refresh/only-export-components */
// import { createContext, useContext, useEffect, useState } from "react";
// import { HeroSectionContent } from "../components/admin/Home/hero-section";
// import { HeroSectionService } from "../services/admin/hero-section.service";
// import { getFullImageUrl } from "../utils/imageUtils";

// interface HeroSectionContextType {
//   heroData: HeroSectionContent | null;
//   setHeroData: (data: HeroSectionContent) => void;
//   loading: boolean;
//   error: string | null;
// }

// const HeroSectionContext = createContext<HeroSectionContextType | undefined>(
//   undefined
// );

// export const HeroSectionProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [heroData, setHeroData] = useState<HeroSectionContent | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [initialized, setInitialized] = useState(false);

//   const updateHeroData = (data: HeroSectionContent) => {
//     setHeroData(data);
//   };

//   const fetchHeroData = async () => {
//     setLoading(true);
//     try {
//       const response = await HeroSectionService.getHeroSection();
//       const processedData = {
//         ...response.data,
//         backgroundImages: response.data.backgroundImages.map((img: string) =>
//           getFullImageUrl(img)
//         ),
//       };

//       setHeroData(processedData);
//     } catch (error) {
//       setError("Failed to fetch hero section data");
//       console.error(error);
//     } finally {
//       setLoading(false);
//       setInitialized(true);
//     }
//   };

//   useEffect(() => {
//     if (!initialized) {
//       fetchHeroData();
//     }
//   }, [initialized]);

//   return (
//     <HeroSectionContext.Provider
//       value={{
//         heroData,
//         setHeroData: updateHeroData,
//         loading,
//         error,
//       }}
//     >
//       {children}
//     </HeroSectionContext.Provider>
//   );
// };

// export const useHeroSection = () => {
//   const context = useContext(HeroSectionContext);
//   if (context === undefined) {
//     throw new Error("useHeroSection must be used within a HeroSectionProvider");
//   }
//   return context;
// };
