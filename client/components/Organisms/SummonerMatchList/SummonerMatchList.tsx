import React from "react";
import Skeleton from "react-loading-skeleton";
import { IComparingWithEnemy } from "../../../toolkit/riot/gameInfoSlice/interface/gameInfo.interface";
import SummonerMatchItem from "../SummonerMatchItem/SummonerMatchItem";
import "react-loading-skeleton/dist/skeleton.css";

import * as S from "./style";

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
            <Skeleton width="100%" height="110px" />
          </>
        ) : (
          <>
            {matchArr.map((match) => (
              <SummonerMatchItem key={match.gameId} match={match} />
            ))}
          </>
        )}
      </S.MatchList>
    </>
  );
};

export default SummonerMatchList;
