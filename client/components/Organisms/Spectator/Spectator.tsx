import React from "react";
import Skeleton from "react-loading-skeleton";
import { getDataDragonImg } from "../../../pages/common/commonFunc";
import { ISpectator, SpectatorType } from "../../../toolkit/riot/spectatorSlice/interface/spectatorSlice.interface";
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
            <ErrorForm {...spectator} />
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
                  {spectator.bannedChampions.map((bannedChampion, i) => (
                    <S.BannedChampion key={i}>
                      {getDataDragonImg("champion", bannedChampion.championName)}
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
