import React from "react";
import { getDataDragonImg } from "../../../pages/common/commonFunc";
import { toLocaleString } from "../../common/function/common.function";
import Button from "../../Atoms/Button/Button";
import * as S from "./style";
import { ISummoner, SummonerType } from "../../../toolkit/riot/summonerInfoSlice/interface/summonerInfoSlice.interface";
import ErrorForm from "../../Molecules/ErrorForm/ErrorForm";

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
            <h1>LOADING</h1>
          </>
        ) : (
          <>
            {summoner.success === false ? (
              <ErrorForm {...summoner} />
            ) : (
              <>
                <S.ProfileImgContainer>
                  {getDataDragonImg("profileicon", summoner.profileIconId)}
                  <div className="level">
                    <span>
                      Level. <span>{toLocaleString(summoner.summonerLevel)}</span>
                    </span>
                  </div>
                </S.ProfileImgContainer>
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
                          <img src={`/assets/image/emblem/${summoner.tier}.png`} alt={summoner.tier} />
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
