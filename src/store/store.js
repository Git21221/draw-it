import { combineReducers, configureStore } from "@reduxjs/toolkit";
import toolbarSlice from "../features/toolbarSlice.js";
import selectShapeSlice from "../features/selectShapeSlice.js";
import colorSlice from "../features/colorSlice.js";
import strokeWidthSlice from "../features/strokeWidthSlice.js";

const rootReducer = combineReducers({
  toolbar: toolbarSlice,
  selectShape: selectShapeSlice,
  color: colorSlice,
  strokeWidth: strokeWidthSlice,
});
export const store = configureStore({
  reducer: rootReducer,
});
