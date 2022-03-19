import React from "react";
import Skeleton from "react-loading-skeleton";
import { getDataDragonImg } from "../../../pages/common/commonFunc";
import { IFailInitial } from "../../../_actions/common/interface/common.interface";
import { ISpectator } from "../../../_actions/riot/interface/spectator.interface";

import * as S from "./style";

interface IProps {
  loading: boolean;
  spectator: ISpectator;
  summonerName: string;
  fail: IFailInitial;
}

const Spectator = ({ loading, spectator, summonerName, fail }: IProps) => {
  return (
    <S.Spectator>
      {loading ? (
        <>
          <Skeleton width="100%" height="100%" />
        </>
      ) : (
        <>
          {fail ? (
            <>
              {fail.status === 404 ? (
                <div className="not-found">
                  <h1>{summonerName}님은 게임 중이 아닙니다.</h1>
                </div>
              ) : (
                <div className="error">
                  <h1>{fail.status}</h1>
                  <p>{fail.errMessage}</p>
                </div>
              )}
            </>
          ) : (
            <>
              <S.SpectatorPlayerList>
                {spectator.players.map((player) => (
                  <React.Fragment key={player.summonerName}>
                    <S.SpectatorPlayer className={player.teamId === 100 ? "blue" : "red"}>
                      <span className="name">
                        <a href={`/summoner=${player.summonerName}`}>{player.summonerName}</a>
                      </span>
                      <S.ChampionStatus>
                        <ul className="spells">
                          {player.spells.map((spell) => (
                            <li key={spell}>{getDataDragonImg("spell", spell)}</li>
                          ))}
                        </ul>
                        <div className="champion-img">{getDataDragonImg("champion", player.championName)}</div>
                      </S.ChampionStatus>
                    </S.SpectatorPlayer>
                  </React.Fragment>
                ))}
              </S.SpectatorPlayerList>
              <S.BannedChampionList>
                {spectator.bannedChampions.map((bannedChampion) => (
                  <S.BannedChampion>{getDataDragonImg("champion", bannedChampion.championName)}</S.BannedChampion>
                ))}
              </S.BannedChampionList>
            </>
          )}
        </>
      )}
    </S.Spectator>
  );
};

export default Spectator;
