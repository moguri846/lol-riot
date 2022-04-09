import mongoose, { Schema, Document, Model } from "mongoose";
import { MOST_POPULAR } from "../controllers/post/constant/post.constant";
import { IPost } from "./interface/Post.interface";
import { IUser } from "./interface/User.interface";

const postSchema = new Schema<IPost & Document, IPostModel>(
  {
    writer: {
      type: String,
    },
    category: {
      type: String,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

postSchema.statics.createPost = function (postInfo: IPost): Promise<void> {
  const post = new this(postInfo);

  console.log("postInfo", postInfo);

  return new Promise((resolve, reject) => {
    post.save((err: any) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
};

postSchema.statics.getCategoryPosts = function (category: string): Promise<IPost[]> {
  return new Promise((resolve, reject) => {
    this.find(category !== MOST_POPULAR ? { category } : {})
      .sort(category === MOST_POPULAR && { views: -1 })
      .exec((err: any, posts: IPost[]) => {
        if (err) {
          return reject(err);
        }
        return resolve(posts);
      });
  });
};

postSchema.statics.getPost = function (_id: string): Promise<IPost> {
  return new Promise((resolve, reject) => {
    this.findOneAndUpdate({ _id }, { $inc: { views: 1 } }).exec((err, post) => {
      if (err) {
        return reject(err);
      }
      if (!post) {
        reject({ status: 404, message: "Not Found" });
      } else {
        resolve(post);
      }
    });
  });
};

postSchema.statics.updatePost = function (
  newPost: Pick<IPost, "_id" | "category" | "title" | "content">
): Promise<void> {
  const { _id, category, title, content } = newPost;

  return new Promise((resolve, reject) => {
    this.updateOne({ _id }, { $set: { category, title, content } }).exec((err: any) => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
};

postSchema.statics.deletePost = function (_id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    this.deleteOne({ _id }).exec((err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};

type IPostDoc = IPost & Document;

interface IPostModel extends Model<IPostDoc> {
  createPost: (postInfo: IPost) => Promise<any>;
  getCategoryPosts: (category: string) => Promise<IPost[]>;
  getPost: (_id: string) => Promise<IPost>;
  updatePost: (newPost: Pick<IPost, "_id" | "category" | "title" | "content">) => Promise<void>;
  deletePost: (_id: string) => Promise<void>;
}

const Post = mongoose.model<IPostDoc, IPostModel>("Post", postSchema);

export { Post };
