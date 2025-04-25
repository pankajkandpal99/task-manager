import React, { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Dashboard = lazy(() => import("../pages/Dashboard"));

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
  { path: "/support", element: Support },
  { path: "/services", element: Services },
  { path: "/contact", element: Contact },
];

export const authRoutes: RouteConfig[] = [
  { path: "/login", element: Login },
  { path: "/register", element: Register },
];

export const protectedRoutes: RouteConfig[] = [
  { path: "/dashboard", element: Dashboard },
];

export const notFoundRoute: RouteConfig = { path: "*", element: NotFound };
