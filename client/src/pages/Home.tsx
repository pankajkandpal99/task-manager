import AnimatedBackground from "../components/Home/backgroundElements/AnimatedBackground";
import HeroSection from "../sections/heroSection/HeroSection";
import FeaturedGames from "../sections/featuredGames/FeaturedGames";
import LiveTournaments from "../sections/liveTournaments/LiveTournaments";
import PlayerTestimonials from "../sections/testimonials/Testimonials";
import MultyCommFeatures from "../components/Home/featureCard/MultyCommFeatures";
import MultyCommFooter from "../components/Home/multyCommFooter/MultyCommFooter";

const Home = () => {
  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <AnimatedBackground />
      <HeroSection />
      <FeaturedGames />
      <LiveTournaments />
      <PlayerTestimonials />
      <MultyCommFeatures />
      <MultyCommFooter />
    </div>
  );
};

export default Home;

// // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// import React, { useState } from "react";
// import { motion } from "framer-motion";

// // Game Card Component
// const GameCard = ({ title, category, image, players, prize, hot = false }) => {
//   return (
//     <motion.div
//       whileHover={{ y: -5 }}
//       className="bg-[#2A1155]/80 rounded-xl overflow-hidden border border-purple-900/70 hover:border-[#FFD700]/50 transition-all shadow-lg group"
//     >
//       <div className="p-6">
//         <div className="flex justify-between items-start mb-4">
//           <img src={image} alt={title} className="w-12 h-12" />
//           {hot && (
//             <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs flex items-center gap-1">
//               <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
//               Hot
//             </span>
//           )}
//         </div>
//         <h3 className="text-lg font-bold group-hover:text-[#FFD700] transition-colors">
//           {title}
//         </h3>
//         <p className="text-sm text-purple-300 mb-4">{category}</p>
//         <div className="flex justify-between items-center text-sm">
//           <div className="flex items-center gap-1 text-purple-300">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               className="w-4 h-4"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
//               />
//             </svg>
//             <span>{players}</span>
//           </div>
//           <div className="text-[#FFD700]">₹{prize}</div>
//         </div>
//       </div>
//       <div className="bg-[#0D0430]/50 py-3 px-6 border-t border-purple-900/50">
//         <button className="w-full text-white/90 hover:text-white font-medium text-sm flex items-center justify-center gap-1 group-hover:text-[#FFD700] transition-colors">
//           <span>Play Now</span>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             className="w-4 h-4 group-hover:translate-x-1 transition-transform"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M9 5l7 7-7 7"
//             />
//           </svg>
//         </button>
//       </div>
//     </motion.div>
//   );
// };

// const Home = () => {
//   const [activeCategory, setActiveCategory] = useState("popular");

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#1A093C] to-[#0D0430] text-white relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-64 h-64 bg-purple-700/20 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-40 right-20 w-80 h-80 bg-blue-700/10 rounded-full blur-3xl"></div>
//         <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-pink-700/10 rounded-full blur-3xl"></div>
//       </div>

//       <nav className="sticky top-0 z-50 bg-[#1A093C]/90 backdrop-blur-md py-4 border-b border-purple-900/50">
//         <div className="container mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center">
//           <div className="flex items-center gap-2">
//             <div className="relative">
//               <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700] to-purple-600 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
//               <div className="relative bg-[#1A093C] rounded-full p-1">
//                 <img
//                   src="https://img.icons8.com/fluency/96/coins.png"
//                   className="h-10 w-10"
//                   alt="Logo"
//                 />
//               </div>
//             </div>
//             <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-purple-400">
//               MultyComm
//             </span>
//           </div>

//           <div className="hidden md:flex items-center gap-4">
//             <a
//               href="#"
//               className="text-purple-200 hover:text-white transition-colors px-3 py-2"
//             >
//               Home
//             </a>
//             <a
//               href="#"
//               className="text-purple-200 hover:text-white transition-colors px-3 py-2"
//             >
//               Games
//             </a>
//             <a
//               href="#"
//               className="text-purple-200 hover:text-white transition-colors px-3 py-2"
//             >
//               Contests
//             </a>
//             <a
//               href="#"
//               className="text-purple-200 hover:text-white transition-colors px-3 py-2"
//             >
//               Leaderboard
//             </a>
//             <a
//               href="#"
//               className="text-purple-200 hover:text-white transition-colors px-3 py-2"
//             >
//               Support
//             </a>
//           </div>

