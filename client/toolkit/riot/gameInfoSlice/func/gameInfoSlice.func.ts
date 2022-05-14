import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { loadMatchDetailInfo, loadMatchInfo } from "../../../../API/riot";
import { GAME_INFO, MATCH_DETAIL, RIOT } from "../../constant/riot.constant";
import { IMatchInfoResponse } from "../interface/gameInfo.interface";
import { IMatchDetailParameter, IMatchDetailResponse } from "../interface/matchDetail.interface";

const gameInfoAction = createAsyncThunk(`${RIOT}/${GAME_INFO}`, async (puuid: string, { rejectWithValue }) => {
  try {
    const {
      data: { data },
    }: AxiosResponse<IMatchInfoResponse> = await loadMatchInfo(puuid);

    return data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const matchDetailAction = createAsyncThunk(
  `${RIOT}/${MATCH_DETAIL}`,
  async (matchDetailParameter: IMatchDetailParameter, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      }: AxiosResponse<IMatchDetailResponse> = await loadMatchDetailInfo(matchDetailParameter);

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export { gameInfoAction, matchDetailAction };
