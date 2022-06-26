import { ISignIn, ISignInParameter, ISignUp, ISignUpParameter } from "../../../../API/interface/auth.interface";

export interface ISignInOrUpParameter extends ISignUpParameter, ISignInParameter {}

export interface ISignInOrUpResponse extends ISignUp, ISignIn {}
