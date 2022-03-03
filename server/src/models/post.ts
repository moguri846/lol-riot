import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema(
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

const Post = mongoose.model("Post", postSchema);

export { Post };
