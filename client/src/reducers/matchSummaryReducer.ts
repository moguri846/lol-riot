import { ComparingWithEnemyType, IComparingWithEnemyDetail } from "../actions/interface/comparingWithEnemy.interface";
import { FAIL, COMPARING_WITH_ENEMY, COMPARING_WITH_ENEMY_DETAIL } from "../actions/type";

const playerInitialValue = {
  goldEarned: 0,
  physicalDamageDealtToChampions: 0,
  totalDamageDealt: 0,
  index: 0,
};

const initialState: ComparingWithEnemyType[] = [
  {
    gameId: 0,
    gameMode: "",
    gameCreation: 0,
    player: playerInitialValue,
    enemy: playerInitialValue,
    detail: null,
  },
];

type ActionType =
  | { type: typeof COMPARING_WITH_ENEMY; payload: ComparingWithEnemyType[] }
  | { type: typeof COMPARING_WITH_ENEMY_DETAIL; payload: IComparingWithEnemyDetail }
  | { type: typeof FAIL; payload: { success: boolean; errMessage: string } };

const reducer = (state = [...initialState], action: ActionType) => {
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
