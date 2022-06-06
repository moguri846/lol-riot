import React, { useEffect } from "react";
import useSnackBar from "../../../hooks/useSnackBar";
import * as S from "./style";

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
    <S.ErrorFormContainer>
      <S.Status>{status !== 404 && status}</S.Status>
      <S.Message>{showMessage()}</S.Message>
    </S.ErrorFormContainer>
  );
};

export default ErrorForm;
