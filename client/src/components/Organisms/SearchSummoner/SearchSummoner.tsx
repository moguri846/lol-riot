import React from "react";
import useSearch from "../../../hooks/useSearch";
import SearchSummonerInputForm from "../../Molecules/SearchSummonerInputForm/SearchSummonerInputForm";
import * as S from "./style";

interface IProps {
  title: string;
}

const SearchSummoner = ({ title }: IProps) => {
  const { summonerName, onChange, onEnter, onClick } = useSearch();

  return (
    <>
      <S.Title>{title}</S.Title>
      <S.SearchUserContainer>
        <S.SearchFormContainer>
          <SearchSummonerInputForm
            summonerName={summonerName}
            onChange={onChange}
            onEnter={onEnter}
            onClick={onClick}
          />
        </S.SearchFormContainer>
      </S.SearchUserContainer>
    </>
  );
};

export default SearchSummoner;
