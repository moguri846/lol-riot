import React from "react";
import { IJandi, ILineWinLoseRate } from "../../../toolkit/riot/gameInfoSlice/interface/gameInfo.interface";
import BarGraph from "../../Molecules/BarGraph/BarGraph";
import CalendarGraph from "../../Molecules/CalendarGraph/CalendarGraph";

import * as S from "./style";
import SummonerGameAnalysisSkeleton from "./SummonerGameAnalysisSkeleton";

interface IProps {
  loading: boolean;
  jandi: IJandi[];
  lineWinOrLose: ILineWinLoseRate[];
}

const SummonerGameAnalysis = ({ loading, jandi, lineWinOrLose }: IProps) => {
  return (
    <>
      {loading ? (
        <SummonerGameAnalysisSkeleton />
      ) : (
        <>
          <S.GraphContainer>
            <S.CalendarGraphContainer>
              <CalendarGraph jandi={jandi} />
            </S.CalendarGraphContainer>
            <S.BarGraphContainer>
              <BarGraph lineWinOrLose={lineWinOrLose} />
            </S.BarGraphContainer>
          </S.GraphContainer>
        </>
      )}
    </>
  );
};

export default SummonerGameAnalysis;
