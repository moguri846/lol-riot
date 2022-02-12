import React from "react";
import { Input } from "../../elememts/index";
import useSearch from "../../customHook/useSearch";

const IndexPage = () => {
  const [summonerName, onChange, onEnter, onClick] = useSearch();

  return (
    <>
      <div>
        <h1>롤 전적 검색</h1>
      </div>
      <div>
        <Input type="text" placeholder="소환사 이름" value={summonerName} onChange={onChange} onKeyDown={onEnter} />
        <button onClick={onClick}>검색</button>
      </div>
    </>
  );
};

export default IndexPage;
