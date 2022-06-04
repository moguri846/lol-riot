import React from "react";
import Skeleton from "react-loading-skeleton";
import * as S from "./style";

const SummonerGameAnalysisSkeleton = () => {
  return (
    <S.GraphContainer>
      <S.CalendarGraphContainer>
        <Skeleton width="25%" height="200px" />
      </S.CalendarGraphContainer>
      <S.BarGraphContainer>
        <Skeleton width="100%" height="200px" />
      </S.BarGraphContainer>
    </S.GraphContainer>
  );
};

export default SummonerGameAnalysisSkeleton;
