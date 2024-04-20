import { createSlice } from '@reduxjs/toolkit';
import { ACTIONS } from '../constants';

const initialState = {
  toolType: ACTIONS.SELECT,
}

const toolbarSlice = createSlice({
  name: 'toolbar',
  initialState,
  reducers:{
    selectTool: (state, action) => {
      state.toolType = action.payload;
    }
  }
})

export const { selectTool } = toolbarSlice.actions;
export default toolbarSlice.reducer;