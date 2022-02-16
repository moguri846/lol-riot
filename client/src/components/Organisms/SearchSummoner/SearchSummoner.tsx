import React from "react";
import useSearch from "../../../hooks/useSearch";
import Input from "../../Atoms/Input/Input";
import Button from "../../Atoms/Button/Button";
import * as S from "./style";

const SearchSummoner = () => {
  const { summonerName, onChange, onEnter, onClick } = useSearch();

  return (
    <S.SearchUserContainer>
      <S.Title>롤 전적 검색</S.Title>
      <S.SearchForm>
        <Input type="text" placeholder="소환사 이름" value={summonerName} onChange={onChange} onKeyDown={onEnter} />
        <Button onClick={onClick}>검색</Button>
      </S.SearchForm>
    </S.SearchUserContainer>
  );
};

export default SearchSummoner;
