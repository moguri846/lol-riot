import { Dispatch } from "react";
import { AnyAction } from "redux";
import { LoadingStatusType, ILoadingStatusParameter } from "./interface/loading.interface";

const loadingAction = (type: LoadingStatusType, status: ILoadingStatusParameter) => (dispatch: Dispatch<any>) => {
  dispatch({
    type,
    payload: status,
  });
};

export { loadingAction };
