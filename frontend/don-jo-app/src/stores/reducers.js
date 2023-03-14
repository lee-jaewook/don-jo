import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import member from "./member/index.js";
import items from "./items/index.js";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
};

const reducers = combineReducers({
  member,
  items,
});

export default persistReducer(persistConfig, reducers);
