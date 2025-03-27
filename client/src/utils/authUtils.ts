export const checkAuthCookie = (): boolean => {
  console.log("All cookies:", document.cookie); // Debug all cookies
  return document.cookie
    .split(";")
    .some((cookie) => cookie.trim().startsWith("token="));
};

export const getTokenFromCookie = (): string | null => {
  // More reliable cookie parsing
  const cookieString = document.cookie;
  console.log("cookie string : ", cookieString);

  const cookieArray = cookieString.split("; ");
  console.log("cookie string : ", cookieArray);

  const tokenCookie = cookieArray.find((row) => row.startsWith("token="));
  console.log("cookie string : ", tokenCookie);

  return tokenCookie ? decodeURIComponent(tokenCookie.split("=")[1]) : null;
};

export const verifyTokenClientSide = (): boolean => {
  const token = getTokenFromCookie();
  console.log("token : ", token);
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
