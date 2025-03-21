import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { useEffect } from "react";
import { initializeAuth } from "./features/auth/authSlice.ts";

const Root = () => {
  useEffect(() => {
    store.dispatch(initializeAuth());
  }, []);

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

createRoot(document.getElementById("root")!).render(<Root />);
