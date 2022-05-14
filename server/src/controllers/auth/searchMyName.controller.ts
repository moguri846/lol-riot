import { Request, Response } from "express";
import { User } from "../../models/User";
import { resFunc } from "../../routes/common/ResSuccessOrFalse.function";

export default {
  async signUp(req: Request, res: Response) {
    const info = req.body;

    const user = new User(info);

    user.save((err: any) => {
      if (err) {
        return resFunc({ res, err });
      }
      return resFunc({ res });
    });
  },
  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    User.findOne({ email }).exec(async (err, user) => {
      if (err) {
        return resFunc({ res, err });
      }

      if (!user) {
        return resFunc({ res, err: { status: 404, message: "이메일 혹은 비밀번호가 다릅니다." } });
      } else {
        try {
          const isMatch = await user.comparePassword(password);

          if (!isMatch) {
            return resFunc({ res, err: { status: 404, message: "이메일 혹은 비밀번호가 다릅니다." } });
          } else {
            const token = await user.generateToken();

            return resFunc({ res, data: token });
          }
        } catch (err) {
          return resFunc({ res, err });
        }
      }
    });
  },
  async myInfo(req: Request, res: Response) {
    try {
      const responseData = {
        email: req.user.email,
      };

      return resFunc({ res, data: responseData });
    } catch (err) {
      return resFunc({ res, err });
    }
  },
  async reissueToken(req: Request, res: Response) {
    try {
      const { refresh_token } = req.body;

      const reissueToken = await User.reissueToken(refresh_token as string);

      return resFunc({ res, data: reissueToken });
    } catch (err: any) {
      return resFunc({ res, err });
    }
  },
  async logout(req: Request, res: Response) {
    const { access_token, refresh_token } = req.user;

    User.findOneAndUpdate({ access_token, refresh_token }, { access_token: "", refresh_token: "" }, (err: any) => {
      if (err) {
        return resFunc({ res, err });
      }
      return resFunc({ res });
    });
  },
};
