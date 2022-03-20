import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "./interface/User.interface";

const saltRounds = 10;

const userSchema = new Schema<IUser & mongoose.Document>(
  {
    username: {
      type: String,
      unique: 1,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: 1,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 20,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser & mongoose.Document>("User", userSchema);

export { User };
