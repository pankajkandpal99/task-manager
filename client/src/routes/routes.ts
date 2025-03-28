import React, { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Games = lazy(() => import("../pages/Games"));
const Contest = lazy(() => import("../pages/Contest"));
const Leaderboard = lazy(() => import("../pages/Leaderboard"));

const Support = lazy(() => import("../pages/Support"));
const Services = lazy(() => import("../pages/Services"));
const Contact = lazy(() => import("../pages/Contact"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

interface RouteConfig {
  path: string;
  element: React.ComponentType;
  fullWidth?: boolean;
}

export const publicRoutes: RouteConfig[] = [
  { path: "/", element: Home, fullWidth: true },
  { path: "/about", element: About },
  { path: "/games", element: Games },

  { path: "/contest", element: Contest },
  { path: "/support", element: Support },
  { path: "/services", element: Services },
  { path: "/contact", element: Contact },
];

export const authRoutes: RouteConfig[] = [
  { path: "/login", element: Login },
  { path: "/register", element: Register },
];

export const protectedRoutes: RouteConfig[] = [
  { path: "/leaderboard", element: Leaderboard },
];

export const notFoundRoute: RouteConfig = { path: "*", element: NotFound };
