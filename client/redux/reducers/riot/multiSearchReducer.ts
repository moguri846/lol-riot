import { MULTI_SEARCH } from "../../actions/riot/constant/riot.constant";
import { IMultiSearch } from "../../actions/riot/interface/multiSearch.interface";

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
    mostLine: "",
    matchArr: [
      {
        gameCreation: 0,
        gameEndTimestamp: 0,
        individualPosition: "",
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
