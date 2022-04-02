import { Request, Response } from "express";
import { Post } from "../../models/Post";
import { resFunc } from "../../routes/common/ResSuccessOrFalse.function";

export default {
  async create(req: Request, res: Response) {
    try {
      const post = req.body.post;

      await Post.createPost(post);

      return resFunc({ res });
    } catch (err: any) {
      return resFunc({ res });
    }
  },
  async getCategoryPosts(req: Request, res: Response) {
    try {
      const category = req.query.category as string;

      const posts = await Post.getCategoryPosts(category);

      return resFunc({ res, data: posts });
    } catch (err: any) {
      return resFunc({ res, err });
    }
  },
  async getPost(req: Request, res: Response) {
    try {
      const id = req.query.id as string;

      const post = await Post.getPost(id);

      resFunc({ res, data: post });
    } catch (err: any) {
      resFunc({ res, err });
    }
  },
  async updatePost(req: Request, res: Response) {
    try {
      const id = req.query.id as string;
      const newPost: object = req.body;

      await Post.updatePost(id, newPost);

      return resFunc({ res });
    } catch (err: any) {
      return resFunc({ res, err });
    }
  },
  async deletePost(req: Request, res: Response) {
    try {
      const id = req.query.id as string;

      await Post.deletePost(id);

      return resFunc({ res });
    } catch (err: any) {
      return resFunc({ res, err });
    }
  },
};
