import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import member from "./member/memberSlice";
import items from "./items/itemsSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["member"],
};

const reducers = combineReducers({
  member,
  items,
});

export default persistReducer(persistConfig, reducers);
