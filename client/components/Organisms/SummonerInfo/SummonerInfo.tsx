import React from "react";
import Button from "../../Atoms/Button/Button";
import { ISummoner } from "../../../toolkit/riot/summonerInfoSlice/interface/summonerInfoSlice.interface";
import ErrorForm from "../../Molecules/ErrorForm/ErrorForm";
import { getDataDragonImg, toLocaleString } from "../../common/func/common.func";
import Image from "next/image";
import SummonerInfoSkeleton from "./SummonerInfoSkeleton";
import useGetData from "../../../hooks/useGetData";
import { loadSummonerInfo } from "../../../API/riot";
import * as S from "./style";

interface IProps {
  summonerName: string;
  spectatorToggle?: boolean;
  onSpectatorToggle?: (id: string) => Promise<void>;
  searchSummoner?: boolean;
  multiSearch?: boolean;
}

const SummonerInfo = ({ summonerName, spectatorToggle, onSpectatorToggle, searchSummoner, multiSearch }: IProps) => {
  const {
    loading,
    data: { data: summoner },
    error,
  } = useGetData<ISummoner>({
    loadingType: "summonerInfo",
    cb: () => loadSummonerInfo(summonerName),
    deps: summonerName,
  });

  return (
    <S.SummonerContainer>
      <>
        {loading ? (
          <SummonerInfoSkeleton searchSummoner={searchSummoner && searchSummoner} />
        ) : (
          <>
            {error.isError ? (
              <ErrorForm message={error.message} {...error} message404="찾으시려는 소화사는 존재하지 않습니다. ☹" />
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
                        <Button onClick={() => onSpectatorToggle(summoner.id)}>
                          {spectatorToggle ? "종합 정보" : "인게임 정보"}
                        </Button>
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
