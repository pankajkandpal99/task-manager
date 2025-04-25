import { Request, Response, NextFunction } from "express";
import ApiError from "@utils/apiError";
import { User } from "src/model/user.model";

const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw new ApiError(401, "User ID not found in token");
    }

    const user = await User.findById(userId).select("-password");
    // console.log("user : ", user);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export { getUserController };
