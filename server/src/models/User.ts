import mongoose, { Schema, Model, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";
import { IComparePassword_R, IGenerateToken_R, IUser, Token } from "./interface/User.interface";
import { jwtSecretConfig } from "../config/config";

const saltRounds = 10;

const userSchema = new Schema<IUserDoc>(
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
      default: "",
    },
    refresh_token: {
      type: String,
      default: "",
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

userSchema.methods.comparePassword = function (password: string): Promise<IComparePassword_R> {
  return bcrypt
    .compare(password, this.password)
    .then((res) => res)
    .catch((err) => err);
};

userSchema.methods.generateToken = function (): Promise<IGenerateToken_R> {
  const user = this;

  const accessToken = jwt.sign({}, jwtSecretConfig.jwtSecret, { expiresIn: "30m" });
  const accessTokenExp = moment().add("30", "minute").valueOf();
  const refreshToken = jwt.sign({ id: user._id }, jwtSecretConfig.jwtSecret, { expiresIn: "60d" });
  const refreshTokenExp = moment().add("60", "day").valueOf();

  user.access_token = accessToken;
  user.refresh_token = refreshToken;

  const token: Token = {
    access_token: accessToken,
    expires_in: accessTokenExp,
    refresh_token: refreshToken,
    refresh_token_expires_in: refreshTokenExp,
  };

  return user
    .save()
    .then(() => token)
    .catch((err: any) => err);
};

userSchema.statics.findByToken = function (access_token: string): Promise<any | IUser> {
  return new Promise((resolve, reject) => {
    jwt.verify(access_token, jwtSecretConfig.jwtSecret, (err) => {
      if (err) {
        reject(err);
      }
      this.findOne({ access_token }).exec((err: any, user: IUser) => {
        if (err) {
          reject(err);
        }
        resolve(user);
      });
    });
  });
};

interface IUserDoc extends IUser, Document {
  comparePassword: (password: string) => Promise<IComparePassword_R>;
  generateToken: () => Promise<IGenerateToken_R>;
}

interface IUserModel extends Model<IUserDoc> {
  findByToken: (access_token: string) => Promise<any | IUser>;
}

const User = mongoose.model<IUserDoc, IUserModel>("User", userSchema);

export { User };
