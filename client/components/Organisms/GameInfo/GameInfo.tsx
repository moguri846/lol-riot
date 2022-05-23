import React from "react";
import { GameInfoType } from "../../../toolkit/riot/gameInfoSlice/interface/gameInfo.interface";
import ErrorForm from "../../Molecules/ErrorForm/ErrorForm";
import SummonerGameAnalysis from "../SummonerGameAnalysis/SummonerGameAnalysis";
import SummonerMatchList from "../SummonerMatchList/SummonerMatchList";

interface IProps {
  loading: boolean;
  gameInfo: GameInfoType;
}

const GameInfo = ({ loading, gameInfo }: IProps) => {
  return (
    <>
      {gameInfo.success === false ? (
        <>
          <ErrorForm {...gameInfo} />
        </>
      ) : (
        <>
          <SummonerGameAnalysis loading={loading} jandi={gameInfo.jandi} lineWinOrLose={gameInfo.lineWinOrLose} />
          <SummonerMatchList loading={loading} matchArr={gameInfo.matchArr} />
        </>
      )}
    </>
  );
};

export default GameInfo;
