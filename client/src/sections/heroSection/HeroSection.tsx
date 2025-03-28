import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const backgroundImages = [
  "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80", // Ludo
  "https://images.unsplash.com/photo-1543092587-d8b8feaf4a1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80", // Chess
  "https://images.unsplash.com/photo-1612030001893-5b9d5b3b5b1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80", // Poker
  "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80", // Mobile gaming
];

const HeroSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-screen h-screen overflow-hidden flex items-center justify-center -mx-[calc(50vw-50%)] relative">
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
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
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 text-center px-4">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Play Exciting Games
        </motion.h1>

        <motion.p
          className="text-xl text-white/80 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Join thousands of players in our skill-based gaming tournaments
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Link to="/games">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(111, 255, 180, 0.7)",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#6FFFB4] to-[#3694FF] text-[#0a101f] px-10 py-4 rounded-full font-bold shadow-xl flex items-center gap-3 text-xl mx-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-pulse"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Play Games Now
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

// import React from "react";
// import HeroContent from "./heroContent/HeroContent";
// import TournamentCard from "../../components/Home/tournamentsCard/TournamentCard";
// import FeatureCard from "../../components/Home/featureCard/FeatureCard";

// const HeroSection: React.FC = () => {
//   return (
//     <section className="relative pt-8 pb-32">
//       <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
//         <div className="grid md:grid-cols-2 gap-8 items-center">
//           <HeroContent />
//           <TournamentCard />
//         </div>

//         <FeatureCard />
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
