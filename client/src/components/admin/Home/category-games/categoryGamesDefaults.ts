import { CategoryGamesContent } from "./CategoryGamesTypes";

export const defaultCategoryGamesContent: CategoryGamesContent = {
  sectionTitle: "Upcoming Tournaments",
  sectionDescription: "Play our most popular games and win big",
  categories: ["Popular", "New", "Tournaments", "Action", "Puzzle"],
  games: [
    {
      id: 1,
      title: "Ludo King",
      category: "Board",
      image:
        "https://img.freepik.com/free-vector/ludo-game-realistic-composition_98292-6836.jpg",
      players: "2,645 playing",
      prize: 5000,
      hot: true,
      tags: ["popular", "board", "tournaments"],
      // link: "/games/ludo-king"
    },
    {
      id: 2,
      title: "Rummy Classic",
      category: "Card",
      image:
        "https://img.freepik.com/free-vector/hand-drawn-indian-rummy-game_23-2149233282.jpg",
      players: "1,854 playing",
      prize: 10000,
      hot: true,
      tags: ["popular", "card"],
      // link: "/games/rummy-classic"
    },
    {
      id: 3,
      title: "Fantasy Cricket",
      category: "Sports",
      image:
        "https://cdn.pixabay.com/photo/2020/01/27/04/51/sport-4796426_1280.jpg",
      players: "5,326 playing",
      prize: 25000,
      hot: false,
      tags: ["popular", "sports", "tournaments"],
      // link: "/games/fantasy-cricket"
    },
    {
      id: 4,
      title: "Car Race 3D",
      category: "Racing",
      image:
        "https://img.freepik.com/free-vector/realistic-car-racing-horizontal-banner_107791-1851.jpg",
      players: "942 playing",
      prize: 2000,
      hot: false,
      tags: ["racing", "action"],
      // link: "/games/car-race-3d"
    },
    {
      id: 5,
      title: "Carrom Disc",
      category: "Board",
      image:
        "https://img.freepik.com/free-vector/carrom-board-realistic-composition-with-wooden-table-playing-pieces-coins-striker-vector-illustration_1284-68547.jpg",
      players: "1,232 playing",
      prize: 3000,
      hot: false,
      tags: ["board", "new"],
      // link: "/games/carrom-disc"
    },
    {
      id: 6,
      title: "Bubble Shooter",
      category: "Arcade",
      image:
        "https://img.freepik.com/free-vector/bubble-shooter-game-screen-with-shooter-cannon-colorful-balls_107791-3809.jpg",
      players: "856 playing",
      prize: 1500,
      hot: false,
      tags: ["arcade", "puzzle"],
      // link: "/games/bubble-shooter"
    },
    {
      id: 7,
      title: "Poker Nights",
      category: "Card",
      image:
        "https://img.freepik.com/free-vector/poker-table-background-green-color_47243-1093.jpg",
      players: "3,421 playing",
      prize: 15000,
      hot: true,
      tags: ["popular", "card", "tournaments"],
      // link: "/games/poker-nights"
    },
    {
      id: 8,
      title: "8 Ball Pool",
      category: "Sports",
      image:
        "https://img.freepik.com/free-vector/pool-table-realistic-green-background_107791-1785.jpg",
      players: "2,150 playing",
      prize: 7500,
      hot: false,
      tags: ["sports", "popular"],
      // link: "/games/8-ball-pool"
    },
  ],
  viewAllButtonText: "View All Tournaments",
  active: true,
};
