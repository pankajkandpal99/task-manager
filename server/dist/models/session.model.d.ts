import { ISession } from "../types/model/i-session-model";
export declare const Session: import("mongoose").Model<ISession, {}, {}, {}, import("mongoose").Document<unknown, {}, ISession> & ISession & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
