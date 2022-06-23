import { Request, Response, NextFunction } from "express";
import { resFunc } from "../routes/common/ResSuccessOrFalse.function";
import searchMyNameAuthChecker from "./func/searchMyName.authChecker.func";
import kakaoAuthChecker from "./func/kakao.authChecker.func";
import { SEARCH_MY_NAME, KAKAO } from "./constant/auth.constant";

export const authChecker = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const authType: string = req.headers["auth-type"] as string;
    const token: string = req.headers.authorization.split("Bearer ")[1];

    try {
      switch (authType) {
        case SEARCH_MY_NAME: {
          await searchMyNameAuthChecker(req, token);
          break;
        }
        case KAKAO: {
          await kakaoAuthChecker(token);
          break;
        }
        default: {
          throw new Error("Not Auth-Type!");
        }
      }
      next();
    } catch (err: any) {
      const status: number = err.status;
      const message: string = err.message;

      return resFunc({ res, err: { status, message } });
    }
  } else {
    return resFunc({ res, err: { status: 401, message: "Unauthorized" } });
  }
};
