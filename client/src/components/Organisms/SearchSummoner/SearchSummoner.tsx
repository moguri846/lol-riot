import React from "react";
import useSearch from "../../../hooks/useSearch";
import SearchSummonerInputForm from "../../Molecules/SearchSummonerInputForm/SearchSummonerInputForm";
import * as S from "./style";

const SearchSummoner = () => {
  const { summonerName, onChange, onEnter, onClick } = useSearch();

  return (
    <S.SearchUserContainer>
      <S.Title>롤 전적 검색</S.Title>
      <S.SearchFormContainer>
        <SearchSummonerInputForm summonerName={summonerName} onChange={onChange} onEnter={onEnter} onClick={onClick} />
      </S.SearchFormContainer>
    </S.SearchUserContainer>
  );
};

export default SearchSummoner;
