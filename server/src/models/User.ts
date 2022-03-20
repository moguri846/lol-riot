import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";
import { IUser } from "./interface/User.interface";
import { jwtSecretConfig } from "../config/config";

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
    },
    role: {
      type: Number,
      default: 0,
    },
    access_token: {
      type: String,
    },
    expires_in: {
      type: Number,
    },
    refresh_token: {
      type: String,
    },
    refresh_token_expires_in: {
      type: Number,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) {
        next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          next(err);
        }

        user.password = hash;

        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (
  plainPassword: string,
  cb: (err: any | null, isMatch?: boolean) => void
) {
  bcrypt
    .compare(plainPassword, this.password)
    .then((res) => cb(null, res))
    .catch((err) => cb(err));
};

userSchema.methods.generateToken = function (cb: any) {
  const user = this;

  const accessToken = jwt.sign({}, jwtSecretConfig.jwtSecret, { expiresIn: "30m" });
  const accessTokenExp = moment().add("30", "minute").valueOf();
  const refreshToken = jwt.sign({ id: user._id }, jwtSecretConfig.jwtSecret, { expiresIn: "60d" });
  const refreshTokenExp = moment().add("60", "day").valueOf();

  user.access_token = accessToken;
  user.expires_in = accessTokenExp;
  user.refresh_token = refreshToken;
  user.refresh_token_expires_in = refreshTokenExp;

  const token = {
    access_token: accessToken,
    expires_in: accessTokenExp,
    refresh_token: refreshToken,
    refresh_token_expires_in: refreshTokenExp,
  };

  user.save((err: any) => {
    if (err) {
      cb(err);
    }
    cb(null, token);
  });
};

const User = mongoose.model<IUser & mongoose.Document>("User", userSchema);

export { User };
