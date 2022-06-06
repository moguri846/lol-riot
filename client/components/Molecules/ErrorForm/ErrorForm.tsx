import React, { useEffect } from "react";
import useSnackBar from "../../../hooks/useSnackBar";

interface IProps {
  success?: boolean;
  status?: number;
  message: string;
  message404: string;
}

const ErrorForm = ({ status, message, message404 }: IProps) => {
  const { snackbar } = useSnackBar();

  const showMessage = () => {
    return status === 404 ? message404 : message;
  };

  useEffect(() => {
    snackbar(showMessage(), "warning");
  }, []);

  return (
    <>
      <h1>{status}</h1>
      <p>{message}</p>
    </>
  );
};

export default ErrorForm;
