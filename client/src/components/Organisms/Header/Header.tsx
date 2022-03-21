import React from "react";
import { Button } from "../../Atoms/Button/style";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerType } from "../../../_reducers/rootReducer";
import { logoutOAuth } from "../../../_actions/user/oAuthActions";
import Flicking from "@egjs/react-flicking";
import { AutoPlay } from "@egjs/flicking-plugins";
import SearchSummoner from "../SearchSummoner/SearchSummoner";
import * as S from "./style";
import "@egjs/react-flicking/dist/flicking.css";

// TODO: DB로 옮기기
import famousSayingJson from "../../../json/famousSaying.json";

const Header = () => {
  const dispatch = useDispatch();

  const isLogin = useSelector((state: RootReducerType) => state.user.token.isLogin);

  const selecetHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    const lis = document.querySelectorAll("ul li");
    lis.forEach((li) => li.classList.remove("selected"));

    e.currentTarget.classList.add("selected");
  };

  const logout = () => {
    dispatch(logoutOAuth());
  };

  return (
    <S.Header>
      <S.HeadeTop>
        <SearchSummoner title="Search My Name" />
        <S.LoginButtonContainer>
          {isLogin ? (
            <Button onClick={logout}>로그아웃</Button>
          ) : (
            <Link to="/login">
              <Button>로그인</Button>
            </Link>
          )}
        </S.LoginButtonContainer>
      </S.HeadeTop>
      <S.HeaderBottom>
        <nav>
          <S.Ul>
            <S.Li onClick={selecetHandler}>랭킹</S.Li>
            <S.Li onClick={selecetHandler}>커뮤니티</S.Li>
          </S.Ul>
        </nav>
        <div className="famous-saying">
          <Flicking circular horizontal={false} plugins={[new AutoPlay({ duration: 3000 })]}>
            {famousSayingJson.map((item) => (
              <div key={item.name}>
                {item.say} - {item.name}
              </div>
            ))}
          </Flicking>
        </div>
      </S.HeaderBottom>
    </S.Header>
  );
};

export default Header;
