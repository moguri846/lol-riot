import React, { useEffect, useState } from "react";
import moment from "moment";
import { ComparingWithEnemyType, PlayerType } from "../../actions/interface/matchSummary.interface";
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

  const getChampionImg = (championName: string) => {
    return (
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/12.3.1/img/champion/${championName}.png`}
        alt={`${championName}`}
      />
    );
  };

  const getItemImg = (itemId: number) => {
    return <img src={`http://ddragon.leagueoflegends.com/cdn/12.3.1/img/item/${itemId}.png`} alt={`${itemId}`} />;
  };

  const spellImg = (spellName: string) => {
    return (
      <img
        key={spellName}
        src={`http://ddragon.leagueoflegends.com/cdn/12.3.1/img/spell/${spellName}.png`}
        alt={`${spellName}`}
      />
    );
  };

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

  return (
    <MatchItemContainer className={match.win ? "win" : "lose"}>
      <details>
        <summary onClick={() => onMatchDetail(match)}>
          <MatchItem>
            <MatchInfo>
              <span>{match.gameMode}</span>
              <span>{match.win ? "승리" : "패배"}</span>
              <span>{moment(match.gameCreation).startOf("hour").fromNow()}</span>
            </MatchInfo>
            <MatchStatusContainer>
              {players.map((player, idx) => (
                <Player key={idx} className={idx === 1 ? "enemy" : "player"}>
                  <Items className="items">
                    {player.items.map((item) => (
                      <Item key={item}>{getItemImg(item)}</Item>
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
                    <div className="spell-img-container">{player.spells.map((spell) => spellImg(spell))}</div>
                    <div className="champion-img-container">{getChampionImg(player.championName)}</div>
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
