import CategoryGamesAdmin from "../components/admin/Home/category-games/CategoryGamesAdmin";
import { HeroSectionAdmin } from "../components/admin/Home/hero-section";
import TournamentGamesAdmin from "../components/admin/Home/tournament-games/TournamentGamesAdmin";

export type HomeSection = {
  id: string;
  name: string;
  component: React.ComponentType;
};

export const HOME_SECTIONS: HomeSection[] = [
  {
    id: "hero",
    name: "Hero Section",
    component: HeroSectionAdmin,
  },
  {
    id: "category-games",
    name: "Category Games Section",
    component: CategoryGamesAdmin,
  },
  {
    id: "tournaments-games",
    name: "Tournament Games Section",
    component: TournamentGamesAdmin,
  },
];
