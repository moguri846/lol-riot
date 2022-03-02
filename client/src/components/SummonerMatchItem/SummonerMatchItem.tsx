import React, { useEffect, useState } from "react";
import moment from "moment";
import { ComparingWithEnemyType } from "../../_actions/riot/interface/matchSummary.interface";
import LineGraph from "../Graph/LineGraph/LineGraph";
import {
  ChampionStatus,
  Item,
  Items,
  Kda,
  LineGraphContainer,
  LineGraphOptionItem,
  LineGraphOptionList,
  MatchInfo,
  MatchItem,
  MatchItemContainer,
  MatchStatusContainer,
  Player,
  Players,
  PlayerStatus,
} from "./style";
import { TOTAL_CS, TOTAL_GOLD, XP } from "../Graph/LineGraph/constant/LineGraph.constant";
import { LineOptionsType } from "../Graph/LineGraph/interface/LineGraph.interface";
import { getDataDragonImg } from "../../pages/common/commonFunc";

import "moment/locale/ko";

interface IProps {
  match: ComparingWithEnemyType;
  onMatchDetail: (s: ComparingWithEnemyType) => void;
}

const SummonerMatchItem = ({ match, onMatchDetail }: IProps) => {
  const [timelineOptions, setTimelineOptions] = useState<LineOptionsType[]>([TOTAL_GOLD, TOTAL_CS, XP]);
  const [selectOption, setSelectOption] = useState<LineOptionsType>(TOTAL_GOLD);

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

    setSelectOption(option);
  };

  const engToKor = (eng: LineOptionsType) => {
    switch (eng) {
      case TOTAL_GOLD:
        return "골드";
      case TOTAL_CS:
        return "미니언";
      case XP:
        return "경험치";
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

  const onMatchDetailToggle = (match: ComparingWithEnemyType) => {
    if (!match.detail) {
      onMatchDetail(match);
    }
  };

  return (
    <MatchItemContainer className={match.win ? "win" : "lose"}>
      <details>
        <summary onClick={() => onMatchDetailToggle(match)}>
          <MatchItem>
            <MatchInfo>
              <span className="game-mode">{match.gameMode}</span>
              <span className="win-lose">{match.win ? "승리" : "패배"}</span>
              <span className="game-duration">{gameDuration(match.gameEndTimestamp, match.gameDuration)}</span>
              <span className="game-creation">{moment(match.gameCreation).startOf("hour").fromNow()}</span>
            </MatchInfo>
            <MatchStatusContainer>
              <ChampionStatus className="champion-status">
                <div className="champion-img-container">{getDataDragonImg("champion", match.player.championName)}</div>
                <div className="spell-img-container">
                  {match.player.spells.map((spell) => getDataDragonImg("spell", spell))}
                </div>
              </ChampionStatus>
              <Kda className="kda">
                <span className="kill">{match.player.kills}</span>/<span className="deaths">{match.player.deaths}</span>
                /<span className="assists">{match.player.assists}</span>
              </Kda>
              <PlayerStatus className="player-status">
                <div className="lelvel">
                  레벨 <span>{match.player.champLevel}</span>
                </div>
                <div className="cs">
                  CS <span>{match.player.cs}</span>
                </div>
              </PlayerStatus>
              <Items className="items">
                {match.player.items.map((item, idx) => (
                  <React.Fragment key={idx}>
                    {item === 0 ? <Item className="none" /> : <Item>{getDataDragonImg("item", item)}</Item>}
                  </React.Fragment>
                ))}
              </Items>
              <Players>
                {match.players.map((player) => (
                  <Player
                    key={player.summonerName}
                    className={match.player.summonerName === player.summonerName ? "me" : ""}
                  >
                    <div className="champion-img">{getDataDragonImg("champion", player.championName)}</div>
                    <div className="summoner-name">{player.summonerName}</div>
                  </Player>
                ))}
              </Players>
            </MatchStatusContainer>
          </MatchItem>
        </summary>
        <LineGraphContainer>
          <LineGraphOptionList>
            {timelineOptions.map((option) => (
              <LineGraphOptionItem
                className={option === selectOption ? "selected" : ""}
                onClick={onSelectOption}
                id={option}
                key={option}
              >
                {engToKor(option)}
              </LineGraphOptionItem>
            ))}
          </LineGraphOptionList>
          <LineGraph timeline={match.detail?.timeLine} option={selectOption} />
        </LineGraphContainer>
      </details>
    </MatchItemContainer>
  );
};

export default SummonerMatchItem;
