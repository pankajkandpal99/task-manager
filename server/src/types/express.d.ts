import { RequestContext } from "../middleware/context";
import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      context: RequestContext;
      user?: User;
    }
  }
}