//           <div className="flex items-center gap-3 md:gap-6">
//             <div className="flex items-center gap-2 bg-gradient-to-r from-purple-900/60 to-purple-800/60 px-4 py-2 rounded-lg border border-purple-800/50 shadow-lg">
//               <div className="relative">
//                 <img
//                   src="https://img.icons8.com/fluency/48/wallet.png"
//                   className="h-6 w-6"
//                   alt="Wallet"
//                 />
//                 <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//               </div>
//               <span className="font-semibold">₹5,000</span>
//               <span className="text-xs text-green-400">+₹200</span>
//             </div>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="relative group"
//             >
//               <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FFD700] to-purple-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
//               <div className="relative bg-[#FFD700] text-[#1A093C] px-6 py-2 rounded-full font-semibold group-hover:bg-[#ffea00] transition-all">
//                 Sign Up
//               </div>
//             </motion.button>
//             <button className="md:hidden">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 className="w-6 h-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="relative pt-20 pb-32">
//         <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
//           <div className="grid md:grid-cols-2 gap-8 items-center">
//             <div className="text-left">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
//                   Play & Win <br />
//                   <span className="text-[#FFD700] drop-shadow-lg">
//                     Real Cash
//                   </span>
//                 </h1>
//                 <p className="text-xl text-purple-200 mb-8 max-w-lg">
//                   Join India's most trusted skill-based gaming platform. Use
//                   your skills to win big and withdraw instantly!
//                 </p>
//                 <div className="flex flex-wrap gap-4">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="relative group"
//                   >
//                     <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FFD700] to-purple-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
//                     <div className="relative bg-[#FFD700] text-[#1A093C] px-8 py-3 rounded-full font-semibold group-hover:bg-[#ffea00] transition-all flex items-center gap-2">
//                       <span>Start Playing</span>
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                         className="w-5 h-5"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M14 5l7 7m0 0l-7 7m7-7H3"
//                         />
//                       </svg>
//                     </div>
//                   </motion.button>
//                   <a
//                     href="#"
//                     className="inline-flex items-center gap-2 text-purple-200 hover:text-white px-4 py-3 transition-colors"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       className="w-5 h-5"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
//                       />
//                     </svg>
//                     <span>How it works</span>
//                   </a>
//                 </div>

//                 <div className="mt-10 flex items-center gap-4">
//                   <div className="flex -space-x-2">
//                     {[1, 2, 3, 4].map((img) => (
//                       <img
//                         key={img}
//                         src={`https://i.pravatar.cc/40?img=${img}`}
//                         className="w-8 h-8 rounded-full border-2 border-purple-900"
//                         alt="User"
//                       />
//                     ))}
//                   </div>
//                   <div className="text-sm">
//                     <span className="text-purple-200">Join</span>{" "}
//                     <span className="font-bold text-white">10,000+</span>{" "}
//                     <span className="text-purple-200">players today</span>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>

//             <div className="relative">
//               <div className="absolute -inset-4 bg-gradient-to-tr from-purple-600/30 to-blue-600/20 rounded-2xl blur-xl"></div>
//               <div className="relative bg-gradient-to-tr from-purple-900/70 to-[#1A093C]/80 rounded-2xl p-6 border border-purple-800/30 shadow-xl">
//                 <div className="flex justify-between items-center mb-6">
//                   <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm flex items-center gap-1">
//                     <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//                     <span>Live</span>
//                   </div>
//                   <div className="text-sm text-purple-300">
//                     456 players online
//                   </div>
//                 </div>

//                 <h3 className="text-2xl font-bold mb-2">Mega Tournament</h3>
//                 <p className="text-purple-300 mb-4">
//                   Win up to ₹100,000 in prizes
//                 </p>

//                 <div className="grid grid-cols-2 gap-4 mb-6">
//                   <div className="bg-white/5 rounded-lg p-3">
//                     <p className="text-xs text-purple-300">Prize Pool</p>
//                     <p className="text-lg font-bold text-[#FFD700]">₹100,000</p>
//                   </div>
//                   <div className="bg-white/5 rounded-lg p-3">
//                     <p className="text-xs text-purple-300">Entry Fee</p>
//                     <p className="text-lg font-bold">₹99</p>
//                   </div>
//                   <div className="bg-white/5 rounded-lg p-3">
//                     <p className="text-xs text-purple-300">Players</p>
//                     <p className="text-lg font-bold">762/1000</p>
//                   </div>
//                   <div className="bg-white/5 rounded-lg p-3">
//                     <p className="text-xs text-purple-300">Starts In</p>
//                     <p className="text-lg font-bold text-red-400">01:24:36</p>
//                   </div>
//                 </div>

//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="w-full bg-gradient-to-r from-[#FFD700] to-yellow-500 text-[#1A093C] py-3 rounded-lg font-semibold transition-all"
//                 >
//                   Join Tournament
//                 </motion.button>
//               </div>
//             </div>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-20">
//             <div className="bg-white/5 p-6 rounded-2xl border border-purple-900/50 backdrop-blur-sm shadow-lg">
//               <div className="text-4xl mb-4">🏆</div>
//               <h3 className="text-xl font-bold mb-2">Daily Contests</h3>
//               <p className="text-purple-300">
//                 Join tournaments with big prize pools
//               </p>
//             </div>

//             <div className="bg-white/5 p-6 rounded-2xl border border-purple-900/50 backdrop-blur-sm shadow-lg relative overflow-hidden group">
//               <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-transparent group-hover:opacity-80 transition-opacity"></div>
//               <div className="relative">
//                 <div className="text-4xl mb-4">💸</div>
//                 <h3 className="text-xl font-bold mb-2">Instant Withdrawal</h3>
//                 <p className="text-purple-300">
//                   Get your winnings in 2 minutes
//                 </p>
//               </div>
//             </div>

