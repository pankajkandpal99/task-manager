import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedBackground from "../components/Home/backgroundElements/AnimatedBackground";
import GameCard from "../components/Home/gameCard/GameCard";
import TournamentCard from "../components/Home/tournamentsCard/TournamentCard";
import HeroSection from "../sections/heroSection/HeroSection";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("popular");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a101f] to-[#060d1b] text-white relative overflow-hidden">
      <AnimatedBackground />

      {/* Hero Section */}
      <HeroSection />
      {/* <section className="relative pt-20 pb-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  Play & Win <br />
                  <span className="text-[#6FFFB4] drop-shadow-lg">
                    Real Cash
                  </span>
                </h1>
                <p className="text-xl text-[#94a3b8] mb-8 max-w-lg">
                  Join India's most trusted skill-based gaming platform. Use
                  your skills to win big and withdraw instantly!
                </p>
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6FFFB4] to-[#3694FF] rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
                    <div className="relative bg-[#6FFFB4] text-[#0a101f] px-8 py-3 rounded-full font-semibold group-hover:bg-[#8FFFCC] transition-all flex items-center gap-2">
                      <span>Start Playing</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </motion.button>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-[#94a3b8] hover:text-white px-4 py-3 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                    <span>How it works</span>
                  </a>
                </div>

                <div className="mt-10 flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((img) => (
                      <div key={img} className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6FFFB4]/30 to-[#3694FF]/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
                        <img
                          src={`https://i.pravatar.cc/40?img=${img}`}
                          className="w-8 h-8 rounded-full border-2 border-[#121a2a] relative"
                          alt="User"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <span className="text-[#94a3b8]">Join</span>{" "}
                    <span className="font-bold text-white">10,000+</span>{" "}
                    <span className="text-[#94a3b8]">players today</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#6FFFB4]/10 to-[#3694FF]/10 rounded-xl blur-xl"></div>
              <div className="relative bg-[#121a2a]/80 rounded-xl p-6 border border-[#1e293b]/30 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <div className="bg-[#6FFFB4]/20 text-[#6FFFB4] px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <span className="w-2 h-2 bg-[#6FFFB4] rounded-full"></span>
                    <span>Live</span>
                  </div>
                  <div className="text-sm text-[#94a3b8]">
                    456 players online
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-2">Mega Tournament</h3>
                <p className="text-[#94a3b8] mb-4">
                  Win up to ₹100,000 in prizes
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#0a101f]/80 rounded-lg p-3 border border-[#1e293b]/30">
                    <p className="text-xs text-[#94a3b8]">Prize Pool</p>
                    <p className="text-lg font-bold text-[#6FFFB4]">₹100,000</p>
                  </div>
                  <div className="bg-[#0a101f]/80 rounded-lg p-3 border border-[#1e293b]/30">
                    <p className="text-xs text-[#94a3b8]">Entry Fee</p>
                    <p className="text-lg font-bold">₹99</p>
                  </div>
                  <div className="bg-[#0a101f]/80 rounded-lg p-3 border border-[#1e293b]/30">
                    <p className="text-xs text-[#94a3b8]">Players</p>
                    <p className="text-lg font-bold">762/1000</p>
                  </div>
                  <div className="bg-[#0a101f]/80 rounded-lg p-3 border border-[#1e293b]/30">
                    <p className="text-xs text-[#94a3b8]">Starts In</p>
                    <p className="text-lg font-bold text-[#FF6FE5]">01:24:36</p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[#6FFFB4] to-[#3694FF] text-[#0a101f] py-3 rounded-lg font-semibold transition-all"
                >
                  Join Tournament
                </motion.button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-20">
            <div className="bg-[#121a2a]/50 p-6 rounded-xl border border-[#1e293b]/50 backdrop-blur-sm shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#6FFFB4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-bold mb-2">Daily Contests</h3>
                <p className="text-[#94a3b8]">
                  Join tournaments with big prize pools
                </p>
              </div>
            </div>

            <div className="bg-[#121a2a]/50 p-6 rounded-xl border border-[#1e293b]/50 backdrop-blur-sm shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#6FFFB4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="text-4xl mb-4">💸</div>
                <h3 className="text-xl font-bold mb-2">Instant Withdrawal</h3>
                <p className="text-[#94a3b8]">Get your winnings in 2 minutes</p>
              </div>
            </div>

            <div className="bg-[#121a2a]/50 p-6 rounded-xl border border-[#1e293b]/50 backdrop-blur-sm shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#6FFFB4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-bold mb-2">Secure & Safe</h3>
                <p className="text-[#94a3b8]">100% RNG certified games</p>
              </div>
            </div>
          </div>
        </div>
      </section>  */}

      {/* Featured Games */}
      <section className="py-16 bg-[#0a101f]/90 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#6FFFB4]/20 to-transparent"></div>
          <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-[#3694FF]/20 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold">Featured Games</h2>
              <p className="text-[#94a3b8] mt-2">
                Play our most popular games and win big
              </p>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0"></div>

            <button
              onClick={() => setActiveCategory("popular")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === "popular"
                  ? "bg-[#121a2a] text-[#6FFFB4] border border-[#1e293b]"
                  : "text-[#94a3b8] hover:text-white"
              }`}
            >
              Popular
            </button>
            <button
              onClick={() => setActiveCategory("new")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === "new"
                  ? "bg-[#121a2a] text-[#6FFFB4] border border-[#1e293b]"
                  : "text-[#94a3b8] hover:text-white"
              }`}
            >
              New
            </button>
            <button
              onClick={() => setActiveCategory("tournaments")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === "tournaments"
                  ? "bg-[#121a2a] text-[#6FFFB4] border border-[#1e293b]"
                  : "text-[#94a3b8] hover:text-white"
              }`}
            >
              Tournaments
            </button>
            <button
              onClick={() => setActiveCategory("action")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === "action"
                  ? "bg-[#121a2a] text-[#6FFFB4] border border-[#1e293b]"
                  : "text-[#94a3b8] hover:text-white"
              }`}
            >
              Action
            </button>
            <button
              onClick={() => setActiveCategory("puzzle")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === "puzzle"
                  ? "bg-[#121a2a] text-[#6FFFB4] border border-[#1e293b]"
                  : "text-[#94a3b8] hover:text-white"
              }`}
            >
              Puzzle
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <GameCard
              title="Ludo King"
              category="Board"
              image="https://img.icons8.com/fluency/96/dice.png"
              players="2,645 playing"
              prize={5000}
              hot={true}
            />
            <GameCard
              title="Rummy Classic"
              category="Card"
              image="https://img.icons8.com/fluency/96/clubs.png"
              players="1,854 playing"
              prize={10000}
              hot={true}
            />
            <GameCard
              title="Fantasy Cricket"
              category="Sports"
              image="https://img.icons8.com/fluency/96/cricket-ball.png"
              players="5,326 playing"
              prize={25000}
            />
            <GameCard
              title="Car Race 3D"
              category="Racing"
              image="https://img.icons8.com/fluency/96/car.png"
              players="942 playing"
              prize={2000}
            />
            <GameCard
              title="Carrom Disc"
              category="Board"
              image="https://img.icons8.com/fluency/96/poolside.png"
              players="1,232 playing"
              prize={3000}
            />
            <GameCard
              title="Bubble Shooter"
              category="Arcade"
              image="https://img.icons8.com/fluency/96/football2.png"
              players="856 playing"
              prize={1500}
            />
            <GameCard
              title="Poker Nights"
              category="Card"
              image="https://img.icons8.com/fluency/96/diamonds.png"
              players="3,421 playing"
              prize={15000}
              hot={true}
            />
            <GameCard
              title="8 Ball Pool"
              category="Sports"
              image="https://img.icons8.com/fluency/96/billiard-ball.png"
              players="2,150 playing"
              prize={7500}
            />
          </div>

          <div className="flex justify-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="relative bg-[#121a2a] hover:bg-[#192338] border border-[#1e293b] hover:border-[#6FFFB4]/30 px-6 py-3 rounded-lg font-medium transition-all text-[#94a3b8] hover:text-white flex items-center gap-2">
                <span>View All Games</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Live Tournaments */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold">Live Tournaments</h2>
              <p className="text-[#94a3b8] mt-2">
                Compete with other players and win big prizes
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 bg-[#FF6FE5] rounded-full animate-pulse"></div>
              <span className="text-[#FF6FE5] font-medium">Live Now</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TournamentCard />
            <TournamentCard />
            <TournamentCard />

            {/* Tournament Card 1 */}
            {/* <div className="bg-[#121a2a]/90 rounded-lg overflow-hidden border border-[#1e293b] hover:border-[#FF6FE5]/50 transition-all shadow-lg group relative">
              <div className="absolute top-4 right-4 bg-[#FF6FE5]/20 text-[#FF6FE5] px-2 py-1 rounded-full text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-[#FF6FE5] rounded-full animate-pulse"></span>
                Live
              </div>
              <img
                src="https://img.icons8.com/fluency/96/dice.png"
                alt="Tournament"
                className="w-full h-32 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold group-hover:text-[#FF6FE5] transition-colors">
                  Ludo Megastar Tournament
                </h3>
                <p className="text-sm text-[#94a3b8] mb-4">Knockout rounds</p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-[#0a101f]/80 rounded-lg p-3 border border-[#1e293b]/30">
                    <p className="text-xs text-[#94a3b8]">Prize Pool</p>
                    <p className="text-lg font-bold text-[#FF6FE5]">₹25,000</p>
                  </div>
                  <div className="bg-[#0a101f]/80 rounded-lg p-3 border border-[#1e293b]/30">
                    <p className="text-xs text-[#94a3b8]">Entry Fee</p>
                    <p className="text-lg font-bold">₹49</p>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 text-[#94a3b8]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="text-sm text-[#94a3b8]">
                      560/1000 joined
                    </span>
                  </div>
                  <div className="text-sm text-[#FF6FE5] font-medium">
                    In Progress
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[#FF6FE5] to-[#3694FF] text-[#0a101f] py-3 rounded-lg font-semibold transition-all"
                >
                  Join Now
                </motion.button>
              </div>
            </div> */}

            {/* Tournament Card 2 */}
            {/* <div className="bg-[#121a2a]/90 rounded-lg overflow-hidden border border-[#1e293b] hover:border-[#FF6FE5]/50 transition-all shadow-lg group relative">
              <div className="absolute top-4 right-4 bg-[#FF6FE5]/20 text-[#FF6FE5] px-2 py-1 rounded-full text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-[#FF6FE5] rounded-full animate-pulse"></span>
                Live
              </div>
              <img
                src="https://img.icons8.com/fluency/96/diamonds.png"
                alt="Tournament"
                className="w-full h-32 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold group-hover:text-[#FF6FE5] transition-colors">
                  Poker Masters Cup
                </h3>
                <p className="text-sm text-[#94a3b8] mb-4">High stakes</p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-[#0a101f]/80 rounded-lg p-3 border border-[#1e293b]/30">
                    <p className="text-xs text-[#94a3b8]">Prize Pool</p>
                    <p className="text-lg font-bold text-[#FF6FE5]">₹50,000</p>
                  </div>
                  <div className="bg-[#0a101f]/80 rounded-lg p-3 border border-[#1e293b]/30">
                    <p className="text-xs text-[#94a3b8]">Entry Fee</p>
                    <p className="text-lg font-bold">₹199</p>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 text-[#94a3b8]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="text-sm text-[#94a3b8]">
                      430/500 joined
                    </span>
                  </div>
                  <div className="text-sm text-[#FF6FE5] font-medium">
                    In Progress
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[#FF6FE5] to-[#3694FF] text-[#0a101f] py-3 rounded-lg font-semibold transition-all"
                >
                  Join Now
                </motion.button>
              </div>
            </div> */}

            {/* Tournament Card 3 */}
            {/* <div className="bg-[#121a2a]/90 rounded-lg overflow-hidden border border-[#1e293b] hover:border-[#FF6FE5]/50 transition-all shadow-lg group relative">
              <div className="absolute top-4 right-4 bg-[#6FFFB4]/20 text-[#6FFFB4] px-2 py-1 rounded-full text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-[#6FFFB4] rounded-full animate-pulse"></span>
                Starting Soon
              </div>
              <img
                src="https://img.icons8.com/fluency/96/cricket-ball.png"
                alt="Tournament"
                className="w-full h-32 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold group-hover:text-[#6FFFB4] transition-colors">
                  IPL Fantasy League
                </h3>
                <p className="text-sm text-[#94a3b8] mb-4">Season tournament</p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-[#0a101f]/80 rounded-lg p-3 border border-[#1e293b]/30">
                    <p className="text-xs text-[#94a3b8]">Prize Pool</p>
                    <p className="text-lg font-bold text-[#6FFFB4]">₹100,000</p>
                  </div>
                  <div className="bg-[#0a101f]/80 rounded-lg p-3 border border-[#1e293b]/30">
                    <p className="text-xs text-[#94a3b8]">Entry Fee</p>
                    <p className="text-lg font-bold">₹299</p>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 text-[#94a3b8]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="text-sm text-[#94a3b8]">
                      820/2000 joined
                    </span>
                  </div>
                  <div className="text-sm text-[#6FFFB4] font-medium">
                    Starts in 2 hrs
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[#6FFFB4] to-[#3694FF] text-[#0a101f] py-3 rounded-lg font-semibold transition-all"
                >
                  Register Now
                </motion.button>
              </div>
            </div> */}
          </div>

          <div className="flex justify-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="relative bg-[#121a2a] hover:bg-[#192338] border border-[#1e293b] hover:border-[#FF6FE5]/30 px-6 py-3 rounded-lg font-medium transition-all text-[#94a3b8] hover:text-white flex items-center gap-2">
                <span>View All Tournaments</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-[#0a101f]/90 relative">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Player Testimonials</h2>
            <p className="text-[#94a3b8] mt-2 max-w-2xl mx-auto">
              See what our players have to say about their experience with
              MultyComm
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Testimonial 1 */}
            <div className="bg-[#121a2a]/70 rounded-lg p-6 border border-[#1e293b] shadow-lg relative backdrop-blur-sm">
              <div className="absolute -top-5 left-6">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#6FFFB4]/30 to-[#3694FF]/30 rounded-full opacity-70 blur-sm"></div>
                  <img
                    src="https://i.pravatar.cc/80?img=1"
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-[#121a2a] relative"
                  />
                </div>
              </div>
              <div className="pt-6">
                <div className="flex mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#FFD700"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="text-[#94a3b8] mb-3">
                  "I won ₹15,000 in my first week! The games are fair and
                  withdrawal process is super quick. Highly recommended!"
                </p>
                <p className="font-semibold">Raj Sharma</p>
                <p className="text-xs text-[#94a3b8]">Mumbai</p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-[#121a2a]/70 rounded-lg p-6 border border-[#1e293b] shadow-lg relative backdrop-blur-sm">
              <div className="absolute -top-5 left-6">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#6FFFB4]/30 to-[#3694FF]/30 rounded-full opacity-70 blur-sm"></div>
                  <img
                    src="https://i.pravatar.cc/80?img=5"
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-[#121a2a] relative"
                  />
                </div>
              </div>
              <div className="pt-6">
                <div className="flex mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#FFD700"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="text-[#94a3b8] mb-3">
                  "The best gaming platform I've used. Customer support is
                  excellent and the tournaments are so exciting. I play every
                  day!"
                </p>
                <p className="font-semibold">Priya Patel</p>
                <p className="text-xs text-[#94a3b8]">Delhi</p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-[#121a2a]/70 rounded-lg p-6 border border-[#1e293b] shadow-lg relative backdrop-blur-sm">
              <div className="absolute -top-5 left-6">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#6FFFB4]/30 to-[#3694FF]/30 rounded-full opacity-70 blur-sm"></div>
                  <img
                    src="https://i.pravatar.cc/80?img=3"
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-[#121a2a] relative"
                  />
                </div>
              </div>
              <div className="pt-6">
                <div className="flex mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#FFD700"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="text-[#94a3b8] mb-3">
                  "I was skeptical at first, but MultyComm proved me wrong.
                  Totally legitimate platform with instant withdrawals. Great
                  experience!"
                </p>
                <p className="font-semibold">Vikram Singh</p>
                <p className="text-xs text-[#94a3b8]">Bangalore</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download App */}
      <section className="py-20 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#3694FF]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#6FFFB4]/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
          <div className="bg-[#121a2a]/80 rounded-2xl overflow-hidden border border-[#1e293b] backdrop-blur-sm shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Download Our App
                </h2>
                <p className="text-[#94a3b8] mb-6">
                  Play your favorite games anytime, anywhere. Get special
                  bonuses when you download our app today!
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <a href="#" className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6FFFB4] to-[#3694FF] rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-200"></div>
                    <div className="relative bg-[#0a101f] border border-[#1e293b] px-5 py-3 rounded-lg flex items-center gap-3 transition-all">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        className="w-7 h-7"
                        fill="currentColor"
                      >
                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                      </svg>
                      <div>
                        <div className="font-medium">App Store</div>
                        <div className="text-xs text-[#94a3b8]">
                          iOS devices
                        </div>
                      </div>
                    </div>
                  </a>
                  <a href="#" className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6FFFB4] to-[#3694FF] rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-200"></div>
                    <div className="relative bg-[#0a101f] border border-[#1e293b] px-5 py-3 rounded-lg flex items-center gap-3 transition-all">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-7 h-7"
                        fill="currentColor"
                      >
                        <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                      </svg>
                      <div>
                        <div className="font-medium">Google Play</div>
                        <div className="text-xs text-[#94a3b8]">
                          Android devices
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1">
                    <span className="text-[#6FFFB4] font-bold text-3xl">
                      4.8
                    </span>
                    <div className="text-xs">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="#FFD700"
                            className="w-3 h-3"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                      </div>
                      <div className="text-[#94a3b8]">App Store</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[#6FFFB4] font-bold text-3xl">
                      4.7
                    </span>
                    <div className="text-xs">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="#FFD700"
                            className="w-3 h-3"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                      </div>
                      <div className="text-[#94a3b8]">Google Play</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -right-4 -bottom-4 w-72 h-72 bg-gradient-to-r from-[#6FFFB4] to-[#3694FF] rounded-full blur-3xl opacity-20"></div>
                <img
                  src="https://img.icons8.com/color/240/null/smartphone-tablet.png"
                  alt="Mobile App"
                  className="max-w-full h-auto relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Choose MultyComm?</h2>
            <p className="text-[#94a3b8] mt-2 max-w-2xl mx-auto">
              We provide the best gaming experience with exciting features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-[#121a2a]/70 rounded-lg p-6 border border-[#1e293b] hover:border-[#6FFFB4]/30 transition-all shadow-lg group">
              <div className="w-12 h-12 bg-[#0a101f] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#6FFFB4]/10 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-[#6FFFB4]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-[#6FFFB4] transition-colors">
                Secure Payments
              </h3>
              <p className="text-[#94a3b8]">
                Multiple payment options with instant deposits and withdrawals.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#121a2a]/70 rounded-lg p-6 border border-[#1e293b] hover:border-[#6FFFB4]/30 transition-all shadow-lg group">
              <div className="w-12 h-12 bg-[#0a101f] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#6FFFB4]/10 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-[#6FFFB4]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-[#6FFFB4] transition-colors">
                100% Fair Games
              </h3>
              <p className="text-[#94a3b8]">
                All games are certified fair with transparent results and
                statistics.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#121a2a]/70 rounded-lg p-6 border border-[#1e293b] hover:border-[#6FFFB4]/30 transition-all shadow-lg group">
              <div className="w-12 h-12 bg-[#0a101f] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#6FFFB4]/10 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-[#6FFFB4]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-[#6FFFB4] transition-colors">
                Live Multiplayer
              </h3>
              <p className="text-[#94a3b8]">
                Play with friends or compete against players from across the
                country.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#121a2a]/70 rounded-lg p-6 border border-[#1e293b] hover:border-[#6FFFB4]/30 transition-all shadow-lg group">
              <div className="w-12 h-12 bg-[#0a101f] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#6FFFB4]/10 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-[#6FFFB4]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-[#6FFFB4] transition-colors">
                Daily Bonuses
              </h3>
              <p className="text-[#94a3b8]">
                Get free coins, spins, and exciting rewards every day you log
                in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a101f] pt-16 pb-8 relative">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#6FFFB4] to-[#3694FF] rounded-lg"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-[#0a101f] font-bold text-lg">
                    M
                  </div>
                </div>
                <span className="font-bold text-xl">MultyComm</span>
              </div>
              <p className="text-[#94a3b8] mb-6 max-w-xs">
                India's fastest growing gaming platform with over 1 million
                active players and ₹10 Crore+ in prizes distributed every month.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-8 h-8 bg-[#121a2a] rounded-full flex items-center justify-center hover:bg-[#192338] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="text-[#94a3b8]"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-[#121a2a] rounded-full flex items-center justify-center hover:bg-[#192338] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="text-[#94a3b8]"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-[#121a2a] rounded-full flex items-center justify-center hover:bg-[#192338] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="text-[#94a3b8]"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-[#121a2a] rounded-full flex items-center justify-center hover:bg-[#192338] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="text-[#94a3b8]"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-[#94a3b8] hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[#94a3b8] hover:text-white transition-colors"
                  >
                    Games
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[#94a3b8] hover:text-white transition-colors"
                  >
                    Tournaments
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[#94a3b8] hover:text-white transition-colors"
                  >
                    Referrals
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[#94a3b8] hover:text-white transition-colors"
                  >
                    Leaderboard
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-[#94a3b8] hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[#94a3b8] hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[#94a3b8] hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[#94a3b8] hover:text-white transition-colors"
                  >
                    Press Kit
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[#94a3b8] hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-[#94a3b8] hover:text-white transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[#94a3b8] hover:text-white transition-colors"
                  >
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[#94a3b8] hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[#94a3b8] hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[#94a3b8] hover:text-white transition-colors"
                  >
                    Responsible Gaming
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#1e293b] pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[#94a3b8] text-sm">
                © 2025 MultyComm. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <img
                  src="https://img.icons8.com/color/48/000000/visa.png"
                  alt="Visa"
                  className="h-8"
                />
                <img
                  src="https://img.icons8.com/color/48/000000/mastercard.png"
                  alt="Mastercard"
                  className="h-8"
                />
                <img
                  src="https://img.icons8.com/color/48/000000/google-pay-india.png"
                  alt="Google Pay"
                  className="h-8"
                />
                <img
                  src="https://img.icons8.com/color/48/000000/paytm.png"
                  alt="Paytm"
                  className="h-8"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

// // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// // import React, { useState } from "react";
// // import { motion } from "framer-motion";

// // // Game Card Component
// // const GameCard = ({ title, category, image, players, prize, hot = false }) => {
// //   return (
// //     <motion.div
// //       whileHover={{ y: -5 }}
// //       className="bg-[#2A1155]/80 rounded-xl overflow-hidden border border-purple-900/70 hover:border-[#FFD700]/50 transition-all shadow-lg group"
// //     >
// //       <div className="p-6">
// //         <div className="flex justify-between items-start mb-4">
// //           <img src={image} alt={title} className="w-12 h-12" />
// //           {hot && (
// //             <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs flex items-center gap-1">
// //               <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
// //               Hot
// //             </span>
// //           )}
// //         </div>
// //         <h3 className="text-lg font-bold group-hover:text-[#FFD700] transition-colors">
// //           {title}
// //         </h3>
// //         <p className="text-sm text-purple-300 mb-4">{category}</p>
// //         <div className="flex justify-between items-center text-sm">
// //           <div className="flex items-center gap-1 text-purple-300">
// //             <svg
// //               xmlns="http://www.w3.org/2000/svg"
// //               fill="none"
// //               viewBox="0 0 24 24"
// //               stroke="currentColor"
// //               className="w-4 h-4"
// //             >
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth={2}
// //                 d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
// //               />
// //             </svg>
// //             <span>{players}</span>
// //           </div>
// //           <div className="text-[#FFD700]">₹{prize}</div>
// //         </div>
// //       </div>
// //       <div className="bg-[#0D0430]/50 py-3 px-6 border-t border-purple-900/50">
// //         <button className="w-full text-white/90 hover:text-white font-medium text-sm flex items-center justify-center gap-1 group-hover:text-[#FFD700] transition-colors">
// //           <span>Play Now</span>
// //           <svg
// //             xmlns="http://www.w3.org/2000/svg"
// //             fill="none"
// //             viewBox="0 0 24 24"
// //             stroke="currentColor"
// //             className="w-4 h-4 group-hover:translate-x-1 transition-transform"
// //           >
// //             <path
// //               strokeLinecap="round"
// //               strokeLinejoin="round"
// //               strokeWidth={2}
// //               d="M9 5l7 7-7 7"
// //             />
// //           </svg>
// //         </button>
// //       </div>
// //     </motion.div>
// //   );
// // };

// // const Home = () => {
// //   const [activeCategory, setActiveCategory] = useState("popular");

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-[#1A093C] to-[#0D0430] text-white relative overflow-hidden">
// //       {/* Animated Background Elements */}
// //       <div className="absolute inset-0 overflow-hidden pointer-events-none">
// //         <div className="absolute top-20 left-10 w-64 h-64 bg-purple-700/20 rounded-full blur-3xl"></div>
// //         <div className="absolute bottom-40 right-20 w-80 h-80 bg-blue-700/10 rounded-full blur-3xl"></div>
// //         <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-pink-700/10 rounded-full blur-3xl"></div>
// //       </div>

// //       <nav className="sticky top-0 z-50 bg-[#1A093C]/90 backdrop-blur-md py-4 border-b border-purple-900/50">
// //         <div className="container mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center">
// //           <div className="flex items-center gap-2">
// //             <div className="relative">
// //               <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700] to-purple-600 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
// //               <div className="relative bg-[#1A093C] rounded-full p-1">
// //                 <img
// //                   src="https://img.icons8.com/fluency/96/coins.png"
// //                   className="h-10 w-10"
// //                   alt="Logo"
// //                 />
// //               </div>
// //             </div>
// //             <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-purple-400">
// //               MultyComm
// //             </span>
// //           </div>

// //           <div className="hidden md:flex items-center gap-4">
// //             <a
// //               href="#"
// //               className="text-purple-200 hover:text-white transition-colors px-3 py-2"
// //             >
// //               Home
// //             </a>
// //             <a
// //               href="#"
// //               className="text-purple-200 hover:text-white transition-colors px-3 py-2"
// //             >
// //               Games
// //             </a>
// //             <a
// //               href="#"
// //               className="text-purple-200 hover:text-white transition-colors px-3 py-2"
// //             >
// //               Contests
// //             </a>
// //             <a
// //               href="#"
// //               className="text-purple-200 hover:text-white transition-colors px-3 py-2"
// //             >
// //               Leaderboard
// //             </a>
// //             <a
// //               href="#"
// //               className="text-purple-200 hover:text-white transition-colors px-3 py-2"
// //             >
// //               Support
// //             </a>
// //           </div>

// //           <div className="flex items-center gap-3 md:gap-6">
// //             <div className="flex items-center gap-2 bg-gradient-to-r from-purple-900/60 to-purple-800/60 px-4 py-2 rounded-lg border border-purple-800/50 shadow-lg">
// //               <div className="relative">
// //                 <img
// //                   src="https://img.icons8.com/fluency/48/wallet.png"
// //                   className="h-6 w-6"
// //                   alt="Wallet"
// //                 />
// //                 <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
// //               </div>
// //               <span className="font-semibold">₹5,000</span>
// //               <span className="text-xs text-green-400">+₹200</span>
// //             </div>
// //             <motion.button
// //               whileHover={{ scale: 1.05 }}
// //               whileTap={{ scale: 0.95 }}
// //               className="relative group"
// //             >
// //               <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FFD700] to-purple-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
// //               <div className="relative bg-[#FFD700] text-[#1A093C] px-6 py-2 rounded-full font-semibold group-hover:bg-[#ffea00] transition-all">
// //                 Sign Up
// //               </div>
// //             </motion.button>
// //             <button className="md:hidden">
// //               <svg
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 fill="none"
// //                 viewBox="0 0 24 24"
// //                 stroke="currentColor"
// //                 className="w-6 h-6"
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth={2}
// //                   d="M4 6h16M4 12h16M4 18h16"
// //                 />
// //               </svg>
// //             </button>
// //           </div>
// //         </div>
// //       </nav>

// //       {/* Hero Section */}
// //       <section className="relative pt-20 pb-32">
// //         <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
// //           <div className="grid md:grid-cols-2 gap-8 items-center">
// //             <div className="text-left">
// //               <motion.div
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 0.5 }}
// //               >
// //                 <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
// //                   Play & Win <br />
// //                   <span className="text-[#FFD700] drop-shadow-lg">
// //                     Real Cash
// //                   </span>
// //                 </h1>
// //                 <p className="text-xl text-purple-200 mb-8 max-w-lg">
// //                   Join India's most trusted skill-based gaming platform. Use
// //                   your skills to win big and withdraw instantly!
// //                 </p>
// //                 <div className="flex flex-wrap gap-4">
// //                   <motion.button
// //                     whileHover={{ scale: 1.05 }}
// //                     whileTap={{ scale: 0.95 }}
// //                     className="relative group"
// //                   >
// //                     <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FFD700] to-purple-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
// //                     <div className="relative bg-[#FFD700] text-[#1A093C] px-8 py-3 rounded-full font-semibold group-hover:bg-[#ffea00] transition-all flex items-center gap-2">
// //                       <span>Start Playing</span>
// //                       <svg
// //                         xmlns="http://www.w3.org/2000/svg"
// //                         fill="none"
// //                         viewBox="0 0 24 24"
// //                         stroke="currentColor"
// //                         className="w-5 h-5"
// //                       >
// //                         <path
// //                           strokeLinecap="round"
// //                           strokeLinejoin="round"
// //                           strokeWidth={2}
// //                           d="M14 5l7 7m0 0l-7 7m7-7H3"
// //                         />
// //                       </svg>
// //                     </div>
// //                   </motion.button>
// //                   <a
// //                     href="#"
// //                     className="inline-flex items-center gap-2 text-purple-200 hover:text-white px-4 py-3 transition-colors"
// //                   >
// //                     <svg
// //                       xmlns="http://www.w3.org/2000/svg"
// //                       fill="none"
// //                       viewBox="0 0 24 24"
// //                       stroke="currentColor"
// //                       className="w-5 h-5"
// //                     >
// //                       <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         strokeWidth={2}
// //                         d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
// //                       />
// //                       <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         strokeWidth={2}
// //                         d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
// //                       />
// //                     </svg>
// //                     <span>How it works</span>
// //                   </a>
// //                 </div>

// //                 <div className="mt-10 flex items-center gap-4">
// //                   <div className="flex -space-x-2">
// //                     {[1, 2, 3, 4].map((img) => (
// //                       <img
// //                         key={img}
// //                         src={`https://i.pravatar.cc/40?img=${img}`}
// //                         className="w-8 h-8 rounded-full border-2 border-purple-900"
// //                         alt="User"
// //                       />
// //                     ))}
// //                   </div>
// //                   <div className="text-sm">
// //                     <span className="text-purple-200">Join</span>{" "}
// //                     <span className="font-bold text-white">10,000+</span>{" "}
// //                     <span className="text-purple-200">players today</span>
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             </div>

