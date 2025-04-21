import { RequestContext } from "../../../../middleware/context";
export declare const GameSectionController: {
    createOrUpdateGameSection: (context: RequestContext) => Promise<import("express").Response<{
        success: true;
        code: number;
        data: {
            id: string;
            title: string;
            description: string;
            category: string;
            gameUrl: string;
            isFeatured: boolean;
            isNew: boolean;
            minPlayers: number;
            maxPlayers: number;
            thumbnail: string;
        };
        timestamp: string;
    }, Record<string, any>>>;
    getAllGames: (context: RequestContext) => Promise<import("express").Response<{
        success: true;
        code: number;
        data: {
            id: import("mongoose").Types.ObjectId;
            thumbnail: string;
            title: string;
            description: string;
            category: string;
            gameUrl: string;
            isFeatured: boolean;
            isNew: boolean;
            minPlayers: number;
            maxPlayers: number;
            uploadPath: string;
            createdBy: any;
            updatedBy?: any;
            _id: import("mongoose").Types.ObjectId;
            __v: number;
        }[];
        timestamp: string;
    }, Record<string, any>>>;
    getGameById: (context: RequestContext) => Promise<import("express").Response<{
        success: true;
        code: number;
        data: import("mongoose").Document<unknown, {}, import("../../../../types/model/i-game-model").IGame> & import("../../../../types/model/i-game-model").IGame & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
        timestamp: string;
    }, Record<string, any>>>;
    updateGame: (context: RequestContext) => Promise<import("express").Response<{
        success: true;
        code: number;
        data: (import("mongoose").Document<unknown, {}, import("../../../../types/model/i-game-model").IGame> & import("../../../../types/model/i-game-model").IGame & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }) | null;
        timestamp: string;
    }, Record<string, any>>>;
    deleteGame: (context: RequestContext) => Promise<import("express").Response<{
        success: true;
        code: number;
        data: {
            success: boolean;
            message: string;
            deletedId: any;
        };
        timestamp: string;
    }, Record<string, any>>>;
};
