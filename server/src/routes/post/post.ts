import { Request, Response, Router } from "express";
import { resFunc } from "../common/ResSuccessOrFalse.function";
import { Post } from "../../models/Post";
import { MOST_POPULAR } from "./constant/post.constant";
import { authChecker } from "../../middleware/auth";

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

router.get("/getCategoryPosts", (req: Request, res: Response) => {
  const category = req.query.category;

  if (category === MOST_POPULAR) {
    Post.find()
      .sort({ views: -1 })
      .exec((err: any, posts: any) => {
        if (err) {
          resFunc({ res, err });
        }
        resFunc({ res, data: posts });
      });
  } else {
    Post.find({ category }).exec((err: any, posts: any) => {
      if (err) {
        resFunc({ res, err });
      }
      resFunc({ res, data: posts });
    });
  }
});

router.get("/getPost", (req: Request, res: Response) => {
  const id = req.query.id;

  Post.findOneAndUpdate({ _id: id }, { $inc: { views: 1 } }).exec((err, post) => {
    if (err) {
      resFunc({ res, err });
    }
    if (!post) {
      resFunc({ res, err: { status: 404, message: "Not Found" } });
    } else {
      resFunc({ res, data: post });
    }
  });
});

router.post("/updatePost", (req: Request, res: Response) => {
  const id = req.query.id;
  const { title, content } = req.body;

  Post.updateOne({ _id: id }, { $set: { title, content } }).exec((err: any) => {
    if (err) {
      resFunc({ res, err });
    }
    resFunc({ res });
  });
});

router.get("/deletePost", authChecker, (req: Request, res: Response) => {
  const id = req.query.id;

  Post.deleteOne({ _id: id }).exec((err: any) => {
    if (err) {
      resFunc({ res, err });
    }
    resFunc({ res });
  });
});

export default router;
