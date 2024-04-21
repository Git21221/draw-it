import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  borderColor: "#ffffff",
  fillColor: "#2e8b5700",
}

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    setColor: (state, action) => {
      state.borderColor = action.payload.borderColor;
      state.fillColor = action.payload.fillColor;
    },
  },
})

export const { setColor } = colorSlice.actions;
export default colorSlice.reducer;