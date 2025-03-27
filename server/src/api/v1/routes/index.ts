import { Router } from "express";
import { readdirSync } from "fs";
import { join } from "path";

const router = Router();
const routesPath = __dirname;

// All `.route.ts` files are auto-loaded
const loadRoutes = async () => {
  const files = readdirSync(routesPath).filter(
    (file) => file.endsWith(".route.ts") && file !== "index.ts"
  );

  for (const file of files) {
    console.log("enter route file");
    const routePath = join(routesPath, file);
    const route = await import(routePath);
    if (typeof route.default === "function") {
      route.default(router);
    }
  }
};

loadRoutes().catch((error) => {
  console.error("Route loading failed:", error);
  process.exit(1);
});

export default router;
