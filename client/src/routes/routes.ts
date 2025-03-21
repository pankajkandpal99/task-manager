/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { lazy } from "react";

const delayImport = (
  importFunction: () => Promise<{ default: React.ComponentType<any> }>
) => {
  return new Promise<{ default: React.ComponentType<any> }>((resolve) => {
    setTimeout(() => resolve(importFunction()), 1000);
  });
};

const Home = lazy(() => delayImport(() => import("../pages/Home")));
const About = lazy(() => delayImport(() => import("../pages/About")));
const Services = lazy(() => delayImport(() => import("../pages/Services")));
const Contact = lazy(() => delayImport(() => import("../pages/Contact")));
const NotFound = lazy(() => delayImport(() => import("../pages/NotFound")));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

interface RouteConfig {
  path: string;
  element: React.ComponentType;
}

export const publicRoutes: RouteConfig[] = [
  { path: "/", element: Home },
  { path: "/about", element: About },
  { path: "/services", element: Services },
  { path: "/contact", element: Contact },
];

export const authRoutes: RouteConfig[] = [
  { path: "/login", element: Login },
  { path: "/register", element: Register },
];

export const protectedRoutes: RouteConfig[] = [];

export const notFoundRoute: RouteConfig = { path: "*", element: NotFound };
