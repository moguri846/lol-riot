import React, { useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { ComparingWithEnemyType } from "../../_actions/riot/interface/matchSummary.interface";
import LineGraph from "../Graph/LineGraph/LineGraph";
import { useSnackbar } from "notistack";
import * as S from "./style";
import { TOTAL_CS, TOTAL_GOLD, XP } from "../Graph/LineGraph/constant/LineGraph.constant";
import { LineOptionsType } from "../Graph/LineGraph/interface/LineGraph.interface";
import { getDataDragonImg } from "../../pages/common/commonFunc";

import "moment/locale/ko";
import ProgressBar from "../ProgressBar/ProgressBar";
import { ANALYSIS, TIMELINE } from "./constant/SummonerMatchItem.constant";
import { OptionType } from "./interface/SummonerMatchItem.interface";
import { matchDetailInfo } from "../../_actions/riot/riotActions";

interface IProps {
  match: ComparingWithEnemyType;
}

const SummonerMatchItem = ({ match }: IProps) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [options, setOptions] = useState<OptionType[]>([ANALYSIS, TIMELINE]);
  const [selectOption, setSelectOption] = useState<OptionType>(ANALYSIS);
  const [timelineOptions, setTimelineOptions] = useState<LineOptionsType[]>([TOTAL_GOLD, TOTAL_CS, XP]);
  const [selectTimeLineOption, setSelectTimeLineOption] = useState<LineOptionsType>(TOTAL_GOLD);

  const onSelectOption = (e: React.MouseEvent<HTMLLIElement>) => {
    let option: LineOptionsType;

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

    setSelectTimeLineOption(option);
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

  const handleSelectOption = (e: React.MouseEvent<HTMLLIElement>) => {
    let option: OptionType;

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
    setSelectOption(option);
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
      enqueueSnackbar(err, {
        variant: "error",
      });
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
        <S.OptionList>
          {options.map((option) => (
            <S.OptionItem
              className={option === selectOption ? "selected" : ""}
              onClick={handleSelectOption}
              id={option}
              key={option}
            >
              {engToKor(option)}
            </S.OptionItem>
          ))}
        </S.OptionList>
        {selectOption === ANALYSIS && (
          <ul style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
            <li>
              <ProgressBar
                title="적 처치"
                players={[
                  { value: match.detail && match.player.kills, champion: match.player.championName },
                  { value: match.detail && match.enemy.kills, champion: match.enemy.championName },
                ]}
              />
            </li>
            <li>
              <ProgressBar
                title="골드 획득량"
                players={[
                  { value: match.detail?.player.totalGold, champion: match.player.championName },
                  { value: match.detail?.enemy.totalGold, champion: match.enemy.championName },
                ]}
              />
            </li>
            <li>
              <ProgressBar
                title="가한 피해량"
                players={[
                  { value: match.detail?.player.totalDamageDoneToChampions, champion: match.player.championName },
                  { value: match.detail?.enemy.totalDamageDoneToChampions, champion: match.enemy.championName },
                ]}
              />
            </li>
            <li>
              <ProgressBar
                title="와드 설치"
                players={[
                  { value: match.detail && match.player.wardsPlaced, champion: match.player.championName },
                  { value: match.detail && match.enemy.wardsPlaced, champion: match.enemy.championName },
                ]}
              />
            </li>
            <li>
              <ProgressBar
                title="받은 피해량"
                players={[
                  { value: match.detail?.player.totalDamageTaken, champion: match.player.championName },
                  { value: match.detail?.enemy.totalDamageTaken, champion: match.enemy.championName },
                ]}
              />
            </li>
            <li>
              <ProgressBar
                title="CS"
                players={[
                  { value: match.detail?.player.totalCs, champion: match.player.championName },
                  { value: match.detail?.enemy.totalCs, champion: match.enemy.championName },
                ]}
              />
            </li>
          </ul>
        )}
        {selectOption === TIMELINE && (
          <S.LineGraphContainer>
            <S.OptionList>
              {timelineOptions.map((option) => (
                <S.OptionItem
                  className={option === selectTimeLineOption ? "selected" : ""}
                  onClick={onSelectOption}
                  id={option}
                  key={option}
                >
                  {engToKor(option)}
                </S.OptionItem>
              ))}
            </S.OptionList>
            <LineGraph timeline={match.detail?.timeLine} option={selectTimeLineOption} />
          </S.LineGraphContainer>
        )}
      </details>
    </S.MatchItemContainer>
  );
};

export default SummonerMatchItem;
