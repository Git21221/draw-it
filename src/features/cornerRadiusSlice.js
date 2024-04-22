import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cornerRadius: 0,
};

const cornerRadiusSlice = createSlice({
  name: "cornerRadius",
  initialState,
  reducers: {
    setCornerRadius: (state, action) => {
      state.cornerRadius = Number(action.payload.cornerRadius);
    },
  },
});

export const { setCornerRadius } = cornerRadiusSlice.actions;
export default cornerRadiusSlice.reducer;
