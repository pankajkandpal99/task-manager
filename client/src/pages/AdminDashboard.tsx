import { useState } from "react";
import { HOME_SECTIONS } from "../types/admin-home-section-types";
import { SectionSelector } from "../components/admin/SectionSelector";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState(HOME_SECTIONS[0].id);
  const CurrentSection = HOME_SECTIONS.find(
    (s) => s.id === selectedSection
  )?.component;

  return (
    <div className="container pt-2 pb-4 md:pt-4 md:pb-8 px-4 sm:px-6">
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
        <div className="hidden md:block">
          <SectionSelector
            value={selectedSection}
            onChange={setSelectedSection}
          />
        </div>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-6">
          <TabsTrigger
            value="content"
            className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2"
          >
            Home Content
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

        <TabsContent value="content" className="mt-4 sm:mt-6 w-full">
          <div className="md:hidden mb-4">
            <SectionSelector
              value={selectedSection}
              onChange={setSelectedSection}
            />
          </div>
          <div className="rounded-lg border w-full p-4">
            {CurrentSection && <CurrentSection />}
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

export default AdminDashboard;

// import { useState } from "react";
// import { HeroSectionAdmin } from "../components/admin/Home/hero-section";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "../components/ui/tabs";
// import { HOME_SECTIONS } from "../types/admin-home-section-types";

// const AdminDashboard = () => {
//   const [selectedSection, setSelectedSection] = useState(HOME_SECTIONS[0].id);
//   const CurrentSection = HOME_SECTIONS.find(
//     (s) => s.id === selectedSection
//   )?.component;

//   return (
//     <div className="container pt-2 pb-4 md:pt-4 md:pb-8 px-4 sm:px-6">
//       <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
//         Admin Dashboard
//       </h1>

//       <Tabs defaultValue="hero" className="w-full">
//         <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
//           <TabsTrigger
//             value="hero"
//             className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2"
//           >
//             Hero Section
//           </TabsTrigger>
//           <TabsTrigger
//             value="games"
//             className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2"
//           >
//             Games
//           </TabsTrigger>
//           <TabsTrigger
//             value="settings"
//             className="text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2"
//           >
//             Settings
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="hero" className="mt-4 sm:mt-6 w-full">
//           <div className="rounded-lg border w-full">
//             <HeroSectionAdmin />
//           </div>
//         </TabsContent>

//         <TabsContent value="games" className="mt-4 sm:mt-6">
//           <div className="bg-card rounded-lg border p-4 sm:p-6">
//             <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
//               Games Management
//             </h2>
//             <p className="text-sm sm:text-base">Games content will go here</p>
//           </div>
//         </TabsContent>

//         <TabsContent value="settings" className="mt-4 sm:mt-6">
//           <div className="bg-card rounded-lg border p-4 sm:p-6">
//             <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
//               Settings
//             </h2>
//             <p className="text-sm sm:text-base">
//               Settings content will go here
//             </p>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default AdminDashboard;
