import { IUser } from "../models/interface/User.interface";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
