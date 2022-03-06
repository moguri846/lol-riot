import { Dispatch } from "redux";
import { IStatus, StatusType } from "./interface/status.interface";

const statusAction = (type: StatusType, status: IStatus) => (dispatch: Dispatch<any>) => {
  dispatch({
    type,
    payload: status,
  });
};

export { statusAction };