// //             <div className="relative">
// //               <div className="absolute -inset-4 bg-gradient-to-tr from-purple-600/30 to-blue-600/20 rounded-2xl blur-xl"></div>
// //               <div className="relative bg-gradient-to-tr from-purple-900/70 to-[#1A093C]/80 rounded-2xl p-6 border border-purple-800/30 shadow-xl">
// //                 <div className="flex justify-between items-center mb-6">
// //                   <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm flex items-center gap-1">
// //                     <span className="w-2 h-2 bg-green-500 rounded-full"></span>
// //                     <span>Live</span>
// //                   </div>
// //                   <div className="text-sm text-purple-300">
// //                     456 players online
// //                   </div>
// //                 </div>

// //                 <h3 className="text-2xl font-bold mb-2">Mega Tournament</h3>
// //                 <p className="text-purple-300 mb-4">
// //                   Win up to ₹100,000 in prizes
// //                 </p>

// //                 <div className="grid grid-cols-2 gap-4 mb-6">
// //                   <div className="bg-white/5 rounded-lg p-3">
// //                     <p className="text-xs text-purple-300">Prize Pool</p>
// //                     <p className="text-lg font-bold text-[#FFD700]">₹100,000</p>
// //                   </div>
// //                   <div className="bg-white/5 rounded-lg p-3">
// //                     <p className="text-xs text-purple-300">Entry Fee</p>
// //                     <p className="text-lg font-bold">₹99</p>
// //                   </div>
// //                   <div className="bg-white/5 rounded-lg p-3">
// //                     <p className="text-xs text-purple-300">Players</p>
// //                     <p className="text-lg font-bold">762/1000</p>
// //                   </div>
// //                   <div className="bg-white/5 rounded-lg p-3">
// //                     <p className="text-xs text-purple-300">Starts In</p>
// //                     <p className="text-lg font-bold text-red-400">01:24:36</p>
// //                   </div>
// //                 </div>

