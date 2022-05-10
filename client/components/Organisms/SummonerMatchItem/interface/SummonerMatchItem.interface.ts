import { TimelineOptionsType } from "../../../Molecules/LineGraph/interface/LineGraph.interface";
import { LINE_MATCH, ANALYSIS, TIMELINE } from "../constant/SummonerMatchItem.constant";

export interface IOptionsList {
  options: MatchDetailOptionsType[] | TimelineOptionsType[];
  target: MatchDetailOptionsType | TimelineOptionsType;
  onClick: (e: React.MouseEvent<HTMLLIElement>) => void;
}

export type MatchDetailOptionsType = typeof LINE_MATCH | typeof ANALYSIS | typeof TIMELINE;
