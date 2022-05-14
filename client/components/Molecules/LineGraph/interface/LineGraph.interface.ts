import { TOTAL_CS, TOTAL_GOLD, XP } from "../../../../toolkit/riot/gameInfoSlice/constant/gameInfoSlice.interface";
import { ITimeLine } from "../../../../toolkit/riot/gameInfoSlice/interface/matchDetail.interface";

export interface IProps {
  loading: boolean;
  timeline?: ITimeLine[];
  option: TimelineOptionsType;
}

export type TimelineOptionsType = typeof TOTAL_GOLD | typeof TOTAL_CS | typeof XP;
