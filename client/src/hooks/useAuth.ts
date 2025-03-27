import { useAppSelector } from "./redux";

export const useAuth = () => {
  const { loading, authenticated, initialized } = useAppSelector(
    (state) => state.auth
  );
  return { loading, authenticated, initialized };
};
