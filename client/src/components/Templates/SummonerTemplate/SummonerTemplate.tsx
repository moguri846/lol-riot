import React, { useState } from "react";
import { Jandi } from "../../../_actions/riot/interface/jandi.interface";
import { LineWinOrLoseType } from "../../../_actions/riot/interface/lineWinOrLose.interface";
import { ComparingWithEnemyType } from "../../../_actions/riot/interface/matchSummary.interface";
import { SummonerType } from "../../../_actions/riot/interface/summoner.interface";
import Skeleton from "react-loading-skeleton";
import BarGraph from "../../Graph/BarGraph/BarGraph";
import CalendarGraph from "../../Graph/CalendarGraph/CalendarGraph";
import SummonerMatchItem from "../../SummonerMatchItem/SummonerMatchItem";
import { getDataDragonImg } from "../../../pages/common/commonFunc";
import {
  ILoading,
  ILoadingStatusParameter,
  LoadingStatusType,
} from "../../../_actions/loading/interface/loading.interface";
import { toLocaleString } from "../../common/function/common.function";
import * as S from "./style";
import "react-loading-skeleton/dist/skeleton.css";
import { ISpectator } from "../../../_actions/riot/interface/spectator.interface";
import Button from "../../Atoms/Button/Button";
import { useDispatch } from "react-redux";
import { spectatorInfo } from "../../../_actions/riot/riotActions";
import { loadingAction } from "../../../_actions/loading/loadingActions";
import { FULFILLED, LOADING } from "../../../_actions/loading/constant/loading.constant";
import useSnackBar from "../../../hooks/useSnackBar";
import { IRiotFail } from "../../../_actions/riot/interface/fail.interface";

interface IProps {
  loading: ILoading;
  summoner: SummonerType;
  spectator: ISpectator;
  jandi: Jandi[];
  lineWinOrLose: LineWinOrLoseType[];
  matchSummary: ComparingWithEnemyType[];
  fail: IRiotFail;
}

function SummonerTemplate({ summoner, matchSummary, spectator, jandi, lineWinOrLose, loading, fail }: IProps) {
  const dispatch = useDispatch();

  const { snackbar } = useSnackBar();

  const [spectatorToggle, setSpectatorToggle] = useState(false);

  const handleSpectatorToggle = async () => {
    setSpectatorToggle(!spectatorToggle);

    if (spectatorToggle) {
      return;
    }

    try {
      setSatusInfo(LOADING, { spectator: true });

      await getSpectatorInfo(summoner.id);

      setSatusInfo(FULFILLED, { spectator: false });
    } catch (err: any) {
      setSatusInfo(FULFILLED, { spectator: false });
      console.log("err", err);

      snackbar(err, "error");
    }
  };

  const setSatusInfo = (type: LoadingStatusType, status: ILoadingStatusParameter) => {
    dispatch(loadingAction(type, status));
  };

  const getSpectatorInfo = async (id: string) => {
    try {
      await dispatch(spectatorInfo(id));
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      <S.SummonerContainer>
        {loading.summoner ? (
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
              <Button onClick={handleSpectatorToggle}>{spectatorToggle ? "종합 정보" : "인게임 정보"}</Button>
            </S.SummonerInfo>
          </>
        )}
      </S.SummonerContainer>
      {spectatorToggle ? (
        <S.Spectator>
          {loading.spectator ? (
            <>
              <Skeleton width="100%" height="100%" />
            </>
          ) : (
            <>
              {fail.spectator ? (
                <>
                  {fail.spectator.status === 404 ? (
                    <div className="not-found">
                      <h1>{summoner.name}님은 게임 중이 아닙니다.</h1>
                    </div>
                  ) : (
                    <div className="error">
                      <h1>{fail.spectator.status}</h1>
                      <p>{fail.spectator.errMessage}</p>
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
      ) : (
        <>
          {loading.gameInfo ? (
            <>
              <S.GraphContainer>
                <S.CalendarGraphContainer>
                  <Skeleton width="25%" height="200px" />
                </S.CalendarGraphContainer>
                <S.BarGraphContainer>
                  <Skeleton width="100%" height="200px" />
                </S.BarGraphContainer>
              </S.GraphContainer>
              <S.MatchList>
                <Skeleton width="100%" height="110px" />
              </S.MatchList>
            </>
          ) : (
            <>
              <S.GraphContainer>
                <S.CalendarGraphContainer>
                  <CalendarGraph jandi={jandi} />
                </S.CalendarGraphContainer>
                <S.BarGraphContainer>
                  <BarGraph lineWinOrLose={lineWinOrLose} />
                </S.BarGraphContainer>
              </S.GraphContainer>
              <S.MatchList>
                {matchSummary.map((match) => (
                  <SummonerMatchItem key={match.gameId} match={match} />
                ))}
              </S.MatchList>
            </>
          )}
        </>
      )}
    </>
  );
}

export default SummonerTemplate;