//             <div className="bg-white/5 p-6 rounded-2xl border border-purple-900/50 backdrop-blur-sm shadow-lg">
//               <div className="text-4xl mb-4">🔒</div>
//               <h3 className="text-xl font-bold mb-2">Secure & Safe</h3>
//               <p className="text-purple-300">100% RNG certified games</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Featured Games */}
//       <section className="py-16 bg-[#1A093C]/80">
//         <div className="container mx-auto px-4 md:px-6 lg:px-8">
//           <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
//             <div>
//               <h2 className="text-3xl font-bold">Featured Games</h2>
//               <p className="text-purple-300 mt-2">
//                 Play our most popular games and win big
//               </p>
//             </div>
//             <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
//               <button
//                 onClick={() => setActiveCategory("popular")}
//                 className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
//                   activeCategory === "popular"
//                     ? "bg-[#FFD700] text-[#1A093C] font-semibold"
//                     : "bg-white/10 text-purple-200 hover:bg-white/15"
//                 }`}
//               >
//                 Popular
//               </button>
//               <button
//                 onClick={() => setActiveCategory("quiz")}
//                 className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
//                   activeCategory === "quiz"
//                     ? "bg-[#FFD700] text-[#1A093C] font-semibold"
//                     : "bg-white/10 text-purple-200 hover:bg-white/15"
//                 }`}
//               >
//                 Quiz
//               </button>
//               <button
//                 onClick={() => setActiveCategory("card")}
//                 className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
//                   activeCategory === "card"
//                     ? "bg-[#FFD700] text-[#1A093C] font-semibold"
//                     : "bg-white/10 text-purple-200 hover:bg-white/15"
//                 }`}
//               >
//                 Card Games
//               </button>
//               <button
//                 onClick={() => setActiveCategory("arcade")}
//                 className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
//                   activeCategory === "arcade"
//                     ? "bg-[#FFD700] text-[#1A093C] font-semibold"
//                     : "bg-white/10 text-purple-200 hover:bg-white/15"
//                 }`}
//               >
//                 Arcade
//               </button>
//               <button
//                 onClick={() => setActiveCategory("board")}
//                 className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
//                   activeCategory === "board"
//                     ? "bg-[#FFD700] text-[#1A093C] font-semibold"
//                     : "bg-white/10 text-purple-200 hover:bg-white/15"
//                 }`}
//               >
//                 Board Games
//               </button>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {activeCategory === "popular" && (
//               <>
//                 <GameCard
//                   title="Ludo King"
//                   category="Board Game"
//                   image="https://img.icons8.com/color/96/ludo.png"
//                   players="12,345"
//                   prize="10,000"
//                   hot={true}
//                 />
//                 <GameCard
//                   title="Quiz Master"
//                   category="Quiz"
//                   image="https://img.icons8.com/color/96/test.png"
//                   players="8,921"
//                   prize="5,000"
//                 />
//                 <GameCard
//                   title="Teen Patti"
//                   category="Card Game"
//                   image="https://img.icons8.com/color/96/poker.png"
//                   players="9,563"
//                   prize="25,000"
//                   hot={true}
//                 />
//                 <GameCard
//                   title="Carrom"
//                   category="Board Game"
//                   image="https://img.icons8.com/color/96/carrom.png"
//                   players="7,128"
//                   prize="7,500"
//                 />
//                 <GameCard
//                   title="Fruit Slice"
//                   category="Arcade"
//                   image="https://img.icons8.com/color/96/watermelon.png"
//                   players="5,932"
//                   prize="3,000"
//                 />
//                 <GameCard
//                   title="Rummy"
//                   category="Card Game"
//                   image="https://img.icons8.com/color/96/playing-cards.png"
//                   players="11,245"
//                   prize="20,000"
//                   hot={true}
//                 />
//                 <GameCard
//                   title="Snakes & Ladders"
//                   category="Board Game"
//                   image="https://img.icons8.com/color/96/snake.png"
//                   players="6,542"
//                   prize="5,000"
//                 />
//                 <GameCard
//                   title="Word Puzzle"
//                   category="Quiz"
//                   image="https://img.icons8.com/color/96/word.png"
//                   players="4,827"
//                   prize="2,500"
//                 />
//               </>
//             )}

//             {activeCategory === "quiz" && (
//               <>
//                 <GameCard
//                   title="Quiz Master"
//                   category="General Knowledge"
//                   image="https://img.icons8.com/color/96/test.png"
//                   players="8,921"
//                   prize="5,000"
//                   hot={true}
//                 />
//                 <GameCard
//                   title="Word Puzzle"
//                   category="Vocabulary"
//                   image="https://img.icons8.com/color/96/word.png"
//                   players="4,827"
//                   prize="2,500"
//                 />
//                 <GameCard
//                   title="Bollywood Quiz"
//                   category="Entertainment"
//                   image="https://img.icons8.com/color/96/movie.png"
//                   players="6,234"
//                   prize="7,500"
//                 />
//                 <GameCard
//                   title="Sports Trivia"
//                   category="Sports"
//                   image="https://img.icons8.com/color/96/football2.png"
//                   players="5,123"
//                   prize="10,000"
//                   hot={true}
//                 />
//               </>
//             )}

