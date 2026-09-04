import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IComment, IMention } from '../types/community.types';

interface CommunityState {
  comments: IComment[];
  selectedCommentId: string | null;
  mentions: IMention[];
}

const initialState: CommunityState = {
  comments: [],
  selectedCommentId: null,
  mentions: [],
};

export const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<IComment[]>) => {
      state.comments = action.payload;
    },
    selectComment: (state, action: PayloadAction<string | null>) => {
      state.selectedCommentId = action.payload;
    },
    setMentions: (state, action: PayloadAction<IMention[]>) => {
      state.mentions = action.payload;
    },
  },
});

export const { setComments, selectComment, setMentions } = communitySlice.actions;
export default communitySlice.reducer;
