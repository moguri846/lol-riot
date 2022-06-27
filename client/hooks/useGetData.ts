import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { loadingAction, selectLoading } from "../toolkit/loading/loadingSlice";
import { useAppSelector } from "./useRedux";

interface IProps {
  loadingType: string;
  cb: (arg?) => Promise<AxiosResponse<any>>;
  deps: any;
}

const useGetData = <T>({ loadingType, cb, deps }: IProps) => {
  const loading = useAppSelector(selectLoading)[loadingType];

  const dispatch = useDispatch();

  const [data, setData] = useState<{ success: boolean; data: T }>({
    success: false,
    data: null,
  });

  const [error, setError] = useState({
    isError: false,
    status: 0,
    message: "",
  });

  const loadingStateUpadte = (loading: boolean) => {
    dispatch(loadingAction({ [loadingType]: loading }));
  };

  const setTimeoutLoadingStateUpdate = (loading: boolean) => {
    setTimeout(() => loadingStateUpadte(loading), 0);
  };

  useEffect(() => {
    (async () => {
      try {
        loadingStateUpadte(true);
        setData({ success: false, data: null });
        setError({ isError: false, status: 0, message: "" });

        const {
          data: { success, data: res },
        } = await cb();

        setData(() => {
          setTimeoutLoadingStateUpdate(false);

          return { success, data: res };
        });
      } catch (err: any) {
        const response = err.response;

        const status = response.status;
        const message = response.data;

        setError({ isError: true, status, message });

        loadingStateUpadte(false);
      }
    })();
  }, [deps]);

  return { loading, data, error };
};

export default useGetData;