//             {activeCategory === "card" && (
//               <>
//                 <GameCard
//                   title="Teen Patti"
//                   category="Card Game"
//                   image="https://img.icons8.com/color/96/poker.png"
//                   players="9,563"
//                   prize="25,000"
//                   hot={true}
//                 />
//                 <GameCard
//                   title="Rummy"
//                   category="Card Game"
//                   image="https://img.icons8.com/color/96/playing-cards.png"
//                   players="11,245"
//                   prize="20,000"
//                   hot={true}
//                 />
//                 <GameCard
//                   title="Bluff Master"
//                   category="Card Game"
//                   image="https://img.icons8.com/color/96/joker-dc.png"
//                   players="7,845"
//                   prize="15,000"
//                 />
//                 <GameCard
//                   title="Solitaire Pro"
//                   category="Card Game"
//                   image="https://img.icons8.com/color/96/solitaire.png"
//                   players="4,523"
//                   prize="5,000"
//                 />
//               </>
//             )}

//             {activeCategory === "arcade" && (
//               <>
//                 <GameCard
//                   title="Fruit Slice"
//                   category="Arcade"
//                   image="https://img.icons8.com/color/96/watermelon.png"
//                   players="5,932"
//                   prize="3,000"
//                 />
//                 <GameCard
//                   title="Bubble Shooter"
//                   category="Arcade"
//                   image="https://img.icons8.com/color/96/bubble.png"
//                   players="6,127"
//                   prize="4,000"
//                   hot={true}
//                 />
//                 <GameCard
//                   title="Car Racing"
//                   category="Arcade"
//                   image="https://img.icons8.com/color/96/f1-race-car.png"
//                   players="7,234"
//                   prize="12,000"
//                   hot={true}
//                 />
//                 <GameCard
//                   title="Space Blaster"
//                   category="Arcade"
//                   image="https://img.icons8.com/color/96/asteroid.png"
//                   players="3,845"
//                   prize="2,500"
//                 />
//               </>
//             )}

//             {activeCategory === "board" && (
//               <>
//                 <GameCard
//                   title="Ludo King"
//                   category="Board Game"
//                   image="https://img.icons8.com/color/96/ludo.png"
//                   players="12,345"
//                   prize="10,000"
//                   hot={true}
//                 />
//                 <GameCard
//                   title="Carrom"
//                   category="Board Game"
//                   image="https://img.icons8.com/color/96/carrom.png"
//                   players="7,128"
//                   prize="7,500"
//                 />
//                 <GameCard
//                   title="Snakes & Ladders"
//                   category="Board Game"
//                   image="https://img.icons8.com/color/96/snake.png"
//                   players="6,542"
//                   prize="5,000"
//                 />
//                 <GameCard
//                   title="Chess Pro"
//                   category="Board Game"
//                   image="https://img.icons8.com/color/96/chess.png"
//                   players="8,932"
//                   prize="15,000"
//                   hot={true}
//                 />
//               </>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Live Contests */}
//       <section className="py-16">
//         <div className="container mx-auto px-4 md:px-6 lg:px-8">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//             <div>
//               <h2 className="text-3xl font-bold">Live Contests</h2>
//               <p className="text-purple-300 mt-2">
//                 Join ongoing contests and win exciting prizes
//               </p>
//             </div>
//             <a
//               href="#"
//               className="text-[#FFD700] hover:text-yellow-400 font-semibold flex items-center gap-1 group"
//             >
//               <span>View All</span>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 className="w-4 h-4 group-hover:translate-x-1 transition-transform"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 5l7 7-7 7"
//                 />
//               </svg>
//             </a>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[
//               {
//                 name: "Quiz Mania",
//                 category: "General Knowledge",
//                 time: 15,
//                 entry: 50,
//                 prize: 5000,
//                 players: 342,
//                 maxPlayers: 500,
//               },
//               {
//                 name: "Ludo Tournament",
//                 category: "Board Game",
//                 time: 30,
//                 entry: 100,
//                 prize: 10000,
//                 players: 156,
//                 maxPlayers: 200,
//                 featured: true,
//               },
//               {
//                 name: "Teen Patti League",
//                 category: "Card Game",
//                 time: 45,
//                 entry: 200,
//                 prize: 25000,
//                 players: 89,
//                 maxPlayers: 100,
//               },
//               {
//                 name: "Rummy Masters",
//                 category: "Card Game",
//                 time: 60,
//                 entry: 150,
//                 prize: 15000,
//                 players: 76,
//                 maxPlayers: 100,
//               },
//               {
//                 name: "Word Challenge",
//                 category: "Quiz",
//                 time: 20,
//                 entry: 75,
//                 prize: 7500,
//                 players: 220,
//                 maxPlayers: 300,
//               },
//               {
//                 name: "Cricket Quiz",
//                 category: "Sports",
//                 time: 25,
//                 entry: 99,
//                 prize: 9900,
//                 players: 178,
//                 maxPlayers: 200,
//                 featured: true,
//               },
//             ].map((contest, index) => (
//               <div
//                 key={index}
//                 className={`relative overflow-hidden ${
//                   contest.featured
//                     ? "bg-gradient-to-br from-[#2A1155]/80 to-[#1A093C] border-[#FFD700]/30"
//                     : "bg-[#2A1155]/80"
//                 } rounded-xl p-6 border border-purple-900/70 hover:border-[#FFD700]/70 transition-all shadow-lg group`}
//               >
//                 {contest.featured && (
//                   <div className="absolute top-0 right-0">
//                     <div className="bg-[#FFD700] text-[#1A093C] px-4 py-1 rounded-bl-lg font-semibold text-sm">
//                       Featured
//                     </div>
//                   </div>
//                 )}

