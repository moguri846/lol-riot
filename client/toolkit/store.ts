import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import loading from "./loading/loadingSlice";
import riot from "./riot/riotRootReducer";
import user from "./user/userRootReducer";
import { combineReducers } from "redux";

const rootRedcuer = combineReducers({
  loading,
  riot,
  user,
});

const store = configureStore({
  reducer: rootRedcuer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootReducerType = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

export default store;
