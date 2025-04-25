import { Request, Response, NextFunction } from "express";
import { generateToken } from "@utils/jwt";
import { sendResponse } from "@utils/apiResponse";
import { ROLE } from "@interfaces/user.interface";
import ApiError from "@utils/apiError";
import { authenticateUser, createUser } from "src/services/user.service";
import config from "@config/env";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, country } = req.body;
    // console.log("data : ", req.body);

    const user = await createUser({
      name,
      email,
      password,
      country,
    });

    sendResponse(res, 201, true, "Registration successful", {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        country: user.country,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    next(new ApiError(500, "Registration failed"));
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await authenticateUser(email, password);

    const token = generateToken({
      userId: user._id,
      email: user.email,
      role: ROLE.USER,
    });

    res.cookie("token", token, {
      httpOnly: false, // true only when server side token checking
      secure: config.NODE_ENV === "production" ? true : false,
      sameSite: config.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    sendResponse(res, 200, true, "Login successful", {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        country: user.country,
      },
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    next(new ApiError(500, "Login failed"));
  }
};

export { register, login };
