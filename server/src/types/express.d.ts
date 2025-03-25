import { RequestContext } from "../middleware/context";
import { User } from "@prisma/client";

declare module "express" {
  interface Request {
    context: RequestContext;
    user?: User;
  }
}
