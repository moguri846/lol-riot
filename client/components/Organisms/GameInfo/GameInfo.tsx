import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { loadingAction } from "../../../toolkit/loading/loadingSlice";
import { isError } from "../../../toolkit/riot/common/func/common.func";
import { gameInfoAction } from "../../../toolkit/riot/gameInfoSlice/func/gameInfoSlice.func";
import { selectGameInfo } from "../../../toolkit/riot/gameInfoSlice/gameInfoSlice";
import {} from "../../../toolkit/riot/gameInfoSlice/interface/gameInfo.interface";
import { selectSummonerInfo } from "../../../toolkit/riot/summonerInfoSlice/summonerInfoSlice";
import ErrorForm from "../../Molecules/ErrorForm/ErrorForm";
import SummonerGameAnalysis from "../SummonerGameAnalysis/SummonerGameAnalysis";
import SummonerMatchList from "../SummonerMatchList/SummonerMatchList";

interface IProps {
  loading: boolean;
}

const GameInfo = ({ loading }: IProps) => {
  const summoner = useAppSelector(selectSummonerInfo);
  const gameInfo = useAppSelector(selectGameInfo);

  return (
    <>
      {isError(summoner) ? (
        <></>
      ) : (
        <>
          {isError(gameInfo) ? (
            <ErrorForm {...gameInfo} message404="게임 정보를 불러오지 못했습니다." />
          ) : (
            <>
              <SummonerGameAnalysis loading={loading} jandi={gameInfo.jandi} lineWinOrLose={gameInfo.lineWinOrLose} />
              <SummonerMatchList loading={loading} matchArr={gameInfo.matchArr} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default GameInfo;
