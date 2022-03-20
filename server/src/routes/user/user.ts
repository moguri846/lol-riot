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

export default router;
