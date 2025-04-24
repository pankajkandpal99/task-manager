import ApiError from "@utils/apiError";
import { IUser } from "@interfaces/user.interface";
import { User } from "src/model/user.model";

export const createUser = async (userData: {
  name: string;
  email: string;
  password: string;
  country: string;
}): Promise<IUser> => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new ApiError(409, "Email already registered");
  }

  const user = await User.create(userData);
  return user;
};

export const authenticateUser = async (
  email: string,
  password: string
): Promise<IUser> => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  return user;
};
