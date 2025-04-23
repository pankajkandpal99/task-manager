import React from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { HeroSectionProvider } from "../contexts/HeroSectionContext";
import { store } from "../store";
import { CategoryGamesProvider } from "../contexts/CategoryGamesContext";

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Provider store={store}>
      <HeroSectionProvider>
        <CategoryGamesProvider>
          {children}
          <Toaster position="top-center" richColors />
        </CategoryGamesProvider>
      </HeroSectionProvider>
    </Provider>
  );
};
