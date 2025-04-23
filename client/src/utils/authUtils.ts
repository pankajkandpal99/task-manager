export const checkAuthCookie = (): boolean => {
  return document.cookie
    .split(";")
    .some((cookie) => cookie.trim().startsWith("token="));
};

export const getTokenFromCookie = (): string | null => {
  const cookieString = document.cookie; // More reliable cookie parsing
  const cookieArray = cookieString.split("; ");
  const tokenCookie = cookieArray.find((row) => row.startsWith("token="));

  return tokenCookie ? decodeURIComponent(tokenCookie.split("=")[1]) : null;
};

export const verifyTokenClientSide = (): boolean => {
  const token = getTokenFromCookie();
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp > Date.now() / 1000;
  } catch {
    return false;
  }
};

export const clearAuthCookie = (): void => {
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};

export const logoutClient = (): void => {
  clearAuthCookie();
  localStorage.clear();
  sessionStorage.clear();
  // window.location.href = "/";
};
