import React, { ReactElement } from "react";
import Header from "../../Organisms/Header/Header";
import * as S from "./style";

interface IProps {
  children: ReactElement;
}

const MainTemplate = ({ children }: IProps) => {
  return (
    <S.Wrap>
      <Header />
      <S.Container>{children}</S.Container>
    </S.Wrap>
  );
};

export default MainTemplate;
