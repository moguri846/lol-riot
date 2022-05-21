import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { loadSpectatorInfo } from "../../../../API/riot";
import { RIOT, SPECTATOR_INFO } from "../../constant/riot.constant";
import { ISpectator } from "../interface/spectatorSlice.interface";

const spectatorInfo = createAsyncThunk(
  `${RIOT}/${SPECTATOR_INFO}`,
  async (encryptedSummonerId: string, { rejectWithValue }) => {
    try {
      const {
        data: { data: spectator },
      }: AxiosResponse<{ data: ISpectator }> = await loadSpectatorInfo(encryptedSummonerId);
      return spectator;
    } catch (err) {
      const response = err.response;
      const status = response.status;
      const data = response.data;

      return rejectWithValue({ status, ...data });
    }
  }
);

export { spectatorInfo };
