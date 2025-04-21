import { IUserStats } from "../types/model/i-user-stats-model";
export declare const UserStats: import("mongoose").Model<IUserStats, {}, {}, {}, import("mongoose").Document<unknown, {}, IUserStats> & IUserStats & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
