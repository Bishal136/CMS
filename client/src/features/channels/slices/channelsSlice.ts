import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IChannel } from '../types/channel.types';

interface ChannelsState {
  channels: IChannel[];
  activeChannelId: string | null;
}

const initialState: ChannelsState = {
  channels: [],
  activeChannelId: null,
};

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, action: PayloadAction<IChannel[]>) => {
      state.channels = action.payload;
    },
    setActiveChannel: (state, action: PayloadAction<string | null>) => {
      state.activeChannelId = action.payload;
    },
  },
});

export const { setChannels, setActiveChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
