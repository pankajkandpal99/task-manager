import { RequestContext } from "../../../../middleware/context";
export declare const HeroSectionController: {
    createOrUpdateHeroSection: (context: RequestContext) => Promise<import("express").Response<{
        success: true;
        code: number;
        data: import("../../../../types/model/i-hero-section-model").IHeroSection & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        timestamp: string;
    }, Record<string, any>>>;
    getHeroSection: (context: RequestContext) => Promise<import("express").Response<{
        success: true;
        code: number;
        data: import("mongoose").FlattenMaps<import("../../../../types/model/i-hero-section-model").IHeroSection> & Required<{
            _id: import("mongoose").FlattenMaps<unknown>;
        }> & {
            __v: number;
        };
        timestamp: string;
    }, Record<string, any>>>;
};
