import React from "react";
import { Jandi } from "../../../_actions/riot/interface/jandi.interface";
import { LineWinOrLoseType } from "../../../_actions/riot/interface/lineWinOrLose.interface";
import { ComparingWithEnemyType } from "../../../_actions/riot/interface/matchSummary.interface";
import { SummonerType } from "../../../_actions/riot/interface/summoner.interface";
import useSearch from "../../../hooks/useSearch";
import Skeleton from "react-loading-skeleton";
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

import "react-loading-skeleton/dist/skeleton.css";
import { IStatus } from "../../../_actions/status/interface/status.interface";
interface IProps {
  summoner: SummonerType;
  matchSummary: ComparingWithEnemyType[];
  jandi: Jandi[];
  lineWinOrLose: LineWinOrLoseType[];
  loading: IStatus;
}

function SummonerTemplate({ summoner, matchSummary, jandi, lineWinOrLose, loading }: IProps) {
  const { onMatchDetail } = useSearch();

  return (
    <>
      <SummonerContainer>
        {loading.summoner ? (
          <>
            <ProfileImgContainer>
              <Skeleton width="120px" height="120px" circle />
              <div className="level">
                <span>
                  <Skeleton width="120px" height="21px" />
                </span>
              </div>
            </ProfileImgContainer>
            <SummonerInfo>
              <div className="info">
                <Skeleton width="154px" height="27px" />
              </div>
              <SummonerRank>
                <div className="queue-type">
                  <Skeleton width="154px" height="21px" />
                </div>
                <div className="tier-rank">
                  <Skeleton width="154px" height="21px" />
                </div>
                <div className="league-points">
                  <Skeleton width="154px" height="21px" />
                </div>
                <div className="win-rate">
                  <Skeleton width="154px" height="21px" />
                </div>
              </SummonerRank>
            </SummonerInfo>
          </>
        ) : (
          <>
            <ProfileImgContainer>
              {getDataDragonImg("profileicon", summoner.profileIconId)}
              <div className="level">
                <span>
                  Level. <span>{summoner.summonerLevel.toLocaleString()}</span>
                </span>
              </div>
            </ProfileImgContainer>
            <SummonerInfo>
              <div className="info">
                <span className="name">{summoner.name}</span>
              </div>
              <SummonerRank>
                <div className="queue-type">
                  <span>{summoner.queueType}</span>
                </div>
                <div className="tier-rank">
                  <span className="tier">{summoner.tier} </span>
                  <span className="rank">{summoner.rank}</span>
                </div>
                <div className="league-points">
                  <span className="lp">{summoner.leaguePoints.toLocaleString()} LP</span> /{" "}
                  <span className="wins">{summoner.wins}승</span> / <span className="losses"> {summoner.losses}패</span>
                </div>
                <div className="win-rate">
                  <span>승률 {Math.ceil((summoner.wins / (summoner.wins + summoner.losses)) * 100)}%</span>
                </div>
              </SummonerRank>
            </SummonerInfo>
          </>
        )}
      </SummonerContainer>
      {loading.match ? (
        <>
          <GraphContainer>
            <CalendarGraphContainer>
              <Skeleton width="95px" height="200px" />
            </CalendarGraphContainer>
            <BarGraphContainer>
              <Skeleton width="380px" height="190px" />
            </BarGraphContainer>
          </GraphContainer>
          <MatchList>
            <Skeleton width="760px" height="110px" />
          </MatchList>
        </>
      ) : (
        <>
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
      )}
    </>
  );
}

export default SummonerTemplate;
