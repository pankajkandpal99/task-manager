import { Document } from "mongoose";

export interface IHeroSection extends Document {
  mainHeading: string;
  subHeading: string;
  buttonText: string;
  backgroundImages: string[];
  scrollingTexts: string[];
  transitionDuration: number;
  active: boolean;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}
