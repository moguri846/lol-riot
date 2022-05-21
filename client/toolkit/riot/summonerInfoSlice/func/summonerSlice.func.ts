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
      const response = err.response;
      const status = response.status;
      const data = response.data;

      return rejectWithValue({ status, ...data });
    }
  }
);

export { summonerInfoAction };
