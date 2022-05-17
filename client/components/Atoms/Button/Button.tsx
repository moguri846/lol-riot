import React from "react";
import { IProps } from "./interface/Button.interface";
import * as S from "./style";

const Button = ({ id, className, value, disabled, onClick, size, children }: IProps) => {
  return (
    <S.Button id={id} size={size} className={className} value={value} disabled={disabled} onClick={onClick}>
      {children}
    </S.Button>
  );
};

export default Button;
