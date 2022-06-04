import React, { useState } from "react";
import { IProps } from "./interface/Input.interface";
import * as S from "./style";

const Input = (props: IProps) => {
  const [timer, setTimer] = useState<any>(0);

  const debounceOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (timer) {
        clearTimeout(timer);
      }

      setTimer(setTimeout(() => props.onKeyDown(e), 500));
    }
  };

  return <S.Input {...props} onKeyDown={debounceOnKeyDown} />;
};

export default Input;
