/* eslint-disable @typescript-eslint/no-explicit-any */
export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
}

export enum AuthProvider {
  LOCAL = "LOCAL",
  GOOGLE = "GOOGLE",
  FACEBOOK = "FACEBOOK",
  APPLE = "APPLE",
}

export interface UserPreferences {
  // Define preferences structure as per your application needs
  [key: string]: any;
}

export interface GameProgress {
  // Define game progress structure as per your application needs
  [key: string]: any;
}

export interface UserStats {
  // Define user stats structure as per your application needs
  [key: string]: any;
}

export interface UserSession {
  id: string;
  // Add other session properties as needed
}

export interface UserData {
  _id: string;
  name: string;
  email: string;
  country: string;
  projects: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserState {
  currentUser: UserData | null;
  loading: boolean;
  error: string | null;
}

export interface UserState {
  currentUser: UserData | null;
  loading: boolean;
  error: string | null;
}
