"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const mongoose_1 = require("mongoose");
const i_model_1 = require("../types/model/i-model");
const SessionSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
    ipAddress: String,
    userAgent: String,
    isActive: {
        type: Boolean,
        default: true,
    },
    loginMethod: {
        type: String,
        enum: Object.values(i_model_1.AuthProvider),
        required: true,
    },
}, {
    timestamps: true,
    collection: "sessions",
    toJSON: {
        transform: (doc, ret) => {
            delete ret.__v;
            return ret;
        },
    },
});
exports.Session = (0, mongoose_1.model)("Session", SessionSchema);
//# sourceMappingURL=session.model.js.map