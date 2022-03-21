import React, { useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { ComparingWithEnemyType } from "../../../_actions/riot/interface/matchSummary.interface";
import LineGraph from "../../Molecules/LineGraph/LineGraph";
import useSnackBar from "../../../hooks/useSnackBar";
import { TOTAL_CS, TOTAL_GOLD, XP } from "../../Molecules/LineGraph/constant/LineGraph.constant";
import { TimelineOptionsType } from "../../Molecules/LineGraph/interface/LineGraph.interface";
import { getDataDragonImg } from "../../../pages/common/commonFunc";

import "moment/locale/ko";
import ProgressBar from "../../Molecules/ProgressBar/ProgressBar";
import { ANALYSIS, TIMELINE } from "./constant/SummonerMatchItem.constant";
import { IOptionsList, MatchDetailOptionsType } from "./interface/SummonerMatchItem.interface";
import { matchDetailInfo } from "../../../_actions/riot/riotActions";

import * as S from "./style";
interface IProps {
  match: ComparingWithEnemyType;
}

const progressObjs: {
  title: string;
  key: "kills" | "totalGold" | "totalDamageDoneToChampions" | "wardsPlaced" | "totalDamageTaken" | "totalCs";
}[] = [
  { title: "적 처치", key: "kills" },
  { title: "골드 획득량", key: "totalGold" },
  { title: "가한 피해량", key: "totalDamageDoneToChampions" },
  { title: "와드 설치", key: "wardsPlaced" },
  { title: "받은 피해량", key: "totalDamageTaken" },
  { title: "CS", key: "totalCs" },
];

const SummonerMatchItem = ({ match }: IProps) => {
  const dispatch = useDispatch();
  const { snackbar } = useSnackBar();

  const [matchDetailOptions, setMatchDetailOptions] = useState<MatchDetailOptionsType[]>([ANALYSIS, TIMELINE]);
  const [matchDetailSelected, setSelectMatchDetailOption] = useState<MatchDetailOptionsType>(ANALYSIS);
  const [timelineOptions, setTimelineOptions] = useState<TimelineOptionsType[]>([TOTAL_GOLD, TOTAL_CS, XP]);
  const [timelineSelected, setSelectTimelineOption] = useState<TimelineOptionsType>(TOTAL_GOLD);

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

  const handleSelectMatchDetailOption = (e: React.MouseEvent<HTMLLIElement>) => {
    let option: MatchDetailOptionsType;

    switch (e.currentTarget.id) {
      case ANALYSIS:
        option = ANALYSIS;
        break;
      case TIMELINE:
        option = TIMELINE;
        break;
      default:
        option = ANALYSIS;
        break;
    }
    setSelectMatchDetailOption(option);
  };

  const handleSelectTimelineOption = (e: React.MouseEvent<HTMLLIElement>) => {
    let option: TimelineOptionsType;

    switch (e.currentTarget.id) {
      case TOTAL_GOLD:
        option = TOTAL_GOLD;
        break;
      case TOTAL_CS:
        option = TOTAL_CS;
        break;
      case XP:
        option = XP;
        break;
      default:
        option = TOTAL_GOLD;
        break;
    }

    setSelectTimelineOption(option);
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

  const engToKor = (eng: string) => {
    switch (eng) {
      case TOTAL_GOLD:
        return "골드";
      case TOTAL_CS:
        return "미니언";
      case XP:
        return "경험치";
      case ANALYSIS:
        return "경기 분석";
      case TIMELINE:
        return "타임라인";
      default:
        return "";
    }
  };

  const optionList = ({ options, target, onClick }: IOptionsList) => {
    return (
      <S.OptionList>
        {options.map((option) => (
          <S.OptionItem className={option === target ? "selected" : ""} onClick={onClick} id={option} key={option}>
            {engToKor(option)}
          </S.OptionItem>
        ))}
      </S.OptionList>
    );
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
              <span className="game-creation">{moment(match.gameCreation).startOf("minute").fromNow()}</span>
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
        {optionList({
          options: matchDetailOptions,
          target: matchDetailSelected,
          onClick: handleSelectMatchDetailOption,
        })}
        {matchDetailSelected === ANALYSIS && (
          <ul style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
            {progressObjs.map(({ title, key }) => {
              const isPlayerData = key === "kills" || key === "wardsPlaced";

              return (
                <li key={key}>
                  <ProgressBar
                    title={title}
                    players={[
                      {
                        value: match.detail ? (isPlayerData ? match.player[key] : match.detail?.player[key]) : null,
                        champion: match.player.championName,
                      },
                      {
                        value: match.detail ? (isPlayerData ? match.enemy[key] : match.detail?.enemy[key]) : null,
                        champion: match.enemy.championName,
                      },
                    ]}
                  />
                </li>
              );
            })}
          </ul>
        )}
        {matchDetailSelected === TIMELINE && (
          <S.LineGraphContainer>
            {optionList({
              options: timelineOptions,
              target: timelineSelected,
              onClick: handleSelectTimelineOption,
            })}
            <LineGraph timeline={match.detail?.timeLine} option={timelineSelected} />
          </S.LineGraphContainer>
        )}
      </details>
    </S.MatchItemContainer>
  );
};

export default SummonerMatchItem;
