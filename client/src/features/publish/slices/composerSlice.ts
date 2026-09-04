import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ComposerState {
  isOpen: boolean;
  content: string;
  selectedChannels: string[];
  mediaUrls: string[];
  scheduledDate: string | null;
  tags: string[];
}

const initialState: ComposerState = {
  isOpen: false,
  content: '',
  selectedChannels: [],
  mediaUrls: [],
  scheduledDate: null,
  tags: [],
};

export const composerSlice = createSlice({
  name: 'composer',
  initialState,
  reducers: {
    openComposer: (state) => {
      state.isOpen = true;
    },
    closeComposer: (state) => {
      state.isOpen = false;
      state.content = '';
      state.mediaUrls = [];
      state.tags = [];
    },
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    toggleChannel: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.selectedChannels.includes(id)) {
        state.selectedChannels = state.selectedChannels.filter((c) => c !== id);
      } else {
        state.selectedChannels.push(id);
      }
    },
  },
});

export const { openComposer, closeComposer, setContent, toggleChannel } = composerSlice.actions;
export default composerSlice.reducer;
