import React, { useState } from "react";
import { IProps } from "./interface/Button.interface";
import * as S from "./style";

const Button = ({ id, className, value, disabled, onClick, size, children }: IProps) => {
  const [timer, setTimer] = useState<any>(0);

  const debounceOnClick = () => {
    if (timer) {
      clearTimeout(timer);
    }

    setTimer(setTimeout(onClick, 100));
  };

  return (
    <S.Button id={id} size={size} className={className} value={value} disabled={disabled} onClick={debounceOnClick}>
      {children}
    </S.Button>
  );
};

export default Button;
