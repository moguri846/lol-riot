import React from "react";
import useSearch from "../../../hooks/useSearch";
import { Button } from "../../Atoms/Button/style";
import { Link } from "react-router-dom";
import * as S from "./style";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerType } from "../../../_reducers/rootReducer";
import { logoutOAuth } from "../../../_actions/user/userActions";
import SearchSummoner from "../SearchSummoner/SearchSummoner";

const Header = () => {
  const { summonerName, onChange, onEnter, onClick } = useSearch();
  const dispatch = useDispatch();

  const isLogin = useSelector((state: RootReducerType) => state.user.token.access_token);

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
            <S.Li onClick={selecetHandler} className="selected">
              홈
            </S.Li>
            <S.Li onClick={selecetHandler}>랭킹</S.Li>
            <S.Li onClick={selecetHandler}>커뮤니티</S.Li>
          </S.Ul>
        </nav>
        <div className="famous-saying">명언</div>
      </S.HeaderBottom>
    </S.Header>
  );
};

export default Header;
