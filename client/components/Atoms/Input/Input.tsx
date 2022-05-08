import React from "react";
import { IProps } from "./interface/Input.interface";
import * as S from "./style";

const Input = (props: IProps) => {
  return <S.Input {...props} />;
};

export default Input;
