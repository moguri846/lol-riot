import {
  ANALYSIS,
  LINE_MATCH,
  TIMELINE,
} from "../../../../toolkit/riot/gameInfoSlice/constant/gameInfoSlice.interface";
import { TimelineOptionsType } from "../../../Molecules/LineGraph/interface/LineGraph.interface";

export interface IOptionsList {
  options: MatchDetailOptionsType[] | TimelineOptionsType[];
  target: MatchDetailOptionsType | TimelineOptionsType;
  onClick: (e: React.MouseEvent<HTMLLIElement>) => void;
}

export type MatchDetailOptionsType = typeof LINE_MATCH | typeof ANALYSIS | typeof TIMELINE;
