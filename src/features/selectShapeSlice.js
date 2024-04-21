import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectId: "",
}

const selectShapeSlice = createSlice({
  name: "selectShape",
  initialState,
  reducers: {
    setSelectId: (state, action) => {
      state.selectId = action.payload.selectId;
    },
  },
});


export const { setSelectId } = selectShapeSlice.actions;
export default selectShapeSlice.reducer;