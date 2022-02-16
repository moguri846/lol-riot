import React from "react";
import * as S from "./style";

interface IProps {
  id?: string;
  className?: string;
  value?: any;
  disabled?: boolean;
  onClick?: any;
  children?: any;
}

const Button = ({ id, className, value, disabled, onClick, children }: IProps) => {
  return (
    <S.Button id={id} className={className} value={value} disabled={disabled} onClick={onClick}>
      {children}
    </S.Button>
  );
};

export default Button;
