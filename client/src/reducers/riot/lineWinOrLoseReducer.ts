import { LineWinOrLoseType } from "../../actions/riot/interface/lineWinOrLose.interface";
import { LINE_WIN_OR_LOSE } from "../../actions/riot/constant/riot.constant";

const inititalState: LineWinOrLoseType[] = [
  {
    line: "",
    win: 0,
    lose: 0,
  },
];

type ActionType = { type: typeof LINE_WIN_OR_LOSE; payload: LineWinOrLoseType[] };

const reducer = (state = inititalState, action: ActionType) => {
  switch (action.type) {
    case LINE_WIN_OR_LOSE: {
      const arr: LineWinOrLoseType[] = [];

      Object.entries(action.payload).map((line) => arr.push({ line: line[0], ...line[1] }));
      return [...arr];
    }
    default: {
      return [...state];
    }
  }
};

export default reducer;
