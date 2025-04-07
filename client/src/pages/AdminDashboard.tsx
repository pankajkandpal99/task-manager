import { HeroSectionAdmin } from "../components/admin/Home/hero-section";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

const Dashboard = () => {
  return (
    <div className="container pt-2 pb-4 md:pt-4 md:pb-8 px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
        Admin Dashboard
      </h1>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
          <TabsTrigger
            value="hero"
            className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2"
          >
            Hero Section
          </TabsTrigger>
          <TabsTrigger
            value="games"
            className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2"
          >
            Games
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2"
          >
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="mt-4 sm:mt-6 w-full">
          <div className="rounded-lg border w-full">
            <HeroSectionAdmin />
          </div>
        </TabsContent>

        <TabsContent value="games" className="mt-4 sm:mt-6">
          <div className="bg-card rounded-lg border p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
              Games Management
            </h2>
            <p className="text-sm sm:text-base">Games content will go here</p>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-4 sm:mt-6">
          <div className="bg-card rounded-lg border p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
              Settings
            </h2>
            <p className="text-sm sm:text-base">
              Settings content will go here
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
