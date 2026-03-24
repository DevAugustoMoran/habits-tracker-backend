import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface HabitType {
  _id: string;
  name: string;
  completedDays: number;
}

const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const fetchHabitsAsync = createAsyncThunk(
  'habits/fetchHabits',
  async () => {
    const response = await fetch('http://localhost:3001/api/habits', {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return await response.json();
  }
);

export const addHabitAsync = createAsyncThunk(
  'habits/addHabit',
  async (name: string) => {
    const response = await fetch('http://localhost:3001/api/habits', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}` 
      },
      body: JSON.stringify({ name })
    });
    return await response.json();
  }
);

export const completeHabitAsync = createAsyncThunk(
  'habits/completeHabit',
  async (id: string) => {
    const response = await fetch(`http://localhost:3001/api/habits/${id}/complete`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return await response.json();
  }
);

const habitSlice = createSlice({
  name: 'habits',
  initialState: {
    habits: [] as HabitType[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabitsAsync.fulfilled, (state, action) => {
        state.habits = action.payload; 
      })
      .addCase(addHabitAsync.fulfilled, (state, action) => {
        state.habits.push(action.payload);
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

export default habitSlice.reducer;