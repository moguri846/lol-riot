import React from "react";
import Input from "../../Atoms/Input/Input";
import Button from "../../Atoms/Button/Button";
import { IUseSearch } from "../../../hooks/useSearch";

const SearchSummonerInputForm = ({
  summonerName,
  onChange,
  onEnter,
  onClick,
}: Omit<IUseSearch, "onMatchDetail" | "multiSearch">) => {
  return (
    <>
      <Input type="text" placeholder="소환사 이름" value={summonerName} onChange={onChange} onKeyDown={onEnter} />
      <Button onClick={onClick}>검색</Button>
    </>
  );
};

export default SearchSummonerInputForm;
