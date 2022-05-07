import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reactThunk from "redux-thunk";
import reducer from "./reducers/rootReducer";

// const store = createStore(reducer, composeWithDevTools(applyMiddleware(reactThunk)));

const initStore = () => {
  return createStore(reducer, composeWithDevTools(applyMiddleware(reactThunk)));
};

export const wrapper = createWrapper(initStore);
