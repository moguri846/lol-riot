import Header from "../Organisms/Header/Header";
import * as S from "./style";

interface IProps {
  children: any;
}

const Layout = ({ children }: any) => {
  return (
    <S.Wrap>
      <Header />
      <S.Container>{children}</S.Container>
    </S.Wrap>
  );
};

export default Layout;
