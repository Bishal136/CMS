import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost } from '../types/post.types';

interface PostsState {
  posts: IPost[];
  filterChannelId: string | null;
}

const initialState: PostsState = {
  posts: [],
  filterChannelId: null,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload;
    },
    setFilterChannelId: (state, action: PayloadAction<string | null>) => {
      state.filterChannelId = action.payload;
    },
  },
});

export const { setPosts, setFilterChannelId } = postsSlice.actions;
export default postsSlice.reducer;
