import React from "react";
import useSearch from "../../customHook/useSearch";
import { Input } from "../../elememts";
import { useSelector } from "react-redux";
import BarGraph from "../../components/BarGraph/BarGraph";
import CalendarGraph from "../../components/CalendarGraph/CalendarGraph";
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

const SummonerPage = () => {
  const { summoner, matchSummary, jandi, lineWinOrLose } = useSelector((state: RootReducer) => state);

  const [summonerName, onChange, onEnter, onClick, onMatchDetail] = useSearch();

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
          <div>
            <Input type="text" placeholder="소환사 이름" value={summonerName} onChange={onChange} onKeyDown={onEnter} />
            <button onClick={onClick}>검색</button>
          </div>
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
        <div>
          <Input type="text" placeholder="소환사 이름" value={summonerName} onChange={onChange} onKeyDown={onEnter} />
          <button onClick={onClick}>검색</button>
        </div>
      )}
    </>
  );
};

export default SummonerPage;
