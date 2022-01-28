import { MatchDetailType, MatchType } from "../actions/interface/riotAction.interface";
import { MATCH_SUMMARY, MATCH_SUMMARY_DETAIL, FAIL } from "../actions/type";

const initialState = [
  {
    gameCreation: 0,
    gameEndTimestamp: 0,
    gameId: 0,
    gameMode: "",
    gameStartTimestamp: 0,
    player: {
      assists: 0,
      champLevel: 0,
      championName: "",
      cs: 0,
      deaths: 0,
      items: [],
      kills: 0,
      perks: {
        statPerks: {
          defense: 0,
          flex: 0,
          offense: 0,
        },
        styles: {
          description: "",
          selections: [
            {
              perk: 0,
              var1: 0,
              var2: 0,
              var3: 0,
            },
          ],
          style: 0,
        },
      },
    },
    spells: [],
    summonerName: "",
    win: false,
    players: [
      {
        championName: "",
        puuid: "",
        summonerName: "",
      },
    ],
    detail: null,
  },
];

type ActionType =
  | { type: typeof MATCH_SUMMARY; payload: MatchType }
  | { type: typeof MATCH_SUMMARY_DETAIL; payload: MatchDetailType }
  | { type: typeof FAIL; payload: { success: boolean; errMessage: string } };

const reducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case MATCH_SUMMARY:
      return { ...state, ...action.payload };
    case MATCH_SUMMARY_DETAIL: {
      Object.values(state).filter((match) => {
        if (match.gameId === action.payload.gameId) {
          match.detail = action.payload;
        }
      });
      return { ...state };
    }

    default:
      return { ...state };
  }
};

export default reducer;
