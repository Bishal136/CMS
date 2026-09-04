import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFeed, IFeedItem } from '../types/feed.types';

interface FeedsState {
  feeds: IFeed[];
  activeFeedId: string | null;
  items: IFeedItem[];
}

const initialState: FeedsState = {
  feeds: [],
  activeFeedId: null,
  items: [],
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {
    setFeeds: (state, action: PayloadAction<IFeed[]>) => {
      state.feeds = action.payload;
    },
    setActiveFeedId: (state, action: PayloadAction<string | null>) => {
      state.activeFeedId = action.payload;
    },
    setFeedItems: (state, action: PayloadAction<IFeedItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setFeeds, setActiveFeedId, setFeedItems } = feedsSlice.actions;
export default feedsSlice.reducer;
