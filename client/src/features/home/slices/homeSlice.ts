import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HomeState {
  weekStreak: number;
  postingGoalsMet: number;
  commentScore: number;
  hasConnectedChannel: boolean;
}

const initialState: HomeState = {
  weekStreak: 3,
  postingGoalsMet: 85,
  commentScore: 92,
  hasConnectedChannel: false,
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setChannelConnected: (state, action: PayloadAction<boolean>) => {
      state.hasConnectedChannel = action.payload;
    },
  },
});

export const { setChannelConnected } = homeSlice.actions;
export default homeSlice.reducer;
