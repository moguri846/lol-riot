import React from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import SummonerMatchDetail from "../SummonerMatchDetail/SummonerMatchDetail";
import { ComparingWithEnemyType } from "../../../_actions/riot/interface/matchSummary.interface";
import useSnackBar from "../../../hooks/useSnackBar";
import { getDataDragonImg } from "../../../pages/common/commonFunc";
import "moment/locale/ko";
import { matchDetailInfo } from "../../../_actions/riot/riotActions";
import * as S from "./style";
interface IProps {
  match: ComparingWithEnemyType;
}

const SummonerMatchItem = ({ match }: IProps) => {
  const dispatch = useDispatch();
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

  const handleMatchDetailToggle = (match: ComparingWithEnemyType) => {
    if (!match.detail) {
      handleMatchDetail(match);
    }
  };

  const handleMatchDetail = async (match: ComparingWithEnemyType) => {
    try {
      const args = {
        gameId: match.gameId,
        player: match.myIndex,
        enemy: match.enemyIndex,
      };

      await dispatch(matchDetailInfo(args));
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
              <span className="game-mode">{match.gameMode}</span>
              <span className="win-lose">{match.win ? "승리" : "패배"}</span>
              <span className="game-duration">{gameDuration(match.gameEndTimestamp, match.gameDuration)}</span>
              <span className="game-creation">{moment(match.gameEndTimestamp).startOf("minute").fromNow()}</span>
            </S.MatchInfo>
            <S.MatchStatusContainer>
              <S.ChampionStatus className="champion-status">
                <div className="champion-img-container">{getDataDragonImg("champion", match.player.championName)}</div>
                <div className="spell-img-container">
                  {match.player.spells.map((spell) => getDataDragonImg("spell", spell))}
                </div>
              </S.ChampionStatus>
              <S.Kda className="kda">
                <span className="kill">{match.player.kills}</span>/<span className="deaths">{match.player.deaths}</span>
                /<span className="assists">{match.player.assists}</span>
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
                    {item === 0 ? <S.Item className="none" /> : <S.Item>{getDataDragonImg("item", item)}</S.Item>}
                  </React.Fragment>
                ))}
              </S.Items>
              <S.Players>
                {match.players.map((player) => (
                  <S.Player
                    key={player.summonerName}
                    className={match.player.summonerName === player.summonerName ? "me" : ""}
                  >
                    <a href={`/summoner=${player.summonerName}`}>
                      <div className="champion-img">{getDataDragonImg("champion", player.championName)}</div>
                      <div className="summoner-name">{player.summonerName}</div>
                    </a>
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