// //                 <motion.button
// //                   whileHover={{ scale: 1.02 }}
// //                   whileTap={{ scale: 0.98 }}
// //                   className="w-full bg-gradient-to-r from-[#FFD700] to-yellow-500 text-[#1A093C] py-3 rounded-lg font-semibold transition-all"
// //                 >
// //                   Join Tournament
// //                 </motion.button>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-20">
// //             <div className="bg-white/5 p-6 rounded-2xl border border-purple-900/50 backdrop-blur-sm shadow-lg">
// //               <div className="text-4xl mb-4">🏆</div>
// //               <h3 className="text-xl font-bold mb-2">Daily Contests</h3>
// //               <p className="text-purple-300">
// //                 Join tournaments with big prize pools
// //               </p>
// //             </div>

// //             <div className="bg-white/5 p-6 rounded-2xl border border-purple-900/50 backdrop-blur-sm shadow-lg relative overflow-hidden group">
// //               <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-transparent group-hover:opacity-80 transition-opacity"></div>
// //               <div className="relative">
// //                 <div className="text-4xl mb-4">💸</div>
// //                 <h3 className="text-xl font-bold mb-2">Instant Withdrawal</h3>
// //                 <p className="text-purple-300">
// //                   Get your winnings in 2 minutes
// //                 </p>
// //               </div>
// //             </div>

