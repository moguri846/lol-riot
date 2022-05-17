import React, { useState } from "react";
import {
  ANALYSIS,
  KILLS,
  LEVEL,
  LINE_MATCH,
  TIMELINE,
  TOTAL_CS,
  TOTAL_DAMAGE_DONE_TO_CHAMPIONS,
  TOTAL_DAMAGE_TAKEN,
  TOTAL_GOLD,
  WARDS_PLACED,
  XP,
} from "../../../toolkit/riot/gameInfoSlice/constant/gameInfoSlice.interface";
import { ComparingWithEnemyType } from "../../../toolkit/riot/gameInfoSlice/interface/gameInfo.interface";
import {
  CommonMatchDetailType,
  LineMatchType,
  MatchDetailAnalysisType,
} from "../../../toolkit/riot/gameInfoSlice/interface/matchDetail.interface";
import { TimelineOptionsType } from "../../Molecules/LineGraph/interface/LineGraph.interface";
import LineGraph from "../../Molecules/LineGraph/LineGraph";
import ProgressBar from "../../Molecules/ProgressBar/ProgressBar";
import { IOptionsList, MatchDetailOptionsType } from "../SummonerMatchItem/interface/SummonerMatchItem.interface";

import * as S from "./style";

interface IProps {
  match: ComparingWithEnemyType;
}

const commonDetailKeys: {
  title: string;
  key: CommonMatchDetailType;
}[] = [
  { title: "골드 획득량", key: TOTAL_GOLD },
  { title: "가한 피해량", key: TOTAL_DAMAGE_DONE_TO_CHAMPIONS },
  { title: "받은 피해량", key: TOTAL_DAMAGE_TAKEN },
  { title: "CS", key: TOTAL_CS },
];

const analysis: {
  title: string;
  key: MatchDetailAnalysisType;
}[] = [{ title: "적 처치", key: KILLS }, { title: "와드 설치", key: WARDS_PLACED }, ...commonDetailKeys];

const lineMatchs: {
  title: string;
  key: LineMatchType;
}[] = [{ title: "레벨", key: LEVEL }, { title: "경험치", key: XP }, ...commonDetailKeys];

const SummonerMatchDetail = ({ match }: IProps) => {
  const [matchDetailOptions, setMatchDetailOptions] = useState<MatchDetailOptionsType[]>([
    LINE_MATCH,
    ANALYSIS,
    TIMELINE,
  ]);
  const [matchDetailSelected, setSelectMatchDetailOption] = useState<MatchDetailOptionsType>(ANALYSIS);
  const [timelineOptions, setTimelineOptions] = useState<TimelineOptionsType[]>([TOTAL_GOLD, TOTAL_CS, XP]);
  const [timelineSelected, setSelectTimelineOption] = useState<TimelineOptionsType>(TOTAL_GOLD);

  const handleSelectMatchDetailOption = (e: React.MouseEvent<HTMLLIElement>) => {
    let option: MatchDetailOptionsType;

    switch (e.currentTarget.id) {
      case LINE_MATCH:
        option = LINE_MATCH;
        break;
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
      case LINE_MATCH:
        return "라인전(14분 기준)";
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
      {matchDetailSelected === LINE_MATCH && (
        <ul style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
          {lineMatchs.map(({ title, key }) => {
            return (
              <li key={key}>
                <ProgressBar
                  title={title}
                  players={[
                    {
                      value: match.detail ? match.detail?.lineMatch.player[key] : null,
                      champion: match.player.championName,
                    },
                    {
                      value: match.detail ? match.detail?.lineMatch.enemy[key] : null,
                      champion: match.enemy.championName,
                    },
                  ]}
                />
              </li>
            );
          })}
        </ul>
      )}
      {matchDetailSelected === ANALYSIS && (
        <ul style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
          {analysis.map(({ title, key }) => {
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
          <LineGraph
            loading={match.detail?.timeLine ? false : true}
            timeline={match.detail?.timeLine && match.detail?.timeLine}
            option={timelineSelected}
          />
        </S.LineGraphContainer>
      )}
    </>
  );
};

export default SummonerMatchDetail;
