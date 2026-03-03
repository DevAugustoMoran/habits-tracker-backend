import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  habits: [], 
  status: 'idle', 
  error: null
};

export const habitSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    setHabits: (state, action) => {
      state.habits = action.payload;
    }
  }
});

export const { setHabits } = habitSlice.actions;
export default habitSlice.reducer;