import React from "react";
import Input from "../../Atoms/Input/Input";
import Button from "../../Atoms/Button/Button";
import * as S from "./style";

interface IProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  placeholder: string;
  buttonValue: string;
}

const InputForm = ({ value, onChange, onEnter, onClick, placeholder, buttonValue }: IProps) => {
  return (
    <>
      <S.InputFormContainer>
        <Input type="text" placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onEnter} />
        <Button onClick={onClick}>{buttonValue}</Button>
      </S.InputFormContainer>
    </>
  );
};

export default InputForm;
