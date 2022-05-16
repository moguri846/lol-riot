import { createAsyncThunk } from "@reduxjs/toolkit";
import { myInfo } from "../../../../API/auth";
import { INFO, USER } from "../../constant/user.constant";

const myInfoAction = createAsyncThunk(`${USER}/${INFO}`, async (type: string, { rejectWithValue }) => {
  try {
    const {
      data: { data: info },
    } = await myInfo();

    return info;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export { myInfoAction };