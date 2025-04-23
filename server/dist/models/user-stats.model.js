"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStats = void 0;
const mongoose_1 = require("mongoose");
const UserStatsSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    gamesPlayed: {
        type: Number,
        default: 0,
        min: 0,
    },
    wins: {
        type: Number,
        default: 0,
        min: 0,
    },
    losses: {
        type: Number,
        default: 0,
        min: 0,
    },
    highScores: mongoose_1.Schema.Types.Mixed,
    achievements: [String],
}, {
    timestamps: true,
    collection: "user_stats",
    toJSON: {
        transform: (doc, ret) => {
            delete ret.__v;
            return ret;
        },
    },
});
exports.UserStats = (0, mongoose_1.model)("UserStats", UserStatsSchema);
//# sourceMappingURL=user-stats.model.js.map