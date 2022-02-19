import React from "react";
import { Jandi } from "../../../actions/interface/jandi.interface";
import { LineWinOrLoseType } from "../../../actions/interface/lineWinOrLose.interface";
import { ComparingWithEnemyType } from "../../../actions/interface/matchSummary.interface";
import { SummonerType } from "../../../actions/interface/summoner.interface";
import useSearch from "../../../hooks/useSearch";
import BarGraph from "../../Graph/BarGraph/BarGraph";
import CalendarGraph from "../../Graph/CalendarGraph/CalendarGraph";
import SearchSummoner from "../../Organisms/SearchSummoner/SearchSummoner";
import SummonerMatchItem from "../../SummonerMatchItem/SummonerMatchItem";
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

  const getProfileImg = (profileIconId: number) => {
    return (
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/12.3.1/img/profileicon/${profileIconId}.png`}
        alt={`${profileIconId}`}
      />
    );
  };

  return (
    <>
      <SummonerContainer>
        <ProfileImgContainer>{getProfileImg(summoner.profileIconId)}</ProfileImgContainer>
        <SummonerInfo>
          <span>{summoner.name}</span>
          <span>레벨 {summoner.summonerLevel}</span>
        </SummonerInfo>
        <SummonerRank></SummonerRank>
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
