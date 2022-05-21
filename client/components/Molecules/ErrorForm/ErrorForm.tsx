import React from "react";

interface IProps {
  success: boolean;
  status: number;
  data: string;
}

const ErrorForm = ({ status, data }: IProps) => {
  return (
    <>
      <h1>{status}</h1>
      <p>{data}</p>
    </>
  );
};

export default ErrorForm;
