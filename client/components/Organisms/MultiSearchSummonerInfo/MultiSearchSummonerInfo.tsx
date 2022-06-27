import Image from "next/image";
import React from "react";
import { ISummoner } from "../../../toolkit/riot/summonerInfoSlice/interface/summonerInfoSlice.interface";
import * as S from "../SummonerInfo/style";

interface IProps {
  summoner: ISummoner;
}

const MultiSearchSummonerInfo = ({ summoner }: IProps) => {
  return (
    <S.SummonerContainer>
      <>
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
                  Math.ceil((summoner.wins / (summoner.wins + summoner.losses)) * 100) >= 50 ? "high" : "low"
                }`}
              >
                <span>{Math.ceil((summoner.wins / (summoner.wins + summoner.losses)) * 100) || 0}%</span>
              </div>
            </S.Graph>
          </S.SummonerRank>
        </S.SummonerInfo>
      </>
    </S.SummonerContainer>
  );
};

export default MultiSearchSummonerInfo;
