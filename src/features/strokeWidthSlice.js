import { createSlice } from "@reduxjs/toolkit";

const  initialState = {
  strokeWidth: 2,
}

const strokeWidthSlice = createSlice({
  name: "strokeWidth",
  initialState,
  reducers: {
    setStrokeWidth: (state, action) => {
      state.strokeWidth = Number(action.payload.strokeWidth);
    },
  }
})

export const { setStrokeWidth } = strokeWidthSlice.actions;
export default strokeWidthSlice.reducer;