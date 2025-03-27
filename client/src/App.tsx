import { useEffect } from "react";
import { AppRouter } from "./routes/AppRouter";
import { useAppDispatch } from "./hooks/redux";
import { verifyAuth } from "./features/auth/authSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(verifyAuth());

    // Periodic checks if this is necessary...
    const interval = setInterval(() => {
      dispatch(verifyAuth());
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return <AppRouter />;
}

export default App;
