import { IGame } from "../types/model/i-game-model";
export declare const Game: import("mongoose").Model<IGame, {}, {}, {}, import("mongoose").Document<unknown, {}, IGame> & IGame & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
