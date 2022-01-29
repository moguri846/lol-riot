export interface ComparingWithEnemyType {
  enemy: PlayerType;
  gameCreation: number;
  player: PlayerType;
}

interface PlayerType {
  goldEarned: number;
  physicalDamageDealtToChampions: number;
  totalDamageDealt: number;
}
