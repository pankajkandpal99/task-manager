import { Router } from "express";
import { readdirSync, statSync } from "fs";
import { join, resolve } from "path";

const router = Router();
const routesPath = __dirname;

const findRouteFiles = (dir: string): string[] => {
  const files = readdirSync(dir);
  let routeFiles: string[] = [];

  files.forEach((file) => {
    const fullPath = join(dir, file);
    if (statSync(fullPath).isDirectory()) {
      // If it's a directory, search recursively
      routeFiles = [...routeFiles, ...findRouteFiles(fullPath)];
    } else if (file.endsWith(".route.ts") && file !== "index.ts") {
      // If it's a route file, add to list
      routeFiles.push(fullPath);
    }
  });

  return routeFiles;
};

const loadRoutes = async () => {
  const routeFiles = findRouteFiles(routesPath);

  for (const file of routeFiles) {
    try {
      const route = await import(file);
      if (typeof route.default === "function") {
        route.default(router);
        // console.log(`Route loaded: ${file.replace(routesPath, "")}`);
      }
    } catch (error) {
      console.error(`Failed to load route ${file}:`, error);
    }
  }
};

loadRoutes().catch((error) => {
  console.error("Route loading failed:", error);
  process.exit(1);
});

export default router;

// import { Router } from "express";
// import { readdirSync } from "fs";
// import { join } from "path";

// const router = Router();
// const routesPath = __dirname;

// // All `.route.ts` files are auto-loaded
// const loadRoutes = async () => {
//   const files = readdirSync(routesPath).filter(
//     (file) => file.endsWith(".route.ts") && file !== "index.ts"
//   );

//   for (const file of files) {
//     const routePath = join(routesPath, file);
//     const route = await import(routePath);
//     if (typeof route.default === "function") {
//       route.default(router);
//     }
//   }
// };

// loadRoutes().catch((error) => {
//   console.error("Route loading failed:", error);
//   process.exit(1);
// });

// export default router;
