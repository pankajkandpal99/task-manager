import { RequestContext } from "../../../middleware/context";
export declare const UserController: {
    getCurrentUser: (context: RequestContext) => Promise<import("express").Response<{
        success: true;
        code: number;
        data: import("../../../types/model/i-user-model").IUser & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
        timestamp: string;
    }, Record<string, any>>>;
};
