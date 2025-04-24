import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  country: string;
  projects: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;

  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  country: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUserResponse {
  _id: string;
  name: string;
  email: string;
  country: string;
  projects: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export enum ROLE {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface ITokenPayload {
  userId: string;
  email: string;
  role: ROLE;
}
