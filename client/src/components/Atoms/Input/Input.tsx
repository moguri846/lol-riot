import React from "react";
import * as S from "./style";

interface IProps {
  id?: string;
  className?: string;
  type?: any;
  value?: any;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  minLength?: number;
  onChange?: any;
  onKeyDown?: any;
}

const Input = (props: IProps) => {
  return <S.Input {...props} />;
};

export default Input;
