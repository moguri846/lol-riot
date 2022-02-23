import React from "react";
import useSearch from "../../../hooks/useSearch";
import { Button } from "../../Atoms/Button/style";
import SearchSummonerInputForm from "../../Molecules/SearchSummonerInputForm/SearchSummonerInputForm";
import { Link } from "react-router-dom";
import * as S from "./style";

const Header = () => {
  const { summonerName, onChange, onEnter, onClick } = useSearch();

  const selecetHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    const lis = document.querySelectorAll("ul li");
    lis.forEach((li) => li.classList.remove("selected"));

    e.currentTarget.classList.add("selected");
  };

  return (
    <S.Header>
      <S.HeadeTop>
        <S.Ttile>Search My Name</S.Ttile>
        <S.InputFormContainer>
          <SearchSummonerInputForm
            summonerName={summonerName}
            onChange={onChange}
            onEnter={onEnter}
            onClick={onClick}
          />
        </S.InputFormContainer>
        <S.LoginButtonContainer>
          <Link to="/login">
            <Button>로그인</Button>
          </Link>
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
