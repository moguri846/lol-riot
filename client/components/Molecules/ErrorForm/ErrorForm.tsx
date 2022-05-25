import React from "react";

interface IProps {
  success?: boolean;
  status?: number;
  message: string;
}

const ErrorForm = ({ status, message }: IProps) => {
  return (
    <>
      <h1>{status}</h1>
      <p>{message}</p>
    </>
  );
};

export default ErrorForm;
