import { SPECTATOR } from "../../_actions/riot/constant/riot.constant";
import { ISpectator } from "../../_actions/riot/interface/spectator.interface";

const inititalState: ISpectator = {
  gmaeId: 0,
  gameMode: "",
  gameStartTime: 0,
  players: [
    {
      bot: false,
      championId: 0,
      championName: "",
      gameCustomizationObjects: [
        {
          category: "",
          content: "",
        },
      ],
      perks: {
        perkIds: [0, 0],
        perkStyle: 0,
        perkSubStyle: 0,
      },

      profileIconId: 0,
      spells: ["", ""],
      summonerId: "",
      summonerName: "",
      teamId: 0,
    },
  ],
  bannedChampions: [
    {
      championId: 0,
      championName: "",
      pickTurn: 0,
      teamId: 0,
    },
  ],
};

type ActionType = { type: typeof SPECTATOR; payload: ISpectator };

const reducer = (state = inititalState, action: ActionType) => {
  switch (action.type) {
    case SPECTATOR: {
      return { ...state, ...action.payload };
    }
    default: {
      return { ...state };
    }
  }
};

export default reducer;
