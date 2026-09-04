import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDateRange } from '../types/insights.types';

interface InsightsState {
  dateRange: IDateRange;
  channelId: string | null;
}

const initialState: InsightsState = {
  dateRange: { startDate: '', endDate: '' },
  channelId: null,
};

export const insightsSlice = createSlice({
  name: 'insights',
  initialState,
  reducers: {
    setDateRange: (state, action: PayloadAction<IDateRange>) => {
      state.dateRange = action.payload;
    },
    setChannelId: (state, action: PayloadAction<string | null>) => {
      state.channelId = action.payload;
    },
  },
});

export const { setDateRange, setChannelId } = insightsSlice.actions;
export default insightsSlice.reducer;