// //             <div className="bg-white/5 p-6 rounded-2xl border border-purple-900/50 backdrop-blur-sm shadow-lg">
// //               <div className="text-4xl mb-4">🔒</div>
// //               <h3 className="text-xl font-bold mb-2">Secure & Safe</h3>
// //               <p className="text-purple-300">100% RNG certified games</p>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Featured Games */}
// //       <section className="py-16 bg-[#1A093C]/80">
// //         <div className="container mx-auto px-4 md:px-6 lg:px-8">
// //           <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
// //             <div>
// //               <h2 className="text-3xl font-bold">Featured Games</h2>
// //               <p className="text-purple-300 mt-2">
// //                 Play our most popular games and win big
// //               </p>
// //             </div>
// //             <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
// //               <button
// //                 onClick={() => setActiveCategory("popular")}
// //                 className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
// //                   activeCategory === "popular"
// //                     ? "bg-[#FFD700] text-[#1A093C] font-semibold"
// //                     : "bg-white/10 text-purple-200 hover:bg-white/15"
// //                 }`}
// //               >
// //                 Popular
// //               </button>
// //               <button
// //                 onClick={() => setActiveCategory("quiz")}
// //                 className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
// //                   activeCategory === "quiz"
// //                     ? "bg-[#FFD700] text-[#1A093C] font-semibold"
// //                     : "bg-white/10 text-purple-200 hover:bg-white/15"
// //                 }`}
// //               >
// //                 Quiz
// //               </button>
// //               <button
// //                 onClick={() => setActiveCategory("card")}
// //                 className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
// //                   activeCategory === "card"
// //                     ? "bg-[#FFD700] text-[#1A093C] font-semibold"
// //                     : "bg-white/10 text-purple-200 hover:bg-white/15"
// //                 }`}
// //               >
// //                 Card Games
// //               </button>
// //               <button
// //                 onClick={() => setActiveCategory("arcade")}
// //                 className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
// //                   activeCategory === "arcade"
// //                     ? "bg-[#FFD700] text-[#1A093C] font-semibold"
// //                     : "bg-white/10 text-purple-200 hover:bg-white/15"
// //                 }`}
// //               >
// //                 Arcade
// //               </button>
// //               <button
// //                 onClick={() => setActiveCategory("board")}
// //                 className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
// //                   activeCategory === "board"
// //                     ? "bg-[#FFD700] text-[#1A093C] font-semibold"
// //                     : "bg-white/10 text-purple-200 hover:bg-white/15"
// //                 }`}
// //               >
// //                 Board Games
// //               </button>
// //             </div>
// //           </div>

