import { RequestContext } from "../../../middleware/context";
import { ROLE } from "../../../config/constants";
export declare const AuthController: {
    register: (context: RequestContext) => Promise<import("express").Response<{
        success: true;
        code: number;
        data: {
            email?: string | undefined;
            id: string;
            phoneNumber: string;
            role: ROLE;
        };
        timestamp: string;
    }, Record<string, any>>>;
    login: (context: RequestContext) => Promise<import("express").Response<{
        success: true;
        code: number;
        data: {
            user: import("../../../types/model/i-user-model").IUser & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            };
        };
        timestamp: string;
    }, Record<string, any>>>;
};
