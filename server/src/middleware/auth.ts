import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { resFunc } from "../routes/common/ResSuccessOrFalse.function";

export const authChecker = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split("Bearer ")[1];

    try {
      const user = await User.findByToken(token);

      req.user = user;

      next();
    } catch (err: any) {
      if (err.message === "jwt expired") {
        try {
          const refresh_token = req.body.refresh_token as string;

          const reissueToken = await User.reissueToken(refresh_token);

          return resFunc({ res, data: reissueToken });
        } catch (err: any) {
          return resFunc({ res, err: { message: err.message } });
        }
      } else {
        return resFunc({ res, err: { status: 401, message: "Unauthorized" } });
      }
    }
  } else {
    return resFunc({ res, err: { status: 401, message: "Unauthorized" } });
  }
};
