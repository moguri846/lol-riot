import React from "react";
import { Jandi } from "../../../_actions/riot/interface/jandi.interface";
import { LineWinOrLoseType } from "../../../_actions/riot/interface/lineWinOrLose.interface";
import { ComparingWithEnemyType } from "../../../_actions/riot/interface/matchSummary.interface";
import { SummonerType } from "../../../_actions/riot/interface/summoner.interface";
import useSearch from "../../../hooks/useSearch";
import BarGraph from "../../Graph/BarGraph/BarGraph";
import CalendarGraph from "../../Graph/CalendarGraph/CalendarGraph";
import SummonerMatchItem from "../../SummonerMatchItem/SummonerMatchItem";
import { getDataDragonImg } from "../../../pages/common/commonFunc";

import {
  SummonerContainer,
  ProfileImgContainer,
  SummonerInfo,
  SummonerRank,
  GraphContainer,
  CalendarGraphContainer,
  BarGraphContainer,
  MatchList,
} from "./style";

interface IProps {
  summoner: SummonerType;
  matchSummary: ComparingWithEnemyType[];
  jandi: Jandi[];
  lineWinOrLose: LineWinOrLoseType[];
}

function SummonerTemplate({ summoner, matchSummary, jandi, lineWinOrLose }: IProps) {
  const { onMatchDetail } = useSearch();

  return (
    <>
      <SummonerContainer>
        <ProfileImgContainer>{getDataDragonImg("profileicon", summoner.profileIconId)}</ProfileImgContainer>
        <SummonerInfo>
          <span>{summoner.name}</span>
          <span>레벨 {summoner.summonerLevel}</span>
          <SummonerRank></SummonerRank>
        </SummonerInfo>
      </SummonerContainer>
      <GraphContainer>
        <CalendarGraphContainer>
          <CalendarGraph jandi={jandi} />
        </CalendarGraphContainer>
        <BarGraphContainer>
          <BarGraph lineWinOrLose={lineWinOrLose} />
        </BarGraphContainer>
      </GraphContainer>
      <MatchList>
        {matchSummary.map((match) => (
          <SummonerMatchItem key={match.gameId} match={match} onMatchDetail={onMatchDetail} />
        ))}
      </MatchList>
    </>
  );
}

export default SummonerTemplate;
