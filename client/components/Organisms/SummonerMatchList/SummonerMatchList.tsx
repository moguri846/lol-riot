import React from "react";
import { IComparingWithEnemy } from "../../../toolkit/riot/gameInfoSlice/interface/gameInfo.interface";
import SummonerMatchItem from "../SummonerMatchItem/SummonerMatchItem";
import "react-loading-skeleton/dist/skeleton.css";

import * as S from "./style";
import SummonerMatchListSkeleton from "./SummonerMatchListSkeleton";

interface IProps {
  loading: boolean;
  matchArr: IComparingWithEnemy[];
}

const SummonerMatchList = ({ loading, matchArr }: IProps) => {
  return (
    <>
      <S.MatchList>
        {loading ? (
          <>
            <SummonerMatchListSkeleton />
          </>
        ) : (
          <>
            {matchArr.length === 0 ? (
              <S.NoMatch>게임 전적이 없습니다.</S.NoMatch>
            ) : (
              <>
                {matchArr.map((match) => (
                  <SummonerMatchItem key={match.gameId} match={match} />
                ))}
              </>
            )}
          </>
        )}
      </S.MatchList>
    </>
  );
};

export default SummonerMatchList;
