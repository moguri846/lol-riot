import React from "react";
import moment from "moment";
import SummonerMatchDetail from "../SummonerMatchDetail/SummonerMatchDetail";
import useSnackBar from "../../../hooks/useSnackBar";
import "moment/locale/ko";
import * as S from "./style";
import { matchDetailAction } from "../../../toolkit/riot/gameInfoSlice/func/gameInfoSlice.func";
import { useAppDispatch } from "../../../hooks/useRedux";
import { IComparingWithEnemy } from "../../../toolkit/riot/gameInfoSlice/interface/gameInfo.interface";
import Link from "next/link";
import { getDataDragonImg } from "../../common/func/common.func";
interface IProps {
  match: IComparingWithEnemy;
}

const SummonerMatchItem = ({ match }: IProps) => {
  const dispatch = useAppDispatch();
  const { snackbar } = useSnackBar();

  const gameDuration = (gameEndTimestamp: number | null, gameDuration: number) => {
    let m;
    let s;

    if (gameEndTimestamp) {
      m = Math.floor((gameDuration % 3600) / 60);
      s = Math.floor(gameDuration % 60);
    } else {
      const date = new Date(gameDuration);
      m = date.getMinutes();
      s = date.getSeconds();
    }
    return `${m}분 ${s}초`;
  };

  const handleMatchDetailToggle = (match: IComparingWithEnemy) => {
    if (!match.detail) {
      handleMatchDetail(match);
    }
  };

  const handleMatchDetail = async (match: IComparingWithEnemy) => {
    try {
      const args = {
        gameId: match.gameId,
        player: match.myIndex,
        enemy: match.enemyIndex,
      };

      await dispatch(matchDetailAction(args));
    } catch (err: any) {
      snackbar(err, "error");
    }
  };

  return (
    <S.MatchItemContainer className={match.win ? "win" : "lose"}>
      <details>
        <summary onClick={() => handleMatchDetailToggle(match)}>
          <S.MatchItem>
            <S.MatchInfo>
              <span className="mode">{match.gameMode}</span>
              <span className="win-lose">{match.win ? "승리" : "패배"}</span>
              <span className="duration">{gameDuration(match.gameEndTimestamp, match.gameDuration)}</span>
              <span className="time-stamp">{moment(match.gameEndTimestamp).startOf("minute").fromNow()}</span>
            </S.MatchInfo>
            <S.MatchStatusContainer>
              <S.ChampionStatus className="champion-status">
                <div className="champion-img-container">
                  {getDataDragonImg({ width: 50, height: 50, key: "champion", value: match.player.championName })}
                </div>
                <div className="spell-img-container">
                  {match.player.spells.map((spell) =>
                    getDataDragonImg({ width: 30, height: 30, key: "spell", value: spell })
                  )}
                </div>
              </S.ChampionStatus>
              <S.Kda className="kda">
                <div className="k-d-a">
                  <span className="kill">{match.player.kills}</span>
                  <span className="deaths">{match.player.deaths}</span>
                  <span className="assists">{match.player.assists}</span>
                </div>
                <div>
                  <span className="ratio">
                    {match.player.deaths === 0
                      ? "Perfect"
                      : `${((match.player.kills + match.player.assists) / match.player.deaths).toFixed(2)} `}
                  </span>
                  평점
                </div>
              </S.Kda>
              <S.PlayerStatus className="player-status">
                <div className="lelvel">
                  레벨 <span>{match.player.champLevel}</span>
                </div>
                <div className="cs">
                  CS <span>{match.player.cs}</span>
                </div>
              </S.PlayerStatus>
              <S.Items className="items">
                {match.player.items.map((item, idx) => (
                  <React.Fragment key={idx}>
                    {item === 0 ? (
                      <S.Item className="none" />
                    ) : (
                      <S.Item>{getDataDragonImg({ width: 35, height: 35, key: "item", value: item })}</S.Item>
                    )}
                  </React.Fragment>
                ))}
              </S.Items>
              <S.Players>
                {match.players.map((player) => (
                  <S.Player
                    key={player.summonerName}
                    className={match.player.summonerName === player.summonerName ? "me" : ""}
                  >
                    <div className="champion-img">
                      {getDataDragonImg({ width: 16, height: 16, key: "champion", value: player.championName })}
                    </div>
                    <Link href={`/summoner/${player.summonerName}`}>
                      <div className="summoner-name">{player.summonerName}</div>
                    </Link>
                  </S.Player>
                ))}
              </S.Players>
            </S.MatchStatusContainer>
          </S.MatchItem>
        </summary>
        <SummonerMatchDetail match={match} />
      </details>
    </S.MatchItemContainer>
  );
};

export default SummonerMatchItem;
