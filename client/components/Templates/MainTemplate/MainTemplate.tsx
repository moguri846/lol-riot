import React, { ReactElement } from "react";
import * as S from "./style";

interface IProps {
  Content: ReactElement;
}

const MainTemplate = ({ Content }: IProps) => {
  return (
    <S.Wrap>
      <S.Container>{Content}</S.Container>
    </S.Wrap>
  );
};

export default MainTemplate;
