export interface ComparingWithEnemyType {
  gameId: number;
  gameMode: string;
  gameCreation: number;
  gameEndTimestamp: number | null;
  gameDuration: number;
  player: PlayerType;
  enemy: PlayerType;
  win: boolean;
  detail: IComparingWithEnemyDetail | null;
}

export interface IComparingWithEnemyDetail {
  gameId: number;
  timeLine: ITimeLine[];
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
  xp: number;
}

interface PlayerType {
  summonerName: string;
  championName: string;
  champLevel: number;
  kills: number;
  deaths: number;
  assists: number;
  cs: number;
  items: number[];
  spells: string[];
  physicalDamageDealtToChampions: number;
  totalDamageDealt: number;
  goldEarned: number;
  index: number;
}
