import mongoose, { Schema } from "mongoose";
import { IPost } from "./interface/Post.interface";

const postSchema = new Schema<IPost>(
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

const Post = mongoose.model<IPost>("Post", postSchema);

export { Post };
