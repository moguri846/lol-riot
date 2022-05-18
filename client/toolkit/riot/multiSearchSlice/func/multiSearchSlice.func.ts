import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { loadMultiSearch } from "../../../../API/riot";
import { MULTI_SEARCH, RIOT } from "../../constant/riot.constant";

const multiSearchAction = createAsyncThunk(
  `${RIOT}/${MULTI_SEARCH}`,
  async (summoners: string[], { rejectWithValue }) => {
    try {
      const { data: multiSearch }: AxiosResponse<any> = await loadMultiSearch(summoners);

      return multiSearch;
    } catch (err) {
      const response = err.response;
      const status = response.status;
      const data = response.data;

      return rejectWithValue({ status, ...data });
    }
  }
);

export { multiSearchAction };
