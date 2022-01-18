import { SuccessMatch } from "../actions/interface/riotAction.interface";
import { SUCCESS_MATCH, SUCCESS_DETAIL, FAIL } from "../actions/type";

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

const reducer = (state = initialState, action: SuccessMatch) => {
  switch (action.type) {
    case SUCCESS_MATCH:
      return { ...state, ...action.payload };
    case SUCCESS_DETAIL: {
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
