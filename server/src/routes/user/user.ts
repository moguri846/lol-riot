import { Router, Request, Response } from "express";
import { User } from "../../models/User";
import { resFunc } from "../common/ResSuccessOrFalse.function";
import jwt from "jsonwebtoken";
import { jwtSecretConfig } from "../../config/config";

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

        // @ts-ignore
        user.generateToken(function (err: any, token: any) {
          if (err) {
            resFunc({ res, err });
          }
          resFunc({ res, data: token });
        });
      });
    }
  });
});

export default router;