// //           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //             {activeCategory === "popular" && (
// //               <>
// //                 <GameCard
// //                   title="Ludo King"
// //                   category="Board Game"
// //                   image="https://img.icons8.com/color/96/ludo.png"
// //                   players="12,345"
// //                   prize="10,000"
// //                   hot={true}
// //                 />
// //                 <GameCard
// //                   title="Quiz Master"
// //                   category="Quiz"
// //                   image="https://img.icons8.com/color/96/test.png"
// //                   players="8,921"
// //                   prize="5,000"
// //                 />
// //                 <GameCard
// //                   title="Teen Patti"
// //                   category="Card Game"
// //                   image="https://img.icons8.com/color/96/poker.png"
// //                   players="9,563"
// //                   prize="25,000"
// //                   hot={true}
// //                 />
// //                 <GameCard
// //                   title="Carrom"
// //                   category="Board Game"
// //                   image="https://img.icons8.com/color/96/carrom.png"
// //                   players="7,128"
// //                   prize="7,500"
// //                 />
// //                 <GameCard
// //                   title="Fruit Slice"
// //                   category="Arcade"
// //                   image="https://img.icons8.com/color/96/watermelon.png"
// //                   players="5,932"
// //                   prize="3,000"
// //                 />
// //                 <GameCard
// //                   title="Rummy"
// //                   category="Card Game"
// //                   image="https://img.icons8.com/color/96/playing-cards.png"
// //                   players="11,245"
// //                   prize="20,000"
// //                   hot={true}
// //                 />
// //                 <GameCard
// //                   title="Snakes & Ladders"
// //                   category="Board Game"
// //                   image="https://img.icons8.com/color/96/snake.png"
// //                   players="6,542"
// //                   prize="5,000"
// //                 />
// //                 <GameCard
// //                   title="Word Puzzle"
// //                   category="Quiz"
// //                   image="https://img.icons8.com/color/96/word.png"
// //                   players="4,827"
// //                   prize="2,500"
// //                 />
// //               </>
// //             )}

// //             {activeCategory === "quiz" && (
// //               <>
// //                 <GameCard
// //                   title="Quiz Master"
// //                   category="General Knowledge"
// //                   image="https://img.icons8.com/color/96/test.png"
// //                   players="8,921"
// //                   prize="5,000"
// //                   hot={true}
// //                 />
// //                 <GameCard
// //                   title="Word Puzzle"
// //                   category="Vocabulary"
// //                   image="https://img.icons8.com/color/96/word.png"
// //                   players="4,827"
// //                   prize="2,500"
// //                 />
// //                 <GameCard
// //                   title="Bollywood Quiz"
// //                   category="Entertainment"
// //                   image="https://img.icons8.com/color/96/movie.png"
// //                   players="6,234"
// //                   prize="7,500"
// //                 />
// //                 <GameCard
// //                   title="Sports Trivia"
// //                   category="Sports"
// //                   image="https://img.icons8.com/color/96/football2.png"
// //                   players="5,123"
// //                   prize="10,000"
// //                   hot={true}
// //                 />
// //               </>
// //             )}

// //             {activeCategory === "card" && (
// //               <>
// //                 <GameCard
// //                   title="Teen Patti"
// //                   category="Card Game"
// //                   image="https://img.icons8.com/color/96/poker.png"
// //                   players="9,563"
// //                   prize="25,000"
// //                   hot={true}
// //                 />
// //                 <GameCard
// //                   title="Rummy"
// //                   category="Card Game"
// //                   image="https://img.icons8.com/color/96/playing-cards.png"
// //                   players="11,245"
// //                   prize="20,000"
// //                   hot={true}
// //                 />
// //                 <GameCard
// //                   title="Bluff Master"
// //                   category="Card Game"
// //                   image="https://img.icons8.com/color/96/joker-dc.png"
// //                   players="7,845"
// //                   prize="15,000"
// //                 />
// //                 <GameCard
// //                   title="Solitaire Pro"
// //                   category="Card Game"
// //                   image="https://img.icons8.com/color/96/solitaire.png"
// //                   players="4,523"
// //                   prize="5,000"
// //                 />
// //               </>
// //             )}

// //             {activeCategory === "arcade" && (
// //               <>
// //                 <GameCard
// //                   title="Fruit Slice"
// //                   category="Arcade"
// //                   image="https://img.icons8.com/color/96/watermelon.png"
// //                   players="5,932"
// //                   prize="3,000"
// //                 />
// //                 <GameCard
// //                   title="Bubble Shooter"
// //                   category="Arcade"
// //                   image="https://img.icons8.com/color/96/bubble.png"
// //                   players="6,127"
// //                   prize="4,000"
// //                   hot={true}
// //                 />
// //                 <GameCard
// //                   title="Car Racing"
// //                   category="Arcade"
// //                   image="https://img.icons8.com/color/96/f1-race-car.png"
// //                   players="7,234"
// //                   prize="12,000"
// //                   hot={true}
// //                 />
// //                 <GameCard
// //                   title="Space Blaster"
// //                   category="Arcade"
// //                   image="https://img.icons8.com/color/96/asteroid.png"
// //                   players="3,845"
// //                   prize="2,500"
// //                 />
// //               </>
// //             )}

