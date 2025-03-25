import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../types/model/i-user-model";
import { AuthProvider, Role } from "../types/model/i-model";

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
      sparse: true,
      validate: {
        validator: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
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
      unique: true,
      required: true,
      validate: {
        validator: (v: string) => /^\+?[1-9]\d{1,14}$/.test(v),
        message: "Invalid phone number format",
      },
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
    username: {
      type: String,
      unique: true,
      sparse: true,
      minlength: [3, "Username must be at least 3 characters"],
    },
    avatar: String,
    lastLogin: Date,
    lastActive: Date,
    isVerified: { type: Boolean, default: false },
    provider: {
      type: String,
      enum: Object.values(AuthProvider),
    },
    providerId: String,
    gameProgress: Schema.Types.Mixed,
    preferences: Schema.Types.Mixed,
    sessions: [{ type: Schema.Types.ObjectId, ref: "Session" }],
    stats: { type: Schema.Types.ObjectId, ref: "UserStats" },
    isGuest: { type: Boolean, default: false },
    guestId: { type: String, unique: true, sparse: true },
    guestExpiresAt: Date,
  },
  {
    timestamps: true,
    collection: "users",
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);

UserSchema.index(
  { email: 1 },
  { unique: true, partialFilterExpression: { email: { $exists: true } } }
);
UserSchema.index({ phoneNumber: 1 }, { unique: true });
UserSchema.index(
  { username: 1 },
  { unique: true, partialFilterExpression: { username: { $exists: true } } }
);

export const User = model<IUser>("User", UserSchema);
