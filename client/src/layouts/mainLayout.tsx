import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar/Navbar";
import { NAVBAR_ITEMS } from "../config/constants";

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar items={NAVBAR_ITEMS} />
      <main className="flex-1 container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};
