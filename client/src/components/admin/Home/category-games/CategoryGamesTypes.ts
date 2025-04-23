export interface Game {
  id: number;
  title: string;
  category: string;
  image: string;
  players: string;
  prize: number;
  hot: boolean;
  tags: string[];
}

export interface CategoryGamesContent {
  sectionTitle: string;
  sectionDescription: string;
  categories: string[];
  games: Game[];
  viewAllButtonText: string;
  active: boolean;
}
