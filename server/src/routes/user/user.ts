import { Router, Request, Response } from "express";
import { User } from "../../models/User";
import { resFunc } from "../common/ResSuccessOrFalse.function";

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

  User.findOne({ email }).exec((err, user) => {
    if (err) {
      resFunc({ res, err });
    }

    if (!user) {
      resFunc({ res, err: { message: "이메일 혹은 비밀번호가 다릅니다." } });
    } else {
      // @ts-ignore
      user.comparePassword(password, function (err: any, isMatch: boolean) {
        if (err) {
          return resFunc({ res, err });
        }
        if (!isMatch) {
          return resFunc({ res, err: { message: "이메일 혹은 비밀번호가 다릅니다." } });
        }
        return resFunc({ res, data: user });
      });
    }
  });
});

export default router;
