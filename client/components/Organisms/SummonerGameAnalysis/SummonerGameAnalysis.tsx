import React from "react";
import Skeleton from "react-loading-skeleton";
import { Jandi } from "../../../redux/actions/riot/interface/jandi.interface";
import { ILineWinLoseRate } from "../../../redux/actions/riot/interface/lineWinOrLose.interface";
import BarGraph from "../../Molecules/BarGraph/BarGraph";
import CalendarGraph from "../../Molecules/CalendarGraph/CalendarGraph";

import * as S from "./style";

interface IProps {
  loading: boolean;
  jandi: Jandi[];
  lineWinOrLose: ILineWinLoseRate[];
}

const SummonerGameAnalysis = ({ loading, jandi, lineWinOrLose }: IProps) => {
  return (
    <>
      {loading ? (
        <>
          <S.GraphContainer>
            <S.CalendarGraphContainer>
              <Skeleton width="25%" height="200px" />
            </S.CalendarGraphContainer>
            <S.BarGraphContainer>
              <Skeleton width="100%" height="200px" />
            </S.BarGraphContainer>
          </S.GraphContainer>
        </>
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
