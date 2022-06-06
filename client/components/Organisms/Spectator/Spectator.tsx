import React from "react";
import Skeleton from "react-loading-skeleton";
import { SpectatorType } from "../../../toolkit/riot/spectatorSlice/interface/spectatorSlice.interface";
import { getDataDragonImg } from "../../common/func/common.func";
import ErrorForm from "../../Molecules/ErrorForm/ErrorForm";

import * as S from "./style";

interface IProps {
  loading: boolean;
  spectator: SpectatorType;
  summonerName: string;
}

const Spectator = ({ loading, spectator, summonerName }: IProps) => {
  return (
    <S.Spectator>
      <>
        {spectator.success === false ? (
          <>
            <ErrorForm message={spectator.data} {...spectator} message404={`${summonerName}님은 게임 중이 아닙니다.`} />
          </>
        ) : (
          <>
            {loading ? (
              <>
                <Skeleton width="100%" height="100%" />
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
                              <li key={spell}>
                                {getDataDragonImg({ width: 12, height: 12, key: "spell", value: spell })}
                              </li>
                            ))}
                          </ul>
                          <div className="champion-img">
                            {getDataDragonImg({ width: 26, height: 26, key: "champion", value: player.championName })}
                          </div>
                        </S.ChampionStatus>
                      </S.SpectatorPlayer>
                    </React.Fragment>
                  ))}
                </S.SpectatorPlayerList>
                <S.BannedChampionList>
                  {spectator.bannedChampions.map((bannedChampion, i) => (
                    <S.BannedChampion key={i}>
                      {getDataDragonImg({ width: 30, height: 30, key: "champion", value: bannedChampion.championName })}
                    </S.BannedChampion>
                  ))}
                </S.BannedChampionList>
              </>
            )}
          </>
        )}
      </>
    </S.Spectator>
  );
};

export default Spectator;
