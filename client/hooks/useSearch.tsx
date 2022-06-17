import React, { useState } from "react";
import useSnackBar from "./useSnackBar";
import { useRouter } from "next/router";

export interface IUseSearch {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const useSearch = (): IUseSearch => {
  const router = useRouter();

  const { snackbar } = useSnackBar();

  const [summonerName, setSummonerName] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSummonerName(e.currentTarget.value);
  };

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (checkSearchValue(summonerName)) {
        searchSummonerOrMulti();
      }
    }
  };

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (checkSearchValue(summonerName)) {
      searchSummonerOrMulti();
    }
  };

  const checkSearchValue = (summonerName: string) => {
    if (!summonerName) {
      snackbar("소환사 이름을 입력해주세요!", "warning");
      return false;
    }
    return true;
  };

  const searchSummonerOrMulti = () => {
    if (process.env.NODE_ENV !== "production") {
      if (summonerName.includes(".") || summonerName.includes(",")) {
        routerPush("multiSearch", summonerName);
      } else {
        routerPush("summoner", summonerName);
      }
    } else {
      snackbar("유저 검색은 불가능합니다", "warning");
    }
  };

  const routerPush = (type: "summoner" | "multiSearch", summonerName: string) => {
    router.push(`/${type}/${summonerName}`);
  };

  return { value: summonerName, onChange, onEnter, onClick };
};

export default useSearch;
