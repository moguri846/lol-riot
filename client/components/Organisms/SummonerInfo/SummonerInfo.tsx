import React from "react";
import Button from "../../Atoms/Button/Button";
import * as S from "./style";
import { SummonerType } from "../../../toolkit/riot/summonerInfoSlice/interface/summonerInfoSlice.interface";
import ErrorForm from "../../Molecules/ErrorForm/ErrorForm";
import { getDataDragonImg, toLocaleString } from "../../common/func/common.func";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";

interface IProps {
  loading: boolean;
  summoner: SummonerType;
  spectatorToggle?: boolean;
  onSpectatorToggle?: () => Promise<void>;
  searchSummoner?: boolean;
  multiSearch?: boolean;
}

const SummonerInfo = ({
  loading,
  summoner,
  spectatorToggle,
  onSpectatorToggle,
  searchSummoner,
  multiSearch,
}: IProps) => {
  return (
    <S.SummonerContainer>
      <>
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
                  <div className="tier">
                    <Skeleton width="100px" height="114px" />
                  </div>
                  <div className="rank">
                    <Skeleton width="20px" height="21px" />
                  </div>
                </div>
              </S.SummonerRank>
              {searchSummoner && (
                <>
                  <div className="league-points">
                    <Skeleton width="125px" height="21px" />
                  </div>
                  <div className="win-rate">
                    <Skeleton width="60px" height="18px" />
                  </div>
                  <Skeleton width="125px" height="35px" />
                </>
              )}
            </S.SummonerInfo>
          </>
        ) : (
          <>
            {summoner.success === false ? (
              <ErrorForm message={summoner.data} {...summoner} />
            ) : (
              <>
                {searchSummoner && (
                  <S.ProfileImgContainer>
                    {getDataDragonImg({ width: 120, height: 120, key: "profileicon", value: summoner.profileIconId })}
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
                      <span className="tier">
                        {summoner.tier ? (
                          <Image
                            src={`/assets/image/emblem/${summoner.tier}.png`}
                            width={100}
                            height={114}
                            alt={summoner.tier}
                          />
                        ) : (
                          "Unranked"
                        )}
                      </span>
                      <span className="rank">{summoner.rank}</span>
                    </div>
                    {searchSummoner && (
                      <>
                        <div className="league-points">
                          <span className="lp">{toLocaleString(summoner.leaguePoints)} LP</span> /{" "}
                          <span className="wins">{toLocaleString(summoner.wins)}승</span> /{" "}
                          <span className="losses"> {toLocaleString(summoner.losses)}패</span>
                        </div>
                        <div className="win-rate">
                          <span>승률 {Math.ceil((summoner.wins / (summoner.wins + summoner.losses)) * 100) || 0}%</span>
                        </div>
                        <Button onClick={onSpectatorToggle}>{spectatorToggle ? "종합 정보" : "인게임 정보"}</Button>
                      </>
                    )}
                    {multiSearch && (
                      <>
                        <S.Graph>
                          <div className="radio">
                            <div
                              className="win"
                              style={{
                                width: `${Math.ceil((summoner.wins / (summoner.wins + summoner.losses)) * 100)}%`,
                              }}
                            >
                              <span>{summoner.wins}승</span>
                            </div>
                            <span className="lose">{summoner.losses}패</span>
                          </div>
                          <div
                            className={`win-rate ${
                              Math.ceil((summoner.wins / (summoner.wins + summoner.losses)) * 100) >= 50
                                ? "high"
                                : "low"
                            }`}
                          >
                            <span>{Math.ceil((summoner.wins / (summoner.wins + summoner.losses)) * 100) || 0}%</span>
                          </div>
                        </S.Graph>
                      </>
                    )}
                  </S.SummonerRank>
                </S.SummonerInfo>
              </>
            )}
          </>
        )}
      </>
    </S.SummonerContainer>
  );
};

export default SummonerInfo;
