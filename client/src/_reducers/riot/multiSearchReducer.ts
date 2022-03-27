import { MULTI_SEARCH } from "../../_actions/riot/constant/riot.constant";
import { IMultiSearch } from "../../_actions/riot/interface/multiSearch.interface";

const inititalState: IMultiSearch[] = [
  {
    summonerInfo: {
      accountId: "",
      id: "",
      name: "",
      profileIconId: 0,
      puuid: "",
      summonerLevel: 0,
      queueType: "",
      tier: "",
      rank: "",
      leaguePoints: 0,
      wins: 0,
      losses: 0,
    },
    lineWinOrLose: {
      TOP: {
        win: 0,
        lose: 0,
      },
      JUNGLE: {
        win: 0,
        lose: 0,
      },
      MIDDLE: {
        win: 0,
        lose: 0,
      },
      BOTTOM: {
        win: 0,
        lose: 0,
      },
      UTILITY: {
        win: 0,
        lose: 0,
      },
    },
    matchArr: [
      {
        gameCreation: 0,
        gameEndTimestamp: 0,
        championName: "",
        kills: 0,
        assists: 0,
        deaths: 0,
        win: false,
      },
    ],
  },
];

type ActionType = { type: typeof MULTI_SEARCH; payload: IMultiSearch[] };

const reducer = (state = inititalState, action: ActionType) => {
  switch (action.type) {
    case MULTI_SEARCH: {
      return [...action.payload];
    }
    default: {
      return [...state];
    }
  }
};

export default reducer;
