import { ITokenPayload } from "@interfaces/user.interface";
import { LoginInput, RegisterInput } from "src/schema/auth.schema";

declare global {
  namespace Express {
    interface Request {
      user?: ITokenPayload;
      validatedData?: RegisterInput | LoginInput;
    }
  }
}