//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h3 className="text-xl font-bold group-hover:text-[#FFD700] transition-colors">
//                       {contest.name}
//                     </h3>
//                     <p className="text-purple-300">{contest.category}</p>
//                   </div>
//                   <span
//                     className={`${
//                       contest.time < 30
//                         ? "bg-green-500/20 text-green-400"
//                         : "bg-[#FFD700]/20 text-[#FFD700]"
//                     } px-3 py-1 rounded-full text-sm flex items-center gap-1`}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       className="w-4 h-4"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
//                       />
//                     </svg>
//                     {contest.time} Min
//                   </span>
//                 </div>

//                 <div className="flex justify-between items-center mb-4">
//                   <div>
//                     <p className="text-sm text-purple-300">Entry Fee</p>
//                     <p className="text-lg font-bold">₹{contest.entry}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-purple-300">Prize Pool</p>
//                     <p className="text-lg font-bold text-[#FFD700]">
//                       ₹{contest.prize.toLocaleString()}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <div className="flex justify-between text-sm mb-1">
//                     <span className="text-purple-300">Players</span>
//                     <span className="text-purple-200">
//                       {contest.players}/{contest.maxPlayers}
//                     </span>
//                   </div>
//                   <div className="w-full bg-purple-900/30 rounded-full h-2">
//                     <div
//                       className="bg-gradient-to-r from-[#FFD700] to-yellow-500 h-2 rounded-full"
//                       style={{
//                         width: `${
//                           (contest.players / contest.maxPlayers) * 100
//                         }%`,
//                       }}
//                     ></div>
//                   </div>
//                 </div>

//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className={`w-full ${
//                     contest.featured
//                       ? "bg-gradient-to-r from-[#FFD700] to-yellow-500"
//                       : "bg-[#FFD700]"
//                   } hover:bg-[#ffea00] text-[#1A093C] py-3 rounded-lg font-semibold transition-all flex justify-center items-center gap-2`}
//                 >
//                   <span>Join Now</span>
//                   {contest.featured && (
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       className="w-5 h-5"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M13 5l7 7-7 7M5 5l7 7-7 7"
//                       />
//                     </svg>
//                   )}
//                 </motion.button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="py-16 bg-[#1A093C]/90 relative overflow-hidden">
//         <div className="absolute inset-0 pointer-events-none">
//           <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-700/10 rounded-full blur-3xl"></div>
//           <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-700/10 rounded-full blur-3xl"></div>
//         </div>

//         <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4">How It Works</h2>
//             <p className="text-purple-300 max-w-2xl mx-auto">
//               Join thousands of players who are already winning on MultyComm
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto relative">
//             <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-600/50 to-transparent hidden md:block"></div>

//             {[
//               {
//                 icon: "📱",
//                 title: "Sign Up",
//                 description: "Create your account in less than 30 seconds",
//               },
//               {
//                 icon: "🎮",
//                 title: "Play Games",
//                 description:
//                   "Choose from our wide variety of skill-based games",
//               },
//               {
//                 icon: "💰",
//                 title: "Win & Withdraw",
//                 description:
//                   "Win real cash and withdraw instantly to your bank account",
//               },
//             ].map((step, index) => (
//               <div key={index} className="flex flex-col items-center relative">
//                 <div className="relative">
//                   <div className="absolute -inset-3 bg-gradient-to-r from-purple-600 to-[#FFD700] rounded-full blur opacity-70"></div>
//                   <div className="relative w-16 h-16 bg-gradient-to-br from-[#2A1155] to-[#1A093C] rounded-full flex items-center justify-center text-3xl z-10">
//                     {step.icon}
//                   </div>
//                 </div>
//                 <h3 className="text-xl font-bold mt-6 mb-2">{step.title}</h3>
//                 <p className="text-purple-300 text-center">
//                   {step.description}
//                 </p>
//               </div>
//             ))}
//           </div>

