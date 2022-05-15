import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadSummonerInfo } from "../../../../API/riot";
import { RIOT, SUMMONER_INFO } from "../../constant/riot.constant";

const summonerInfoAction = createAsyncThunk(
  `${RIOT}/${SUMMONER_INFO}`,
  async (summonerName: string, { rejectWithValue }) => {
    try {
      const {
        data: { data: summonerInfo },
      } = await loadSummonerInfo(summonerName);

      return summonerInfo;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export { summonerInfoAction };
