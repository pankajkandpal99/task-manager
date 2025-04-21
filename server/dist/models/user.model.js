"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const i_model_1 = require("../types/model/i-model");
const constants_1 = require("../config/constants");
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        validate: {
            validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
            message: "Invalid email format",
        },
    },
    password: {
        type: String,
        minlength: [8, "Password must be at least 8 characters"],
        select: false,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (v) => /^[0-9]{10}$/.test(v),
            message: "Phone number must be 10 digits",
        },
    },
    role: {
        type: String,
        enum: Object.values(constants_1.ROLE),
        default: constants_1.ROLE.USER,
    },
    username: {
        type: String,
        minlength: [3, "Username must be at least 3 characters"],
    },
    avatar: String,
    lastLogin: Date,
    lastActive: Date,
    isVerified: { type: Boolean, default: false },
    provider: {
        type: String,
        enum: Object.values(i_model_1.AuthProvider),
    },
    providerId: String,
    gameProgress: mongoose_1.Schema.Types.Mixed,
    preferences: mongoose_1.Schema.Types.Mixed,
    sessions: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Session" }],
    stats: { type: mongoose_1.Schema.Types.ObjectId, ref: "UserStats" },
    isGuest: { type: Boolean, default: false },
    guestId: { type: String },
    guestExpiresAt: Date,
}, {
    timestamps: true,
    collection: "users",
    toJSON: {
        transform: (doc, ret) => {
            delete ret.password;
            delete ret.__v;
            return ret;
        },
    },
});
exports.User = (0, mongoose_1.model)("User", UserSchema);
//# sourceMappingURL=user.model.js.map