import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { Toaster } from "sonner";
import { HeroSectionProvider } from "./contexts/HeroSectionContext.tsx";

// eslint-disable-next-line react-refresh/only-export-components
const Root = () => {
  return (
    <Provider store={store}>
      <HeroSectionProvider>
        <App />
        <Toaster position="top-center" richColors />
      </HeroSectionProvider>
    </Provider>
  );
};

createRoot(document.getElementById("root")!).render(<Root />);
