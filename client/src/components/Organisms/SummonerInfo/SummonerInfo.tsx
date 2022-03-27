import React from "react";
import Skeleton from "react-loading-skeleton";
import { getDataDragonImg } from "../../../pages/common/commonFunc";
import { toLocaleString } from "../../common/function/common.function";
import { SummonerType } from "../../../_actions/riot/interface/summoner.interface";

import * as S from "./style";
import Button from "../../Atoms/Button/Button";

interface IProps {
  loading?: boolean;
  summoner: SummonerType;
  spectatorToggle?: boolean;
  onSpectatorToggle?: () => Promise<void>;
  searchSummoner?: boolean;
}

const SummonerInfo = ({ loading, summoner, spectatorToggle, onSpectatorToggle, searchSummoner }: IProps) => {
  return (
    <S.SummonerContainer>
      {loading ? (
        <>
          <S.ProfileImgContainer>
            <Skeleton width="120px" height="120px" circle />
            <div className="level">
              <span>
                <Skeleton width="120px" height="21px" />
              </span>
            </div>
          </S.ProfileImgContainer>
          <S.SummonerInfo>
            <div className="info">
              <Skeleton width="154px" height="27px" />
            </div>
            <S.SummonerRank>
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
            </S.SummonerRank>
          </S.SummonerInfo>
        </>
      ) : (
        <>
          {searchSummoner && (
            <S.ProfileImgContainer>
              {getDataDragonImg("profileicon", summoner.profileIconId)}
              <div className="level">
                <span>
                  Level. <span>{toLocaleString(summoner.summonerLevel)}</span>
                </span>
              </div>
            </S.ProfileImgContainer>
          )}
          <S.SummonerInfo>
            <div className="info">
              <span className="name">{summoner.name}</span>
            </div>
            <S.SummonerRank>
              <div className="queue-type">
                <span>{summoner.queueType}</span>
              </div>
              <div className="tier-rank">
                <span className="tier">{summoner.tier || "Unranked"} </span>
                <span className="rank">{summoner.rank}</span>
              </div>
              <div className="league-points">
                <span className="lp">{toLocaleString(summoner.leaguePoints)} LP</span> /{" "}
                <span className="wins">{toLocaleString(summoner.wins)}승</span> /{" "}
                <span className="losses"> {toLocaleString(summoner.losses)}패</span>
              </div>
              <div className="win-rate">
                <span>승률 {Math.ceil((summoner.wins / (summoner.wins + summoner.losses)) * 100) || 0}%</span>
              </div>
            </S.SummonerRank>
            {searchSummoner && (
              <Button onClick={onSpectatorToggle}>{spectatorToggle ? "종합 정보" : "인게임 정보"}</Button>
            )}
          </S.SummonerInfo>
        </>
      )}
    </S.SummonerContainer>
  );
};

export default SummonerInfo;
