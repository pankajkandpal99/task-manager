import { Schema, model } from "mongoose";
import { IUserStats } from "../types/model/i-user-stats-model";

const UserStatsSchema = new Schema<IUserStats>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
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
    highScores: Schema.Types.Mixed,
    achievements: [String],
  },
  {
    timestamps: true,
    collection: "user_stats",
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  }
);

UserStatsSchema.index({ userId: 1 });
UserStatsSchema.index({ "highScores.gameId": 1 });

export const UserStats = model<IUserStats>("UserStats", UserStatsSchema);