// //             {activeCategory === "board" && (
// //               <>
// //                 <GameCard
// //                   title="Ludo King"
// //                   category="Board Game"
// //                   image="https://img.icons8.com/color/96/ludo.png"
// //                   players="12,345"
// //                   prize="10,000"
// //                   hot={true}
// //                 />
// //                 <GameCard
// //                   title="Carrom"
// //                   category="Board Game"
// //                   image="https://img.icons8.com/color/96/carrom.png"
// //                   players="7,128"
// //                   prize="7,500"
// //                 />
// //                 <GameCard
// //                   title="Snakes & Ladders"
// //                   category="Board Game"
// //                   image="https://img.icons8.com/color/96/snake.png"
// //                   players="6,542"
// //                   prize="5,000"
// //                 />
// //                 <GameCard
// //                   title="Chess Pro"
// //                   category="Board Game"
// //                   image="https://img.icons8.com/color/96/chess.png"
// //                   players="8,932"
// //                   prize="15,000"
// //                   hot={true}
// //                 />
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Live Contests */}
// //       <section className="py-16">
// //         <div className="container mx-auto px-4 md:px-6 lg:px-8">
// //           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
// //             <div>
// //               <h2 className="text-3xl font-bold">Live Contests</h2>
// //               <p className="text-purple-300 mt-2">
// //                 Join ongoing contests and win exciting prizes
// //               </p>
// //             </div>
// //             <a
// //               href="#"
// //               className="text-[#FFD700] hover:text-yellow-400 font-semibold flex items-center gap-1 group"
// //             >
// //               <span>View All</span>
// //               <svg
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 fill="none"
// //                 viewBox="0 0 24 24"
// //                 stroke="currentColor"
// //                 className="w-4 h-4 group-hover:translate-x-1 transition-transform"
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth={2}
// //                   d="M9 5l7 7-7 7"
// //                 />
// //               </svg>
// //             </a>
// //           </div>
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {[
// //               {
// //                 name: "Quiz Mania",
// //                 category: "General Knowledge",
// //                 time: 15,
// //                 entry: 50,
// //                 prize: 5000,
// //                 players: 342,
// //                 maxPlayers: 500,
// //               },
// //               {
// //                 name: "Ludo Tournament",
// //                 category: "Board Game",
// //                 time: 30,
// //                 entry: 100,
// //                 prize: 10000,
// //                 players: 156,
// //                 maxPlayers: 200,
// //                 featured: true,
// //               },
// //               {
// //                 name: "Teen Patti League",
// //                 category: "Card Game",
// //                 time: 45,
// //                 entry: 200,
// //                 prize: 25000,
// //                 players: 89,
// //                 maxPlayers: 100,
// //               },
// //               {
// //                 name: "Rummy Masters",
// //                 category: "Card Game",
// //                 time: 60,
// //                 entry: 150,
// //                 prize: 15000,
// //                 players: 76,
// //                 maxPlayers: 100,
// //               },
// //               {
// //                 name: "Word Challenge",
// //                 category: "Quiz",
// //                 time: 20,
// //                 entry: 75,
// //                 prize: 7500,
// //                 players: 220,
// //                 maxPlayers: 300,
// //               },
// //               {
// //                 name: "Cricket Quiz",
// //                 category: "Sports",
// //                 time: 25,
// //                 entry: 99,
// //                 prize: 9900,
// //                 players: 178,
// //                 maxPlayers: 200,
// //                 featured: true,
// //               },
// //             ].map((contest, index) => (
// //               <div
// //                 key={index}
// //                 className={`relative overflow-hidden ${
// //                   contest.featured
// //                     ? "bg-gradient-to-br from-[#2A1155]/80 to-[#1A093C] border-[#FFD700]/30"
// //                     : "bg-[#2A1155]/80"
// //                 } rounded-xl p-6 border border-purple-900/70 hover:border-[#FFD700]/70 transition-all shadow-lg group`}
// //               >
// //                 {contest.featured && (
// //                   <div className="absolute top-0 right-0">
// //                     <div className="bg-[#FFD700] text-[#1A093C] px-4 py-1 rounded-bl-lg font-semibold text-sm">
// //                       Featured
// //                     </div>
// //                   </div>
// //                 )}

// //                 <div className="flex justify-between items-start mb-4">
// //                   <div>
// //                     <h3 className="text-xl font-bold group-hover:text-[#FFD700] transition-colors">
// //                       {contest.name}
// //                     </h3>
// //                     <p className="text-purple-300">{contest.category}</p>
// //                   </div>
// //                   <span
// //                     className={`${
// //                       contest.time < 30
// //                         ? "bg-green-500/20 text-green-400"
// //                         : "bg-[#FFD700]/20 text-[#FFD700]"
// //                     } px-3 py-1 rounded-full text-sm flex items-center gap-1`}
// //                   >
// //                     <svg
// //                       xmlns="http://www.w3.org/2000/svg"
// //                       fill="none"
// //                       viewBox="0 0 24 24"
// //                       stroke="currentColor"
// //                       className="w-4 h-4"
// //                     >
// //                       <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         strokeWidth={2}
// //                         d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
// //                       />
// //                     </svg>
// //                     {contest.time} Min
// //                   </span>
// //                 </div>

// //                 <div className="flex justify-between items-center mb-4">
// //                   <div>
// //                     <p className="text-sm text-purple-300">Entry Fee</p>
// //                     <p className="text-lg font-bold">₹{contest.entry}</p>
// //                   </div>
// //                   <div>
// //                     <p className="text-sm text-purple-300">Prize Pool</p>
// //                     <p className="text-lg font-bold text-[#FFD700]">
// //                       ₹{contest.prize.toLocaleString()}
// //                     </p>
// //                   </div>
// //                 </div>

// //                 <div className="mb-4">
// //                   <div className="flex justify-between text-sm mb-1">
// //                     <span className="text-purple-300">Players</span>
// //                     <span className="text-purple-200">
// //                       {contest.players}/{contest.maxPlayers}
// //                     </span>
// //                   </div>
// //                   <div className="w-full bg-purple-900/30 rounded-full h-2">
// //                     <div
// //                       className="bg-gradient-to-r from-[#FFD700] to-yellow-500 h-2 rounded-full"
// //                       style={{
// //                         width: `${
// //                           (contest.players / contest.maxPlayers) * 100
// //                         }%`,
// //                       }}
// //                     ></div>
// //                   </div>
// //                 </div>

// //                 <motion.button
// //                   whileHover={{ scale: 1.02 }}
// //                   whileTap={{ scale: 0.98 }}
// //                   className={`w-full ${
// //                     contest.featured
// //                       ? "bg-gradient-to-r from-[#FFD700] to-yellow-500"
// //                       : "bg-[#FFD700]"
// //                   } hover:bg-[#ffea00] text-[#1A093C] py-3 rounded-lg font-semibold transition-all flex justify-center items-center gap-2`}
// //                 >
// //                   <span>Join Now</span>
// //                   {contest.featured && (
// //                     <svg
// //                       xmlns="http://www.w3.org/2000/svg"
// //                       fill="none"
// //                       viewBox="0 0 24 24"
// //                       stroke="currentColor"
// //                       className="w-5 h-5"
// //                     >
// //                       <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         strokeWidth={2}
// //                         d="M13 5l7 7-7 7M5 5l7 7-7 7"
// //                       />
// //                     </svg>
// //                   )}
// //                 </motion.button>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* How It Works */}
// //       <section className="py-16 bg-[#1A093C]/90 relative overflow-hidden">
// //         <div className="absolute inset-0 pointer-events-none">
// //           <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-700/10 rounded-full blur-3xl"></div>
// //           <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-700/10 rounded-full blur-3xl"></div>
// //         </div>

// //         <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
// //           <div className="text-center mb-12">
// //             <h2 className="text-3xl font-bold mb-4">How It Works</h2>
// //             <p className="text-purple-300 max-w-2xl mx-auto">
// //               Join thousands of players who are already winning on MultyComm
// //             </p>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto relative">
// //             <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-600/50 to-transparent hidden md:block"></div>

// //             {[
// //               {
// //                 icon: "📱",
// //                 title: "Sign Up",
// //                 description: "Create your account in less than 30 seconds",
// //               },
// //               {
// //                 icon: "🎮",
// //                 title: "Play Games",
// //                 description:
// //                   "Choose from our wide variety of skill-based games",
// //               },
// //               {
// //                 icon: "💰",
// //                 title: "Win & Withdraw",
// //                 description:
// //                   "Win real cash and withdraw instantly to your bank account",
// //               },
// //             ].map((step, index) => (
// //               <div key={index} className="flex flex-col items-center relative">
// //                 <div className="relative">
// //                   <div className="absolute -inset-3 bg-gradient-to-r from-purple-600 to-[#FFD700] rounded-full blur opacity-70"></div>
// //                   <div className="relative w-16 h-16 bg-gradient-to-br from-[#2A1155] to-[#1A093C] rounded-full flex items-center justify-center text-3xl z-10">
// //                     {step.icon}
// //                   </div>
// //                 </div>
// //                 <h3 className="text-xl font-bold mt-6 mb-2">{step.title}</h3>
// //                 <p className="text-purple-300 text-center">
// //                   {step.description}
// //                 </p>
// //               </div>
// //             ))}
// //           </div>

// //           <div className="mt-16 text-center">
// //             <motion.button
// //               whileHover={{ scale: 1.05 }}
// //               whileTap={{ scale: 0.95 }}
// //               className="relative group inline-block"
// //             >
// //               <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FFD700] to-purple-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
// //               <div className="relative bg-[#FFD700] text-[#1A093C] px-8 py-3 rounded-full font-semibold group-hover:bg-[#ffea00] transition-all">
// //                 Get Started Now
// //               </div>
// //             </motion.button>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Testimonials */}
// //       <section className="py-16">
// //         <div className="container mx-auto px-4 md:px-6 lg:px-8">
// //           <div className="text-center mb-12">
// //             <h2 className="text-3xl font-bold mb-4">What Our Players Say</h2>
// //             <p className="text-purple-300 max-w-2xl mx-auto">
// //               Don't just take our word for it, hear from our community
// //             </p>
// //           </div>

// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //             {[
// //               {
// //                 name: "Priya S.",
// //                 location: "Mumbai",
// //                 image: "https://i.pravatar.cc/100?img=5",
// //                 quote:
// //                   "I've won over ₹50,000 on MultyComm! The games are fun and the withdrawals are instant. Highly recommended!",
// //                 rating: 5,
// //               },
// //               {
// //                 name: "Rahul M.",
// //                 location: "Delhi",
// //                 image: "https://i.pravatar.cc/100?img=12",
// //                 quote:
// //                   "Best gaming platform I've used. Their customer support is amazing and the contests are always exciting.",
// //                 rating: 5,
// //               },
// //               {
// //                 name: "Anjali K.",
// //                 location: "Bangalore",
// //                 image: "https://i.pravatar.cc/100?img=9",
// //                 quote:
// //                   "I was skeptical at first, but after winning my first tournament, I was convinced. Transparent and reliable!",
// //                 rating: 4,
// //               },
// //             ].map((testimonial, index) => (
// //               <div
// //                 key={index}
// //                 className="bg-[#2A1155]/70 rounded-xl p-6 border border-purple-900/70 hover:border-[#FFD700]/50 transition-all shadow-lg"
// //               >
// //                 <div className="flex items-center gap-4 mb-4">
// //                   <img
// //                     src={testimonial.image}
// //                     alt={testimonial.name}
// //                     className="w-12 h-12 rounded-full border-2 border-purple-800"
// //                   />
// //                   <div>
// //                     <h4 className="font-bold">{testimonial.name}</h4>
// //                     <p className="text-sm text-purple-300">
// //                       {testimonial.location}
// //                     </p>
// //                   </div>
// //                 </div>
// //                 <p className="text-purple-200 mb-4">"{testimonial.quote}"</p>
// //                 <div className="flex items-center">
// //                   {Array.from({ length: 5 }).map((_, i) => (
// //                     <svg
// //                       key={i}
// //                       className={`w-5 h-5 ${
// //                         i < testimonial.rating
// //                           ? "text-[#FFD700]"
// //                           : "text-purple-800"
// //                       }`}
// //                       fill="currentColor"
// //                       viewBox="0 0 20 20"
// //                     >
// //                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
// //                     </svg>
// //                   ))}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Footer */}
// //       <footer className="bg-[#0D0430] py-16 border-t border-purple-900/50">
// //         <div className="container mx-auto px-4 md:px-6 lg:px-8">
// //           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
// //             <div>
// //               <div className="flex items-center gap-2 mb-4">
// //                 <div className="relative">
// //                   <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700] to-purple-600 rounded-full blur opacity-70"></div>
// //                   <div className="relative bg-[#1A093C] rounded-full p-1">
// //                     <img
// //                       src="https://img.icons8.com/fluency/96/coins.png"
// //                       className="h-8 w-8"
// //                       alt="Logo"
// //                     />
// //                   </div>
// //                 </div>
// //                 <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FFD700] to-purple-400">
// //                   MultyComm
// //                 </span>
// //               </div>
// //               <p className="text-purple-300 mb-4">
// //                 India's most trusted skill gaming platform. Play, compete, and
// //                 win real cash prizes.
// //               </p>
// //               <div className="flex gap-4">
// //                 <a href="#" className="text-purple-300 hover:text-white">
// //                   <svg
// //                     className="w-6 h-6"
// //                     fill="currentColor"
// //                     viewBox="0 0 24 24"
// //                     aria-hidden="true"
// //                   >
// //                     <path
// //                       fillRule="evenodd"
// //                       d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
// //                       clipRule="evenodd"
// //                     />
// //                   </svg>
// //                 </a>
// //                 <a href="#" className="text-purple-300 hover:text-white">
// //                   <svg
// //                     className="w-6 h-6"
// //                     fill="currentColor"
// //                     viewBox="0 0 24 24"
// //                     aria-hidden="true"
// //                   >
// //                     <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
// //                   </svg>
// //                 </a>
// //                 <a href="#" className="text-purple-300 hover:text-white">
// //                   <svg
// //                     className="w-6 h-6"
// //                     fill="currentColor"
// //                     viewBox="0 0 24 24"
// //                     aria-hidden="true"
// //                   >
// //                     <path
// //                       fillRule="evenodd"
// //                       d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
// //                       clipRule="evenodd"
// //                     />
// //                   </svg>
// //                 </a>
// //               </div>
// //             </div>

// //             <div>
// //               <h4 className="text-lg font-bold mb-4">Quick Links</h4>
// //               <ul className="space-y-2">
// //                 <li>
// //                   <a
// //                     href="#"
// //                     className="text-purple-300 hover:text-white transition-colors"
// //                   >
// //                     Home
// //                   </a>
// //                 </li>
// //                 <li>
// //                   <a
// //                     href="#"
// //                     className="text-purple-300 hover:text-white transition-colors"
// //                   >
// //                     Games
// //                   </a>
// //                 </li>
// //                 <li>
// //                   <a
// //                     href="#"
// //                     className="text-purple-300 hover:text-white transition-colors"
// //                   >
// //                     Contests
// //                   </a>
// //                 </li>
// //                 <li>
// //                   <a
// //                     href="#"
// //                     className="text-purple-300 hover:text-white transition-colors"
// //                   >
// //                     Leaderboard
// //                   </a>
// //                 </li>
// //                 <li>
// //                   <a
// //                     href="#"
// //                     className="text-purple-300 hover:text-white transition-colors"
// //                   >
// //                     How It Works
// //                   </a>
// //                 </li>
// //               </ul>
// //             </div>

// //             <div>
// //               <h4 className="text-lg font-bold mb-4">Legal</h4>
// //               <ul className="space-y-2">
// //                 <li>
// //                   <a
// //                     href="#"
// //                     className="text-purple-300 hover:text-white transition-colors"
// //                   >
// //                     Terms of Service
// //                   </a>
// //                 </li>
// //                 <li>
// //                   <a
// //                     href="#"
// //                     className="text-purple-300 hover:text-white transition-colors"
// //                   >
// //                     Privacy Policy
// //                   </a>
// //                 </li>
// //                 <li>
// //                   <a
// //                     href="#"
// //                     className="text-purple-300 hover:text-white transition-colors"
// //                   >
// //                     Refund Policy
// //                   </a>
// //                 </li>
// //                 <li>
// //                   <a
// //                     href="#"
// //                     className="text-purple-300 hover:text-white transition-colors"
// //                   >
// //                     Responsible Gaming
// //                   </a>
// //                 </li>
// //                 <li>
// //                   <a
// //                     href="#"
// //                     className="text-purple-300 hover:text-white transition-colors"
// //                   >
// //                     Legal Disclaimer
// //                   </a>
// //                 </li>
// //               </ul>
// //             </div>

// //             <div>
// //               <h4 className="text-lg font-bold mb-4">Contact Us</h4>
// //               <ul className="space-y-2">
// //                 <li className="flex items-center gap-2 text-purple-300">
// //                   <svg
// //                     xmlns="http://www.w3.org/2000/svg"
// //                     fill="none"
// //                     viewBox="0 0 24 24"
// //                     stroke="currentColor"
// //                     className="w-5 h-5"
// //                   >
// //                     <path
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                       strokeWidth={2}
// //                       d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
// //                     />
// //                   </svg>
// //                   <span>support@multycomm.com</span>
// //                 </li>
// //                 <li className="flex items-center gap-2 text-purple-300">
// //                   <svg
// //                     xmlns="http://www.w3.org/2000/svg"
// //                     fill="none"
// //                     viewBox="0 0 24 24"
// //                     stroke="currentColor"
// //                     className="w-5 h-5"
// //                   >
// //                     <path
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                       strokeWidth={2}
// //                       d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
// //                     />
// //                   </svg>
// //                   <span>1800-123-4567</span>
// //                 </li>
// //                 <li className="mt-4">
// //                   <div className="bg-white/5 p-4 rounded-lg">
// //                     <h5 className="font-semibold mb-2">
// //                       Subscribe to our newsletter
// //                     </h5>
// //                     <div className="flex">
// //                       <input
// //                         type="email"
// //                         placeholder="Your email"
// //                         className="bg-[#1A093C] border border-purple-900 px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 flex-grow"
// //                       />
// //                       <button className="bg-[#FFD700] text-[#1A093C] px-4 py-2 rounded-r-lg font-semibold hover:bg-[#ffea00] transition-colors">
// //                         Subscribe
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </li>
// //               </ul>
// //             </div>
// //           </div>

// //           <div className="mt-12 pt-8 border-t border-purple-900/50 text-center">
// //             <p className="text-purple-300">
// //               © 2025 MultyComm. All rights reserved.
// //             </p>
// //             <div className="mt-4 flex flex-wrap justify-center gap-4">
// //               <img
// //                 src="https://img.icons8.com/color/48/upi.png"
// //                 className="h-8"
// //                 alt="UPI"
// //               />
// //               <img
// //                 src="https://img.icons8.com/color/48/paytm.png"
// //                 className="h-8"
// //                 alt="Paytm"
// //               />
// //               <img
// //                 src="https://img.icons8.com/color/48/google-pay-india.png"
// //                 className="h-8"
// //                 alt="GPay"
// //               />
// //               <img
// //                 src="https://img.icons8.com/color/48/phonepe.png"
// //                 className="h-8"
// //                 alt="PhonePe"
// //               />
// //               <img
// //                 src="https://img.icons8.com/color/48/visa.png"
// //                 className="h-8"
// //                 alt="Visa"
// //               />
// //               <img
// //                 src="https://img.icons8.com/color/48/mastercard.png"
// //                 className="h-8"
// //                 alt="Mastercard"
// //               />
// //             </div>
// //           </div>
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // };

// // export default Home;

// // ----------------------------------------------------------------------------------------------------------------

// // import React, { useState } from "react";
// // import { motion } from "framer-motion";

// // // Game Categories
// // const categories = [
// //   { id: "trivia", name: "Knowledge Battles", icon: "🧠", color: "#00ff88" },
// //   { id: "puzzle", name: "Brain Teasers", icon: "🎲", color: "#ff6b6b" },
// //   { id: "math", name: "Number Wars", icon: "🔢", color: "#4dabf7" },
// //   { id: "word", name: "Word Arena", icon: "📖", color: "#ffd43b" },
// // ];

// // const Home = () => {
// //   const [activeCategory, setActiveCategory] = useState("trivia");

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
// //       {/* Glowing Background Elements */}
// //       <div className="fixed inset-0 overflow-hidden pointer-events-none">
// //         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
// //         <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
// //       </div>

// //       {/* Navbar */}
// //       <nav className="sticky top-0 z-50 bg-gray-800/80 backdrop-blur-md border-b border-gray-700">
// //         <div className="container mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center h-16">
// //           <div className="flex items-center gap-3">
// //             <div className="relative">
// //               <div className="absolute inset-0 bg-cyan-500 rounded-full blur"></div>
// //               <span className="relative text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
// //                 BrainBattles
// //               </span>
// //             </div>
// //           </div>

// //           <div className="hidden md:flex items-center gap-6">
// //             {categories.map((category) => (
// //               <button
// //                 key={category.id}
// //                 onClick={() => setActiveCategory(category.id)}
// //                 className={`px-4 py-2 rounded-lg transition-all ${
// //                   activeCategory === category.id
// //                     ? "bg-cyan-500/20 text-cyan-400"
// //                     : "hover:bg-gray-700/50 text-gray-300"
// //                 }`}
// //               >
// //                 {category.name}
// //               </button>
// //             ))}
// //           </div>

// //           <div className="flex items-center gap-4">
// //             <div className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-lg">
// //               <span className="text-cyan-400">₹2,500</span>
// //               <button className="text-gray-300 hover:text-cyan-400">
// //                 + Add
// //               </button>
// //             </div>
// //             <button className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded-lg text-gray-900 font-semibold transition-colors">
// //               Profile
// //             </button>
// //           </div>
// //         </div>
// //       </nav>

// //       {/* Hero Section */}
// //       <section className="relative pt-20 pb-32">
// //         <div className="container mx-auto px-4 md:px-6 lg:px-8">
// //           <div className="max-w-4xl mx-auto text-center">
// //             <motion.h1
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
// //             >
// //               Test Your Skills
// //               <br />
// //               <span className="text-cyan-400">Earn Real Rewards</span>
// //             </motion.h1>
// //             <p className="text-xl text-gray-300 mb-8">
// //               Join India's premier skill-based gaming platform where knowledge
// //               meets excitement!
// //             </p>

// //             <div className="flex justify-center gap-4">
// //               <motion.button
// //                 whileHover={{ scale: 1.05 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 className="bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-xl text-gray-900 font-semibold flex items-center gap-2"
// //               >
// //                 <span>Start Playing</span>
// //                 <svg
// //                   className="w-5 h-5"
// //                   fill="none"
// //                   stroke="currentColor"
// //                   viewBox="0 0 24 24"
// //                 >
// //                   <path
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     strokeWidth={2}
// //                     d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
// //                   />
// //                 </svg>
// //               </motion.button>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Live Tournaments */}
// //       <section className="py-16">
// //         <div className="container mx-auto px-4 md:px-6 lg:px-8">
// //           <h2 className="text-3xl font-bold text-cyan-400 mb-8">
// //             Live Tournaments
// //           </h2>
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //             {[1, 2, 3].map((item) => (
// //               <div
// //                 key={item}
// //                 className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-500 transition-colors relative"
// //               >
// //                 <div className="absolute top-4 right-4 flex items-center gap-2 text-sm">
// //                   <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
// //                   <span className="text-green-400">Live</span>
// //                 </div>
// //                 <h3 className="text-xl font-bold text-gray-100 mb-2">
// //                   {["Math Masters", "Word Warriors", "Trivia Titans"][item - 1]}
// //                 </h3>
// //                 <div className="flex justify-between mb-4">
// //                   <div>
// //                     <p className="text-sm text-gray-400">Entry Fee</p>
// //                     <p className="text-cyan-400">₹{item * 50}</p>
// //                   </div>
// //                   <div>
// //                     <p className="text-sm text-gray-400">Prize Pool</p>
// //                     <p className="text-cyan-400">₹{item * 5000}</p>
// //                   </div>
// //                 </div>
// //                 <div className="h-2 bg-gray-700 rounded-full mb-4">
// //                   <div
// //                     className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
// //                     style={{ width: `${item * 25}%` }}
// //                   ></div>
// //                 </div>
// //                 <button className="w-full bg-cyan-500 hover:bg-cyan-600 py-2 rounded-lg text-gray-900 font-semibold transition-colors">
// //                   Join Now
// //                 </button>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Category Grid */}
// //       <section className="py-16">
// //         <div className="container mx-auto px-4 md:px-6 lg:px-8">
// //           <h2 className="text-3xl font-bold text-cyan-400 mb-8">
// //             Game Categories
// //           </h2>
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //             {categories.map((category) => (
// //               <motion.div
// //                 key={category.id}
// //                 whileHover={{ y: -5 }}
// //                 className="group relative overflow-hidden rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors"
// //               >
// //                 <div
// //                   className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
// //                   style={{ color: category.color }}
// //                 ></div>
// //                 <div className="p-6 text-center">
// //                   <span className="text-6xl mb-4 inline-block">
// //                     {category.icon}
// //                   </span>
// //                   <h3 className="text-xl font-bold text-gray-100 mb-2">
// //                     {category.name}
// //                   </h3>
// //                   <p className="text-gray-400">100+ Challenges</p>
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Achievement System */}
// //       <section className="py-16">
// //         <div className="container mx-auto px-4 md:px-6 lg:px-8">
// //           <h2 className="text-3xl font-bold text-cyan-400 mb-8">
// //             Your Progress
// //           </h2>
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //             <div className="bg-gray-800 rounded-xl p-6">
// //               <div className="flex items-center gap-4 mb-4">
// //                 <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400">
// //                   🏆
// //                 </div>
// //                 <div>
// //                   <h3 className="text-gray-100 font-bold">Current Level</h3>
// //                   <p className="text-cyan-400">Level 15</p>
// //                 </div>
// //               </div>
// //               <div className="h-2 bg-gray-700 rounded-full">
// //                 <div
// //                   className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
// //                   style={{ width: "65%" }}
// //                 ></div>
// //               </div>
// //             </div>

// //             <div className="bg-gray-800 rounded-xl p-6">
// //               <div className="flex items-center gap-4 mb-4">
// //                 <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400">
// //                   💎
// //                 </div>
// //                 <div>
// //                   <h3 className="text-gray-100 font-bold">Streak</h3>
// //                   <p className="text-purple-400">7 Day Streak</p>
// //                 </div>
// //               </div>
// //               <div className="flex gap-2">
// //                 {[...Array(7)].map((_, i) => (
// //                   <div
// //                     key={i}
// //                     className={`w-full h-2 rounded-full ${
// //                       i < 5 ? "bg-purple-500" : "bg-gray-700"
// //                     }`}
// //                   ></div>
// //                 ))}
// //               </div>
// //             </div>

// //             <div className="bg-gray-800 rounded-xl p-6">
// //               <div className="flex items-center gap-4 mb-4">
// //                 <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center text-yellow-400">
// //                   ⚡
// //                 </div>
// //                 <div>
// //                   <h3 className="text-gray-100 font-bold">Daily Challenges</h3>
// //                   <p className="text-yellow-400">3/5 Completed</p>
// //                 </div>
// //               </div>
// //               <div className="flex gap-2">
// //                 {[...Array(5)].map((_, i) => (
// //                   <div
// //                     key={i}
// //                     className={`w-full h-2 rounded-full ${
// //                       i < 3 ? "bg-yellow-500" : "bg-gray-700"
// //                     }`}
// //                   ></div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Learning Path */}
// //       <section className="py-16 bg-gray-800/50">
// //         <div className="container mx-auto px-4 md:px-6 lg:px-8">
// //           <h2 className="text-3xl font-bold text-cyan-400 mb-8">
// //             Skill Development
// //           </h2>
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //             <div className="bg-gray-700 rounded-xl p-6">
// //               <h3 className="text-xl font-bold text-gray-100 mb-4">
// //                 Personalized Learning
// //               </h3>
// //               <div className="space-y-4">
// //                 {[
// //                   { name: "Math Skills", progress: 75 },
// //                   { name: "Vocabulary", progress: 60 },
// //                   { name: "Logical Reasoning", progress: 85 },
// //                 ].map((skill, index) => (
// //                   <div key={index}>
// //                     <div className="flex justify-between mb-2">
// //                       <span className="text-gray-300">{skill.name}</span>
// //                       <span className="text-cyan-400">{skill.progress}%</span>
// //                     </div>
// //                     <div className="h-2 bg-gray-600 rounded-full">
// //                       <div
// //                         className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
// //                         style={{ width: `${skill.progress}%` }}
// //                       ></div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             <div className="bg-gray-700 rounded-xl p-6">
// //               <h3 className="text-xl font-bold text-gray-100 mb-4">
// //                 Earn Badges
// //               </h3>
// //               <div className="grid grid-cols-3 gap-4">
// //                 {[
// //                   { name: "Math Whiz", icon: "🧮", earned: true },
// //                   { name: "Word Master", icon: "📚", earned: false },
// //                   { name: "Logic Pro", icon: "🔍", earned: true },
// //                   { name: "Speed King", icon: "⚡", earned: false },
// //                   { name: "Streak Hero", icon: "🔥", earned: true },
// //                   { name: "Quiz Champion", icon: "🏆", earned: false },
// //                 ].map((badge, index) => (
// //                   <div
// //                     key={index}
// //                     className={`p-4 rounded-lg text-center ${
// //                       badge.earned
// //                         ? "bg-cyan-500/20 border border-cyan-500/30"
// //                         : "bg-gray-600/30 border border-gray-500/30"
// //                     }`}
// //                   >
// //                     <span className="text-3xl mb-2 inline-block">
// //                       {badge.icon}
// //                     </span>
// //                     <p className="text-sm text-gray-300">{badge.name}</p>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // export default Home;
