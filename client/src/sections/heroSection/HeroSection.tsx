import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HeroSectionContent } from "../../components/admin/Home/hero-section";

const backgroundImages = [
  "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
  "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
  "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
];

const scrollingTexts = [
  "🏆 Win Daily Prizes up to ₹50,000 • Instant Withdrawals • 24/7 Support",
  "💰 Get a Chance to Win Bumper Prizes Worth ₹5 Lakhs • Play Anytime, Anywhere",
  "🎮 Play Skill-Based Games & Earn Real Money • Refer Friends & Get Bonus Cash",
  "🏅 Compete Against Top Players Across India • Daily Tournaments • Low Entry Fees",
];

interface HeroSectionProps {
  content?: HeroSectionContent;
  isPreview?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  content,
  isPreview = false,
}) => {
  const defaultContent = {
    mainHeading: "Play Exciting Games",
    subHeading:
      "Join thousands of players in our skill-based gaming tournaments",
    buttonText: "Play Games Now",
    buttonLink: "/games",
    backgroundImages,
    scrollingTexts,
    transitionDuration: 3000,
    active: true,
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const mergedContent = content
    ? { ...defaultContent, ...content }
    : defaultContent;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prev) => (prev + 1) % mergedContent.backgroundImages.length
      );
    }, mergedContent.transitionDuration);
    return () => clearInterval(interval);
  }, [mergedContent.transitionDuration, mergedContent.backgroundImages.length]);

  return (
    <section
      className={`w-full ${
        isPreview ? "h-auto min-h-[500px]" : "min-h-screen"
      } overflow-hidden flex justify-center relative`}
    >
      <div className="absolute inset-0 z-0">
        {mergedContent.backgroundImages.map((image, index) => (
          <motion.div
            key={image}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${image})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: index === currentImageIndex ? 0.8 : 0,
              scale: index === currentImageIndex ? 1 : 1.05,
            }}
            transition={{ duration: 1.2, ease: [0.6, 0.05, 0.5, 0.95] }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
      </div>

      <div className="relative z-10 text-center px-4 w-full flex flex-col justify-center items-center">
        <div className="w-full pt-12 md:pt-16 lg:pt-16 pb-24 md:pb-40 lg:pb-48">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 text-white drop-shadow-lg px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {mergedContent.mainHeading}
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {mergedContent.subHeading}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mb-6 md:mb-10 lg:mb-16 flex justify-center"
          >
            <Link to={mergedContent.buttonLink}>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(111, 255, 180, 0.7)",
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#6FFFB4] to-[#3694FF] text-[#0a101f] px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-full font-bold shadow-xl flex items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg lg:text-xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-pulse sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                {mergedContent.buttonText}
              </motion.button>
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-20 left-0 w-full overflow-hidden py-2 md:py-4">
          <div className="relative">
            <motion.div
              className="flex whitespace-nowrap"
              animate={{
                x: ["0%", "-100%"],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...Array(4)].map((_, loopIndex) =>
                mergedContent.scrollingTexts.map((text, index) => (
                  <div
                    key={`${loopIndex}-${index}`}
                    className="inline-flex items-center mx-2 sm:mx-4 md:mx-6"
                  >
                    <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-white/90 bg-gradient-to-r from-white/10 to-white/20 px-3 py-2 sm:px-4 md:px-6 md:py-3 rounded-full backdrop-blur-sm">
                      {text}
                    </span>
                  </div>
                ))
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
