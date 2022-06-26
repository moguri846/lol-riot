import { createAsyncThunk } from "@reduxjs/toolkit";
import { myInfo } from "../../../../API/auth";
import { AuthTypes } from "../../../../API/interface/auth.interface";
import { INFO, USER } from "../../constant/user.constant";

const myInfoAction = createAsyncThunk(`${USER}/${INFO}`, async (type: AuthTypes, { rejectWithValue }) => {
  try {
    const {
      data: { data: info },
    } = await myInfo(type);

    return info;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export { myInfoAction };
