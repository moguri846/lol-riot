import React, { useEffect, useState } from "react";
import moment from "moment";
import { ComparingWithEnemyType, PlayerType } from "../../_actions/riot/interface/matchSummary.interface";
import LineGraph from "../Graph/LineGraph/LineGraph";
import {
  ChampionStatus,
  Item,
  Items,
  Kda,
  LineGraphContainer,
  MatchInfo,
  MatchItem,
  MatchItemContainer,
  MatchStatusContainer,
  Player,
  PlayerStatus,
} from "./style";
import { TOTAL_GOLD, XP } from "../Graph/LineGraph/constant/LineGraph.constant";
import { LineOptionsType } from "../Graph/LineGraph/interface/LineGraph.interface";
import { getDataDragonImg } from "../../pages/common/commonFunc";

import "moment/locale/ko";

interface IProps {
  match: ComparingWithEnemyType;
  onMatchDetail: (s: ComparingWithEnemyType) => void;
}

const SummonerMatchItem = ({ match, onMatchDetail }: IProps) => {
  const [players, setPlayers] = useState<PlayerType[]>([]);
  const [timelineOptions, setTimelineOptions] = useState<LineOptionsType[]>([TOTAL_GOLD, XP]);
  const [selectOption, setSelectOption] = useState<LineOptionsType>(TOTAL_GOLD);

  useEffect(() => {
    setPlayers([{ ...match.player }, { ...match.enemy }]);
  }, []);

  const onSelectOption = (e: React.MouseEvent<HTMLLIElement>) => {
    let option: LineOptionsType;

    switch (e.currentTarget.id) {
      case TOTAL_GOLD:
        option = TOTAL_GOLD;
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
              {players.map((player, idx) => (
                <Player key={idx} className={idx === 1 ? "enemy" : "player"}>
                  <Items className="items">
                    {player.items.map((item, idx) => (
                      <React.Fragment key={idx}>
                        {item === 0 ? <Item className="none" /> : <Item>{getDataDragonImg("item", item)}</Item>}
                      </React.Fragment>
                    ))}
                  </Items>
                  <Kda className="kda">
                    <span>
                      {player.kills} / {player.deaths} / {player.assists}
                    </span>
                  </Kda>
                  <PlayerStatus className="player-status">
                    <span className="level">레벨 {player.champLevel}</span>
                    <span className="cs">CS {player.cs}</span>
                  </PlayerStatus>
                  <ChampionStatus className="champion-status">
                    <div className="spell-img-container">
                      {player.spells.map((spell) => getDataDragonImg("spell", spell))}
                    </div>
                    <div className="champion-img-container">{getDataDragonImg("champion", player.championName)}</div>
                  </ChampionStatus>
                </Player>
              ))}
            </MatchStatusContainer>
          </MatchItem>
        </summary>
        <LineGraphContainer>
          <ul>
            {timelineOptions.map((option) => (
              <li onClick={onSelectOption} id={option} key={option}>
                {engToKor(option)}
              </li>
            ))}
          </ul>
          <LineGraph timeline={match.detail?.timeLine} option={selectOption} />
        </LineGraphContainer>
      </details>
    </MatchItemContainer>
  );
};

export default SummonerMatchItem;
