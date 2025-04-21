import { RequestContext } from "../middleware/context";
import { ClientSession } from "mongoose";
export declare const TransactionHooks: {
    startTransaction(context: RequestContext): Promise<ClientSession>;
    commitTransaction(context: RequestContext): Promise<void>;
    rollbackTransaction(context: RequestContext): Promise<void>;
};
