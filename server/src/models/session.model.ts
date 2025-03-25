import { Schema, model } from "mongoose";
import { AuthProvider } from "../types/model/i-model";
import { ISession } from "../types/model/i-session-model";

const SessionSchema = new Schema<ISession>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      unique: true,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: "7d" },
    },
    ipAddress: String,
    userAgent: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    loginMethod: {
      type: String,
      enum: Object.values(AuthProvider),
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "sessions",
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Indexes
SessionSchema.index({ userId: 1 });
SessionSchema.index({ token: 1 });

export const Session = model<ISession>("Session", SessionSchema);
