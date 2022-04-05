import mongoose, { Schema, Model, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";
import { IComparePassword_R, IGenerateToken_R, IUser, IUserToken } from "./interface/User.interface";
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

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(saltRounds);

      const hash = await bcrypt.hash(user.password, salt);

      user.password = hash;

      next();
    } catch (err: any) {
      return next(err);
    }
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
  const accessTokenExp = getTimeToSec(30, "minute");
  const refreshToken = jwt.sign({ id: user._id }, jwtSecretConfig.jwtSecret, { expiresIn: "60d" });
  const refreshTokenExp = getTimeToSec(60, "day");

  user.access_token = accessToken;
  user.refresh_token = refreshToken;

  const token: IUserToken = {
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

userSchema.statics.reissueToken = function (refresh_token: string): Promise<string | IUserToken> {
  const accessToken = jwt.sign({}, jwtSecretConfig.jwtSecret, { expiresIn: "30m" });
  const accessTokenExp = getTimeToSec(30, "minute");

  let token: IUserToken = {
    access_token: accessToken,
    expires_in: accessTokenExp,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const user = await this.findOne({ refresh_token });

      const verify = await jwt.verify(refresh_token, jwtSecretConfig.jwtSecret);

      if (typeof verify === "string") {
        throw new Error(verify);
      }

      if (verify.exp) {
        if (verify.exp) {
          const now = moment().unix();
          const exp = verify.exp;

          user.access_token = accessToken;

          if (exp - now <= getTimeToSec(30, "day")) {
            const refreshToken = jwt.sign({ id: user._id }, jwtSecretConfig.jwtSecret, { expiresIn: "60d" });
            const refreshTokenExp = getTimeToSec(60, "day");
            token = {
              ...token,
              refresh_token: refreshToken,
              refresh_token_expires_in: refreshTokenExp,
            };

            user.refresh_token = refreshToken;
          }
          return user
            .save()
            .then(() => resolve(token))
            .catch((err: any) => reject(err));
        }
      }
    } catch (err: any) {
      reject(err);
    }
  });
};

userSchema.statics.findByToken = function (access_token: string): Promise<IUser> {
  return new Promise(async (resolve, reject) => {
    try {
      await jwt.verify(access_token, jwtSecretConfig.jwtSecret);

      const user = await this.findOne({ access_token });

      if (!user) {
        throw new Error("Not Found");
      }

      return resolve(user);
    } catch (err: any) {
      return reject(err);
    }
  });
};

interface IUserDoc extends IUser, Document {
  comparePassword: (password: string) => Promise<IComparePassword_R>;
  generateToken: () => Promise<IGenerateToken_R>;
}

interface IUserModel extends Model<IUserDoc> {
  findByToken: (access_token: string) => Promise<any | IUser>;
  reissueToken: (refresh_token: string) => Promise<any | string | IUserToken>;
}

const User = mongoose.model<IUserDoc, IUserModel>("User", userSchema);

export { User };

const getTimeToSec = (number: number, type: moment.unitOfTime.DurationConstructor) => {
  return moment().add(number, type).unix() - moment().unix();
};
