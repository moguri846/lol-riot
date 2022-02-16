import React from "react";
import useSearch from "../../hooks/useSearch";
import { useSelector } from "react-redux";
import { RootReducer } from "../../reducers";
import "moment/locale/ko";
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
import SummonerMatchItem from "../../components/SummonerMatchItem/SummonerMatchItem";
import SearchSummoner from "../../components/Organisms/SearchSummoner/SearchSummoner";
import BarGraph from "../../components/Graph/BarGraph/BarGraph";
import CalendarGraph from "../../components/Graph/CalendarGraph/CalendarGraph";

const SummonerPage = () => {
  const { summoner, matchSummary, jandi, lineWinOrLose } = useSelector((state: RootReducer) => state);

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
      {summoner.id !== "" ? (
        <>
          <SearchSummoner />
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
            {matchSummary.map((match, idx) => (
              <SummonerMatchItem key={match.gameId} match={match} onMatchDetail={onMatchDetail} />
            ))}
          </MatchList>
        </>
      ) : (
        <SearchSummoner />
      )}
    </>
  );
};

export default SummonerPage;
