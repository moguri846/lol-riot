import { Request } from "express";
import { User } from "../../models/User";

const searchMyNameAuthChecker = async (req: Request, token: string) => {
  try {
    const user = await User.findByToken(token);

    req.user = user;

    return req;
  } catch (err: any) {
    const status: string = err.status;
    const message: number = err.message;

    if (err.message === "jwt expired") {
      const refresh_token = req.body.refresh_token as string;
      if (refresh_token) {
        try {
          const reissueToken = await User.reissueToken(refresh_token);

          return reissueToken;
        } catch (err: any) {
          throw { status, message: "갱신 실패" };
        }
      } else {
        throw { status: 401, message: "Unauthorized" };
      }
    } else {
      throw { status, message };
    }
  }
};

export default searchMyNameAuthChecker;
