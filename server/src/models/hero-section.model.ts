import { Schema, model } from "mongoose";
import { IHeroSection } from "../types/model/i-hero-section-model";

const HeroSectionSchema = new Schema<IHeroSection>(
  {
    mainHeading: {
      type: String,
      required: [true, "Main heading is required"],
      minlength: [5, "Main heading must be at least 5 characters"],
      trim: true,
    },
    subHeading: {
      type: String,
      required: [true, "Sub heading is required"],
      minlength: [10, "Sub heading must be at least 10 characters"],
      trim: true,
    },
    buttonText: {
      type: String,
      required: [true, "Button text is required"],
      minlength: [2, "Button text must be at least 2 characters"],
      trim: true,
    },
    backgroundImages: [
      {
        type: String,
        required: [true, "At least one background image is required"],
        validate: {
          validator: function (v: string) {
            try {
              new URL(v);
              return true;
            } catch {
              return false;
            }
          },
          message: "Must be a valid image URL",
        },
      },
    ],
    scrollingTexts: [
      {
        type: String,
        required: [true, "At least one scrolling text is required"],
        minlength: [10, "Scrolling text must be at least 10 characters"],
        trim: true,
      },
    ],
    transitionDuration: {
      type: Number,
      required: [true, "Transition duration is required"],
      min: [1000, "Minimum duration is 1000ms"],
      max: [10000, "Maximum duration is 10000ms"],
      default: 3000,
    },
    active: {
      type: Boolean,
      default: false,
    },
    version: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    collection: "hero_sections",
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const HeroSection = model<IHeroSection>(
  "HeroSection",
  HeroSectionSchema
);
