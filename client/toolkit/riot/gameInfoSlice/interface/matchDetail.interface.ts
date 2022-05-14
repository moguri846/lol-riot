import {
  KILLS,
  LEVEL,
  TOTAL_CS,
  TOTAL_DAMAGE_DONE_TO_CHAMPIONS,
  TOTAL_DAMAGE_TAKEN,
  TOTAL_GOLD,
  WARDS_PLACED,
  XP,
} from "../constant/gameInfoSlice.interface";

export interface IMatchDetailParameter {
  gameId: number;
  player: number;
  enemy: number;
}

export interface IMatchDetailResponse {
  success: boolean;
  data: IComparingWithEnemyDetail;
}

export interface IComparingWithEnemyDetail {
  gameId: number;
  lineMatch: {
    player: IPlayerLineMatch;
    enemy: IPlayerLineMatch;
  };
  timeLine: ITimeLine[];
  player: Pick<IPlayerLineMatch, "totalCs" | "totalGold" | "totalDamageTaken" | "totalDamageDoneToChampions">;
  enemy: Pick<IPlayerLineMatch, "totalCs" | "totalGold" | "totalDamageTaken" | "totalDamageDoneToChampions">;
}

interface IPlayerLineMatch {
  level: number;
  xp: number;
  totalCs: number;
  totalDamageDoneToChampions: number;
  totalDamageTaken: number;
  totalGold: number;
}

export interface ITimeLine {
  player: IDetail;
  enemy: IDetail;
}

interface IDetail {
  championStats: {
    abilityHaste: number;
    abilityPower: number;
    armor: number;
    armorPen: number;
    armorPenPercent: number;
    attackDamage: number;
    attackSpeed: number;
    bonusArmorPenPercent: number;
    bonusMagicPenPercent: number;
    ccReduction: number;
    cooldownReduction: number;
    health: number;
    healthMax: number;
    healthRegen: number;
    lifesteal: number;
    magicPen: number;
    magicPenPercent: number;
    magicResist: number;
    movementSpeed: number;
    omnivamp: number;
    physicalVamp: number;
    power: number;
    powerMax: number;
    powerRegen: number;
    spellVamp: number;
  };
  currentGold: number;
  damageStats: {
    magicDamageDone: number;
    magicDamageDoneToChampions: number;
    magicDamageTaken: number;
    physicalDamageDone: number;
    physicalDamageDoneToChampions: number;
    physicalDamageTaken: number;
    totalDamageDone: number;
    totalDamageDoneToChampions: number;
    totalDamageTaken: number;
    trueDamageDone: number;
    trueDamageDoneToChampions: number;
    trueDamageTaken: number;
  };
  goldPerSecond: number;
  jungleMinionsKilled: number;
  level: number;
  minionsKilled: number;
  participantId: number;
  position: {
    x: number;
    y: number;
  };
  timeEnemySpentControlled: number;
  totalGold: number;
  totalCs: number;
  xp: number;
}

export type CommonMatchDetailType =
  | typeof TOTAL_GOLD
  | typeof TOTAL_DAMAGE_DONE_TO_CHAMPIONS
  | typeof TOTAL_DAMAGE_TAKEN
  | typeof TOTAL_CS;

export type MatchDetailAnalysisType = typeof KILLS | typeof WARDS_PLACED | CommonMatchDetailType;

export type LineMatchType = typeof LEVEL | typeof XP | CommonMatchDetailType;
