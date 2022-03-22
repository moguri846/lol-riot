import React, { useState } from "react";
import { ComparingWithEnemyType } from "../../../_actions/riot/interface/matchSummary.interface";
import { TOTAL_CS, TOTAL_GOLD, XP } from "../../Molecules/LineGraph/constant/LineGraph.constant";
import { TimelineOptionsType } from "../../Molecules/LineGraph/interface/LineGraph.interface";
import LineGraph from "../../Molecules/LineGraph/LineGraph";
import ProgressBar from "../../Molecules/ProgressBar/ProgressBar";
import { ANALYSIS, TIMELINE } from "../SummonerMatchItem/constant/SummonerMatchItem.constant";
import { IOptionsList, MatchDetailOptionsType } from "../SummonerMatchItem/interface/SummonerMatchItem.interface";

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

const SummonerMatchDetail = ({ match }: IProps) => {
  const [matchDetailOptions, setMatchDetailOptions] = useState<MatchDetailOptionsType[]>([ANALYSIS, TIMELINE]);
  const [matchDetailSelected, setSelectMatchDetailOption] = useState<MatchDetailOptionsType>(ANALYSIS);
  const [timelineOptions, setTimelineOptions] = useState<TimelineOptionsType[]>([TOTAL_GOLD, TOTAL_CS, XP]);
  const [timelineSelected, setSelectTimelineOption] = useState<TimelineOptionsType>(TOTAL_GOLD);

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
    <>
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
    </>
  );
};

export default SummonerMatchDetail;