//           <div className="mt-16 text-center">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="relative group inline-block"
//             >
//               <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FFD700] to-purple-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
//               <div className="relative bg-[#FFD700] text-[#1A093C] px-8 py-3 rounded-full font-semibold group-hover:bg-[#ffea00] transition-all">
//                 Get Started Now
//               </div>
//             </motion.button>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="py-16">
//         <div className="container mx-auto px-4 md:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4">What Our Players Say</h2>
//             <p className="text-purple-300 max-w-2xl mx-auto">
//               Don't just take our word for it, hear from our community
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[
//               {
//                 name: "Priya S.",
//                 location: "Mumbai",
//                 image: "https://i.pravatar.cc/100?img=5",
//                 quote:
//                   "I've won over ₹50,000 on MultyComm! The games are fun and the withdrawals are instant. Highly recommended!",
//                 rating: 5,
//               },
//               {
//                 name: "Rahul M.",
//                 location: "Delhi",
//                 image: "https://i.pravatar.cc/100?img=12",
//                 quote:
//                   "Best gaming platform I've used. Their customer support is amazing and the contests are always exciting.",
//                 rating: 5,
//               },
//               {
//                 name: "Anjali K.",
//                 location: "Bangalore",
//                 image: "https://i.pravatar.cc/100?img=9",
//                 quote:
//                   "I was skeptical at first, but after winning my first tournament, I was convinced. Transparent and reliable!",
//                 rating: 4,
//               },
//             ].map((testimonial, index) => (
//               <div
//                 key={index}
//                 className="bg-[#2A1155]/70 rounded-xl p-6 border border-purple-900/70 hover:border-[#FFD700]/50 transition-all shadow-lg"
//               >
//                 <div className="flex items-center gap-4 mb-4">
//                   <img
//                     src={testimonial.image}
//                     alt={testimonial.name}
//                     className="w-12 h-12 rounded-full border-2 border-purple-800"
//                   />
//                   <div>
//                     <h4 className="font-bold">{testimonial.name}</h4>
//                     <p className="text-sm text-purple-300">
//                       {testimonial.location}
//                     </p>
//                   </div>
//                 </div>
//                 <p className="text-purple-200 mb-4">"{testimonial.quote}"</p>
//                 <div className="flex items-center">
//                   {Array.from({ length: 5 }).map((_, i) => (
//                     <svg
//                       key={i}
//                       className={`w-5 h-5 ${
//                         i < testimonial.rating
//                           ? "text-[#FFD700]"
//                           : "text-purple-800"
//                       }`}
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                     </svg>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-[#0D0430] py-16 border-t border-purple-900/50">
//         <div className="container mx-auto px-4 md:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="relative">
//                   <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700] to-purple-600 rounded-full blur opacity-70"></div>
//                   <div className="relative bg-[#1A093C] rounded-full p-1">
//                     <img
//                       src="https://img.icons8.com/fluency/96/coins.png"
//                       className="h-8 w-8"
//                       alt="Logo"
//                     />
//                   </div>
//                 </div>
//                 <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-purple-400">
//                   MultyComm
//                 </span>
//               </div>
//               <p className="text-purple-300 mb-4">
//                 India's most trusted skill gaming platform. Play, compete, and
//                 win real cash prizes.
//               </p>
//               <div className="flex gap-4">
//                 <a href="#" className="text-purple-300 hover:text-white">
//                   <svg
//                     className="w-6 h-6"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                     aria-hidden="true"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </a>
//                 <a href="#" className="text-purple-300 hover:text-white">
//                   <svg
//                     className="w-6 h-6"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                     aria-hidden="true"
//                   >
//                     <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
//                   </svg>
//                 </a>
//                 <a href="#" className="text-purple-300 hover:text-white">
//                   <svg
//                     className="w-6 h-6"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                     aria-hidden="true"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </a>
//               </div>
//             </div>

//             <div>
//               <h4 className="text-lg font-bold mb-4">Quick Links</h4>
//               <ul className="space-y-2">
//                 <li>
//                   <a
//                     href="#"
//                     className="text-purple-300 hover:text-white transition-colors"
//                   >
//                     Home
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-purple-300 hover:text-white transition-colors"
//                   >
//                     Games
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-purple-300 hover:text-white transition-colors"
//                   >
//                     Contests
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-purple-300 hover:text-white transition-colors"
//                   >
//                     Leaderboard
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-purple-300 hover:text-white transition-colors"
//                   >
//                     How It Works
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="text-lg font-bold mb-4">Legal</h4>
//               <ul className="space-y-2">
//                 <li>
//                   <a
//                     href="#"
//                     className="text-purple-300 hover:text-white transition-colors"
//                   >
//                     Terms of Service
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-purple-300 hover:text-white transition-colors"
//                   >
//                     Privacy Policy
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-purple-300 hover:text-white transition-colors"
//                   >
//                     Refund Policy
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-purple-300 hover:text-white transition-colors"
//                   >
//                     Responsible Gaming
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-purple-300 hover:text-white transition-colors"
//                   >
//                     Legal Disclaimer
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="text-lg font-bold mb-4">Contact Us</h4>
//               <ul className="space-y-2">
//                 <li className="flex items-center gap-2 text-purple-300">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     className="w-5 h-5"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                     />
//                   </svg>
//                   <span>support@multycomm.com</span>
//                 </li>
//                 <li className="flex items-center gap-2 text-purple-300">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     className="w-5 h-5"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                     />
//                   </svg>
//                   <span>1800-123-4567</span>
//                 </li>
//                 <li className="mt-4">
//                   <div className="bg-white/5 p-4 rounded-lg">
//                     <h5 className="font-semibold mb-2">
//                       Subscribe to our newsletter
//                     </h5>
//                     <div className="flex">
//                       <input
//                         type="email"
//                         placeholder="Your email"
//                         className="bg-[#1A093C] border border-purple-900 px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 flex-grow"
//                       />
//                       <button className="bg-[#FFD700] text-[#1A093C] px-4 py-2 rounded-r-lg font-semibold hover:bg-[#ffea00] transition-colors">
//                         Subscribe
//                       </button>
//                     </div>
//                   </div>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="mt-12 pt-8 border-t border-purple-900/50 text-center">
//             <p className="text-purple-300">
//               © 2025 MultyComm. All rights reserved.
//             </p>
//             <div className="mt-4 flex flex-wrap justify-center gap-4">
//               <img
//                 src="https://img.icons8.com/color/48/upi.png"
//                 className="h-8"
//                 alt="UPI"
//               />
//               <img
//                 src="https://img.icons8.com/color/48/paytm.png"
//                 className="h-8"
//                 alt="Paytm"
//               />
//               <img
//                 src="https://img.icons8.com/color/48/google-pay-india.png"
//                 className="h-8"
//                 alt="GPay"
//               />
//               <img
//                 src="https://img.icons8.com/color/48/phonepe.png"
//                 className="h-8"
//                 alt="PhonePe"
//               />
//               <img
//                 src="https://img.icons8.com/color/48/visa.png"
//                 className="h-8"
//                 alt="Visa"
//               />
//               <img
//                 src="https://img.icons8.com/color/48/mastercard.png"
//                 className="h-8"
//                 alt="Mastercard"
//               />
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;

// ----------------------------------------------------------------------------------------------------------------

// import React, { useState } from "react";
// import { motion } from "framer-motion";

// // Game Categories
// const categories = [
//   { id: "trivia", name: "Knowledge Battles", icon: "🧠", color: "#00ff88" },
//   { id: "puzzle", name: "Brain Teasers", icon: "🎲", color: "#ff6b6b" },
//   { id: "math", name: "Number Wars", icon: "🔢", color: "#4dabf7" },
//   { id: "word", name: "Word Arena", icon: "📖", color: "#ffd43b" },
// ];

// const Home = () => {
//   const [activeCategory, setActiveCategory] = useState("trivia");

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
//       {/* Glowing Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
//       </div>

//       {/* Navbar */}
//       <nav className="sticky top-0 z-50 bg-gray-800/80 backdrop-blur-md border-b border-gray-700">
//         <div className="container mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center h-16">
//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <div className="absolute inset-0 bg-cyan-500 rounded-full blur"></div>
//               <span className="relative text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
//                 BrainBattles
//               </span>
//             </div>
//           </div>

//           <div className="hidden md:flex items-center gap-6">
//             {categories.map((category) => (
//               <button
//                 key={category.id}
//                 onClick={() => setActiveCategory(category.id)}
//                 className={`px-4 py-2 rounded-lg transition-all ${
//                   activeCategory === category.id
//                     ? "bg-cyan-500/20 text-cyan-400"
//                     : "hover:bg-gray-700/50 text-gray-300"
//                 }`}
//               >
//                 {category.name}
//               </button>
//             ))}
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-lg">
//               <span className="text-cyan-400">₹2,500</span>
//               <button className="text-gray-300 hover:text-cyan-400">
//                 + Add
//               </button>
//             </div>
//             <button className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded-lg text-gray-900 font-semibold transition-colors">
//               Profile
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="relative pt-20 pb-32">
//         <div className="container mx-auto px-4 md:px-6 lg:px-8">
//           <div className="max-w-4xl mx-auto text-center">
//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
//             >
//               Test Your Skills
//               <br />
//               <span className="text-cyan-400">Earn Real Rewards</span>
//             </motion.h1>
//             <p className="text-xl text-gray-300 mb-8">
//               Join India's premier skill-based gaming platform where knowledge
//               meets excitement!
//             </p>

//             <div className="flex justify-center gap-4">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-xl text-gray-900 font-semibold flex items-center gap-2"
//               >
//                 <span>Start Playing</span>
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
//                   />
//                 </svg>
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Live Tournaments */}
//       <section className="py-16">
//         <div className="container mx-auto px-4 md:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-cyan-400 mb-8">
//             Live Tournaments
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[1, 2, 3].map((item) => (
//               <div
//                 key={item}
//                 className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-500 transition-colors relative"
//               >
//                 <div className="absolute top-4 right-4 flex items-center gap-2 text-sm">
//                   <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
//                   <span className="text-green-400">Live</span>
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-100 mb-2">
//                   {["Math Masters", "Word Warriors", "Trivia Titans"][item - 1]}
//                 </h3>
//                 <div className="flex justify-between mb-4">
//                   <div>
//                     <p className="text-sm text-gray-400">Entry Fee</p>
//                     <p className="text-cyan-400">₹{item * 50}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-400">Prize Pool</p>
//                     <p className="text-cyan-400">₹{item * 5000}</p>
//                   </div>
//                 </div>
//                 <div className="h-2 bg-gray-700 rounded-full mb-4">
//                   <div
//                     className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
//                     style={{ width: `${item * 25}%` }}
//                   ></div>
//                 </div>
//                 <button className="w-full bg-cyan-500 hover:bg-cyan-600 py-2 rounded-lg text-gray-900 font-semibold transition-colors">
//                   Join Now
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Category Grid */}
//       <section className="py-16">
//         <div className="container mx-auto px-4 md:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-cyan-400 mb-8">
//             Game Categories
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {categories.map((category) => (
//               <motion.div
//                 key={category.id}
//                 whileHover={{ y: -5 }}
//                 className="group relative overflow-hidden rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors"
//               >
//                 <div
//                   className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
//                   style={{ color: category.color }}
//                 ></div>
//                 <div className="p-6 text-center">
//                   <span className="text-6xl mb-4 inline-block">
//                     {category.icon}
//                   </span>
//                   <h3 className="text-xl font-bold text-gray-100 mb-2">
//                     {category.name}
//                   </h3>
//                   <p className="text-gray-400">100+ Challenges</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Achievement System */}
//       <section className="py-16">
//         <div className="container mx-auto px-4 md:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-cyan-400 mb-8">
//             Your Progress
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="bg-gray-800 rounded-xl p-6">
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400">
//                   🏆
//                 </div>
//                 <div>
//                   <h3 className="text-gray-100 font-bold">Current Level</h3>
//                   <p className="text-cyan-400">Level 15</p>
//                 </div>
//               </div>
//               <div className="h-2 bg-gray-700 rounded-full">
//                 <div
//                   className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
//                   style={{ width: "65%" }}
//                 ></div>
//               </div>
//             </div>

//             <div className="bg-gray-800 rounded-xl p-6">
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400">
//                   💎
//                 </div>
//                 <div>
//                   <h3 className="text-gray-100 font-bold">Streak</h3>
//                   <p className="text-purple-400">7 Day Streak</p>
//                 </div>
//               </div>
//               <div className="flex gap-2">
//                 {[...Array(7)].map((_, i) => (
//                   <div
//                     key={i}
//                     className={`w-full h-2 rounded-full ${
//                       i < 5 ? "bg-purple-500" : "bg-gray-700"
//                     }`}
//                   ></div>
//                 ))}
//               </div>
//             </div>

//             <div className="bg-gray-800 rounded-xl p-6">
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center text-yellow-400">
//                   ⚡
//                 </div>
//                 <div>
//                   <h3 className="text-gray-100 font-bold">Daily Challenges</h3>
//                   <p className="text-yellow-400">3/5 Completed</p>
//                 </div>
//               </div>
//               <div className="flex gap-2">
//                 {[...Array(5)].map((_, i) => (
//                   <div
//                     key={i}
//                     className={`w-full h-2 rounded-full ${
//                       i < 3 ? "bg-yellow-500" : "bg-gray-700"
//                     }`}
//                   ></div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Learning Path */}
//       <section className="py-16 bg-gray-800/50">
//         <div className="container mx-auto px-4 md:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-cyan-400 mb-8">
//             Skill Development
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="bg-gray-700 rounded-xl p-6">
//               <h3 className="text-xl font-bold text-gray-100 mb-4">
//                 Personalized Learning
//               </h3>
//               <div className="space-y-4">
//                 {[
//                   { name: "Math Skills", progress: 75 },
//                   { name: "Vocabulary", progress: 60 },
//                   { name: "Logical Reasoning", progress: 85 },
//                 ].map((skill, index) => (
//                   <div key={index}>
//                     <div className="flex justify-between mb-2">
//                       <span className="text-gray-300">{skill.name}</span>
//                       <span className="text-cyan-400">{skill.progress}%</span>
//                     </div>
//                     <div className="h-2 bg-gray-600 rounded-full">
//                       <div
//                         className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
//                         style={{ width: `${skill.progress}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="bg-gray-700 rounded-xl p-6">
//               <h3 className="text-xl font-bold text-gray-100 mb-4">
//                 Earn Badges
//               </h3>
//               <div className="grid grid-cols-3 gap-4">
//                 {[
//                   { name: "Math Whiz", icon: "🧮", earned: true },
//                   { name: "Word Master", icon: "📚", earned: false },
//                   { name: "Logic Pro", icon: "🔍", earned: true },
//                   { name: "Speed King", icon: "⚡", earned: false },
//                   { name: "Streak Hero", icon: "🔥", earned: true },
//                   { name: "Quiz Champion", icon: "🏆", earned: false },
//                 ].map((badge, index) => (
//                   <div
//                     key={index}
//                     className={`p-4 rounded-lg text-center ${
//                       badge.earned
//                         ? "bg-cyan-500/20 border border-cyan-500/30"
//                         : "bg-gray-600/30 border border-gray-500/30"
//                     }`}
//                   >
//                     <span className="text-3xl mb-2 inline-block">
//                       {badge.icon}
//                     </span>
//                     <p className="text-sm text-gray-300">{badge.name}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;
