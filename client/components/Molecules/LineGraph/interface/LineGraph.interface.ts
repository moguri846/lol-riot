import { ITimeLine } from "../../../../redux/actions/riot/interface/matchSummary.interface";
import { TOTAL_CS, TOTAL_GOLD, XP } from "../../../Organisms/SummonerMatchDetail/constant/SummonerMatchDetail.constant";

export interface IProps {
  loading: boolean;
  timeline?: ITimeLine[];
  option: TimelineOptionsType;
}

export type TimelineOptionsType = typeof TOTAL_GOLD | typeof TOTAL_CS | typeof XP;
