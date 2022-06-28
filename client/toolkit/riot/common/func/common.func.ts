import { Failed } from "../interface/common.interface";

function isError(obj: any): obj is Failed {
  return obj.status !== undefined && typeof obj.status == "number";
}

export { isError };
