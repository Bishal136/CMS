import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IIdea, IIdeaColumn } from '../types/idea.types';

interface IdeasState {
  columns: IIdeaColumn[];
  activeIdea: IIdea | null;
  selectedTag: string | null;
}

const defaultColumns: IIdeaColumn[] = [
  { id: 'unassigned', title: 'Unassigned', ideas: [] },
  { id: 'todo', title: 'To Do', ideas: [] },
  { id: 'in_progress', title: 'In Progress', ideas: [] },
  { id: 'done', title: 'Done', ideas: [] },
];

const initialState: IdeasState = {
  columns: defaultColumns,
  activeIdea: null,
  selectedTag: null,
};

export const ideasSlice = createSlice({
  name: 'ideas',
  initialState,
  reducers: {
    setColumns: (state, action: PayloadAction<IIdeaColumn[]>) => {
      state.columns = action.payload;
    },
    addIdea: (state, action: PayloadAction<IIdea>) => {
      const col = state.columns.find((c) => c.id === action.payload.columnId) || state.columns[0];
      col.ideas.push(action.payload);
    },
    setActiveIdea: (state, action: PayloadAction<IIdea | null>) => {
      state.activeIdea = action.payload;
    },
    setSelectedTag: (state, action: PayloadAction<string | null>) => {
      state.selectedTag = action.payload;
    },
  },
});

export const { setColumns, addIdea, setActiveIdea, setSelectedTag } = ideasSlice.actions;
export default ideasSlice.reducer;
