import { Request, Response, Router } from "express";
import { resFunc } from "../common/ResSuccessOrFalse.function";
import { Post } from "../models/post";

const router = Router();

router.post("/create", (req: Request, res: Response) => {
  const post = new Post(req.body.post);

  post.save((err: any) => {
    if (err) {
      resFunc({ res, err });
    }
    resFunc({ res });
  });
});

router.get("/getPosts", (req: Request, res: Response) => {
  Post.find().exec((err: any, posts: any) => {
    if (err) {
      resFunc({ res, err });
    }
    resFunc({ res, data: posts });
  });
});

export default router;
