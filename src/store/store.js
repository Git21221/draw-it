import { combineReducers, configureStore } from "@reduxjs/toolkit";
import toolbarSlice from "../features/toolbarSlice.js";

const rootReducer = combineReducers({
  toolbar: toolbarSlice,
});
export const store = configureStore({
  reducer: rootReducer,
});
