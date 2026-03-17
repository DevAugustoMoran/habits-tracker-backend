import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchHabitsAsync = createAsyncThunk(
  'habits/fetchHabits',
  async () => {
    const response = await fetch('http://localhost:3001/api/habits');
    return await response.json();
  }
);

export const completeHabitAsync = createAsyncThunk(
  'habits/completeHabit',
  async (id: string) => {
    const response = await fetch(`http://localhost:3001/api/habits/${id}/complete`, {
      method: 'PUT',
    });
    return await response.json();
  }
);

const habitSlice = createSlice({
  name: 'habits',
  initialState: {
    habits: [] as HabitType[],
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabitsAsync.fulfilled, (state, action) => {
        state.habits = action.payload;
      })
      .addCase(completeHabitAsync.fulfilled, (state, action) => {
        const updatedHabit = action.payload;
        const index = state.habits.findIndex((h) => h._id === updatedHabit._id);
        if (index !== -1) {
          state.habits[index] = updatedHabit;
        }
      });
  },
});

export interface HabitType {
  _id: string;
  name: string;
  completedDays: number;
}
export default habitSlice.reducer;