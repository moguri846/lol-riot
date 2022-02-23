import { Jandi } from "../../actions/riot/interface/jandi.interface";
import { JANDI } from "../../actions/riot/constant/riot.constant";

const inititalState: Jandi[] = [
  {
    date: "2022-01-11",
    win: 0,
    lose: 0,
    count: 0,
  },
];

type ActionType = { type: typeof JANDI; payload: Jandi[] };

const reducer = (state = inititalState, action: ActionType) => {
  switch (action.type) {
    case JANDI: {
      // TODO: return 값 수정
      return [...action.payload];
    }
    default: {
      return [...state];
    }
  }
};

export default reducer;
