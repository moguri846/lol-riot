import { Router, Request, Response } from "express";
import { User } from "../../../models/User";
import { resFunc } from "../../common/ResSuccessOrFalse.function";
import { authChecker } from "../../../middleware/auth";

const router = Router();

router.post("/register", (req: Request, res: Response) => {
  const info = req.body.info;

  const user = new User(info);

  user.save((err: any) => {
    if (err) {
      resFunc({ res, err });
    }
    resFunc({ res });
  });
});

router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body.info;

  User.findOne({ email }).exec(async (err, user) => {
    if (err) {
      resFunc({ res, err });
    }

    if (!user) {
      resFunc({ res, err: { message: "이메일 혹은 비밀번호가 다릅니다." } });
    } else {
      try {
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
          resFunc({ res, err: { status: 404, message: "유저가 없습니다." } });
        } else {
          const token = await user.generateToken();

          resFunc({ res, data: token });
        }
      } catch (err) {
        resFunc({ res, err });
      }
    }
  });
});

router.post("/reissueToken", authChecker, async (req: Request, res: Response) => {
  try {
    const { refresh_token } = req.body;

    const reissueToken = await User.reissueToken(refresh_token as string);

    resFunc({ res, data: reissueToken });
  } catch (err: any) {
    resFunc({ res, err });
  }
});

router.post("/logout", authChecker, (req: Request, res: Response) => {
  const { access_token, refresh_token } = req.user;

  User.findOneAndUpdate({ access_token, refresh_token }, { access_token: "", refresh_token: "" }, (err: any) => {
    if (err) {
      return resFunc({ res, err });
    }
    return resFunc({ res });
  });
});

export default router;
