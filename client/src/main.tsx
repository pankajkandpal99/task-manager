import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { Toaster } from "sonner";

// eslint-disable-next-line react-refresh/only-export-components
const Root = () => {
  return (
    <Provider store={store}>
      <App />
      <Toaster position="top-center" richColors />
    </Provider>
  );
};

createRoot(document.getElementById("root")!).render(<Root />);
