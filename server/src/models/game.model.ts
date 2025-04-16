import { Schema, model } from "mongoose";
import { IGame } from "../types/model/i-game-model";

const GameSchema = new Schema<IGame>(
  {
    title: {
      type: String,
      required: [true, "Game title is required"],
      trim: true,
      maxlength: [100, "Game title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Game description is required"],
      trim: true,
      maxlength: [500, "Game description cannot exceed 500 characters"],
    },
    category: {
      type: String,
      required: [true, "Game category is required"],
      enum: ["Casual", "Action", "Adventure", "Puzzle", "Strategy", "Sports"],
      default: "Casual",
    },
    gameUrl: {
      type: String,
      required: [true, "Game URL is required"],
      validate: {
        validator: (v: string) => {
          try {
            new URL(v);
            return true;
          } catch (err) {
            return false;
          }
        },
        message: "Invalid game URL",
      },
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    minPlayers: {
      type: Number,
      required: [true, "Minimum players count is required"],
      min: [1, "Minimum players must be at least 1"],
    },
    maxPlayers: {
      type: Number,
      required: [true, "Maximum players count is required"],
      validate: {
        validator: function (v: number) {
          return v >= (this as any).minPlayers;
        },
        message: "Max players must be greater than or equal to min players",
      },
    },
    thumbnail: {
      publicUrl: {
        type: String,
        required: [true, "Thumbnail public URL is required"],
      },
      path: String,
      originalFilename: String,
      mimetype: String,
      size: Number,
    },
    uploadPath: {
      type: String,
      required: [true, "Upload path is required"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    collection: "games",
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;
        delete ret.uploadPath;
        delete ret.thumbnail.path;
        return ret;
      },
    },
  }
);

// // Indexes for better query performance
// GameSchema.index({ title: "text", description: "text" });
// GameSchema.index({ category: 1 });
// GameSchema.index({ isFeatured: 1 });
// GameSchema.index({ isNew: 1 });

export const Game = model<IGame>("Game", GameSchema);
