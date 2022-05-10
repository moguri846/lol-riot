import {
  KILLS,
  LEVEL,
  TOTAL_CS,
  TOTAL_DAMAGE_DONE_TO_CHAMPIONS,
  TOTAL_DAMAGE_TAKEN,
  TOTAL_GOLD,
  WARDS_PLACED,
  XP,
} from "../constant/SummonerMatchDetail.constant";

export type CommonMatchDetailType =
  | typeof TOTAL_GOLD
  | typeof TOTAL_DAMAGE_DONE_TO_CHAMPIONS
  | typeof TOTAL_DAMAGE_TAKEN
  | typeof TOTAL_CS;

export type MatchDetailAnalysisType = typeof KILLS | typeof WARDS_PLACED | CommonMatchDetailType;

export type LineMatchType = typeof LEVEL | typeof XP | CommonMatchDetailType;
