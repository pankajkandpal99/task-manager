import HeroSection from "../../../../sections/heroSection/HeroSection";
import { HeroSectionContent } from "./HeroSectionTypes";

interface HeroSectionPreviewProps {
  content: HeroSectionContent;
}

const HeroSectionPreview: React.FC<HeroSectionPreviewProps> = ({ content }) => {
  return (
    <div className="w-full h-full">
      <HeroSection content={content} isPreview={true} />
    </div>
  );
};

export default HeroSectionPreview;
