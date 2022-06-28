import React from "react";
import Skeleton from "react-loading-skeleton";
import { loadSpectatorInfo } from "../../../API/riot";
import useGetData from "../../../hooks/useGetData";
import { useAppSelector } from "../../../hooks/useRedux";
import { selectSummonerInfo } from "../../../toolkit/riot/summonerInfoSlice/summonerInfoSlice";
import { getDataDragonImg } from "../../common/func/common.func";
import ErrorForm from "../../Molecules/ErrorForm/ErrorForm";
import { ISpectator } from "./interface/Spectator.interface";
import * as S from "./style";

interface IProps {
  summonerName: string;
}

const Spectator = ({ summonerName }: IProps) => {
  const summoner = useAppSelector(selectSummonerInfo);

  const {
    loading,
    data: { data: spectator },
    error,
  } = useGetData<ISpectator>({
    loadingType: "spectator",
    cb: () => loadSpectatorInfo(summoner.id),
    deps: "",
  });

  return (
    <S.Spectator>
      {
        <>
          {loading ? (
            <Skeleton width="100%" height="100%" />
          ) : (
            <>
              {error.isError ? (
                <ErrorForm message={error.message} {...error} message404={`${summonerName}님은 게임 중이 아닙니다.`} />
              ) : (
                <>
                  <S.SpectatorPlayerList>
                    {spectator?.players.map((player) => (
                      <S.SpectatorPlayer key={player.summonerName} className={player.teamId === 100 ? "blue" : "red"}>
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
                            {getDataDragonImg({
                              width: 26,
                              height: 26,
                              key: "champion",
                              value: player.championName,
                            })}
                          </div>
                        </S.ChampionStatus>
                      </S.SpectatorPlayer>
                    ))}
                  </S.SpectatorPlayerList>
                  <S.BannedChampionList>
                    {spectator?.bannedChampions.map((bannedChampion, i) => (
                      <S.BannedChampion key={i}>
                        {getDataDragonImg({
                          width: 30,
                          height: 30,
                          key: "champion",
                          value: bannedChampion.championName,
                        })}
                      </S.BannedChampion>
                    ))}
                  </S.BannedChampionList>
                </>
              )}
            </>
          )}
        </>
      }
    </S.Spectator>
  );
};

export default Spectator;
