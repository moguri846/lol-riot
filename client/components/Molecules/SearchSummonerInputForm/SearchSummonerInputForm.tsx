import React from "react";
import Input from "../../Atoms/Input/Input";
import Button from "../../Atoms/Button/Button";
import { IUseSearch } from "../../../hooks/useSearch";
import * as S from "./style";

const SearchSummonerInputForm = ({
  summonerName,
  onChange,
  onEnter,
  onClick,
}: Omit<IUseSearch, "onMatchDetail" | "multiSearch">) => {
  return (
    <>
      <S.SearchFormContainer>
        <Input type="text" placeholder="소환사 이름" value={summonerName} onChange={onChange} onKeyDown={onEnter} />
        <Button label="검색" onClick={onClick} />
      </S.SearchFormContainer>
    </>
  );
};

export default SearchSummonerInputForm;
