import {
  ComparingWithEnemyType,
  IComparingWithEnemyDetail,
  IPlayer,
} from "../../actions/riot/interface/matchSummary.interface";
import { COMPARING_WITH_ENEMY, COMPARING_WITH_ENEMY_DETAIL } from "../../actions/riot/constant/riot.constant";
import { FAIL } from "../../actions/common/constant/common.constant";

const playerInitialValue: IPlayer = {
  summonerName: "",
  championName: "",
  champLevel: 0,
  kills: 0,
  deaths: 0,
  assists: 0,
  cs: 0,
  items: [],
  spells: [],
  wardsPlaced: 0,
  detectorWardsPlaced: 0,
  wardsKilled: 0,
};

const initialState: ComparingWithEnemyType[] = [
  {
    gameId: 0,
    gameMode: "",
    gameCreation: 0,
    gameEndTimestamp: null,
    gameDuration: 0,
    enemy: {
      championName: "",
      kills: 0,
      wardsPlaced: 0,
      detectorWardsPlaced: 0,
      wardsKilled: 0,
    },
    player: playerInitialValue,
    players: [{ championName: "", summonerName: "" }],
    win: false,
    myIndex: 0,
    enemyIndex: 0,
    detail: null,
  },
];

type ActionType =
  | { type: typeof COMPARING_WITH_ENEMY; payload: ComparingWithEnemyType[] }
  | { type: typeof COMPARING_WITH_ENEMY_DETAIL; payload: IComparingWithEnemyDetail }
  | { type: typeof FAIL; payload: { success: boolean; errMessage: string } };

const reducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case COMPARING_WITH_ENEMY:
      type CWET = [string, ComparingWithEnemyType];
      const arr: ComparingWithEnemyType[] = [];
      const sparedValue = { ...state, ...action.payload };
      Object.entries(sparedValue).map((value) => {
        const [k, v] = value as CWET;

        arr.push(v);
      });

      return [...arr];
    case COMPARING_WITH_ENEMY_DETAIL: {
      state.filter((match) => {
        if (match.gameId === action.payload.gameId) {
          match.detail = action.payload;
        }
      });
      return [...state];
    }

    default:
      return [...state];
  }
};

export default reducer;
