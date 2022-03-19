import { TimelineOptionsType } from "../../../Molecules/LineGraph/interface/LineGraph.interface";
import { ANALYSIS, TIMELINE } from "../constant/SummonerMatchItem.constant";

export interface IOptionsList {
  matchDetailOptions: MatchDetailOptionsType[] | TimelineOptionsType[];
  target: MatchDetailOptionsType | TimelineOptionsType;
  onClick: (e: React.MouseEvent<HTMLLIElement>) => void;
}

export type MatchDetailOptionsType = typeof ANALYSIS | typeof TIMELINE;
