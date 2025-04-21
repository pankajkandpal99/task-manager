import { ObjectId } from "mongoose";
import { AuthProvider, Role } from "./i-model";
export interface IUser extends Document {
    email?: string;
    password: string;
    phoneNumber: string;
    role: Role;
    username?: string;
    avatar?: string;
    lastLogin?: Date;
    lastActive?: Date;
    isVerified: boolean;
    provider?: AuthProvider;
    providerId?: string;
    gameProgress?: Record<string, any>;
    preferences?: Record<string, any>;
    sessions: ObjectId[];
    stats?: ObjectId;
    isGuest: boolean;
    guestId?: string;
    guestExpiresAt?: Date;
}
