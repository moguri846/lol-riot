export interface ComparingWithEnemyType {
  gameId: number;
  gameMode: string;
  gameCreation: number;
  gameEndTimestamp: number | null;
  gameDuration: number;
  player: IPlayer;
  enemy: Pick<IPlayer, "championName" | "kills" | "wardsPlaced" | "detectorWardsPlaced" | "wardsKilled">;
  players: Pick<IPlayer, "championName" | "summonerName">[];
  win: boolean;
  detail: IComparingWithEnemyDetail | null;
  myIndex: number;
  enemyIndex: number;
}

export interface IComparingWithEnemyDetail {
  gameId: number;
  lineMatch: {
    player: {
      level: number;
      xp: number;
      totalCs: number;
      totalDamageDoneToChampions: number;
      totalDamageTaken: number;
      totalGold: number;
    };
    enemy: {
      level: number;
      xp: number;
      totalCs: number;
      totalDamageDoneToChampions: number;
      totalDamageTaken: number;
      totalGold: number;
    };
  };
  timeLine: ITimeLine[];
  player: {
    totalCs: number;
    totalGold: number;
    totalDamageTaken: number;
    totalDamageDoneToChampions: number;
  };
  enemy: {
    totalCs: number;
    totalGold: number;
    totalDamageTaken: number;
    totalDamageDoneToChampions: number;
  };
}

export interface IMatchSummaryDetailParameter {
  gameId: number;
  player: number;
  enemy: number;
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

export interface IPlayer {
  summonerName: string;
  championName: string;
  champLevel: number;
  kills: number;
  deaths: number;
  assists: number;
  cs: number;
  items: number[];
  spells: string[];
  wardsPlaced: number;
  detectorWardsPlaced: number;
  wardsKilled: number;
}
