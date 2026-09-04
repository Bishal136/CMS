import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITemplate } from '../types/template.types';

interface TemplatesState {
  personalTemplates: ITemplate[];
  discoverTemplates: ITemplate[];
  activeTab: 'discover' | 'personal';
}

const initialState: TemplatesState = {
  personalTemplates: [],
  discoverTemplates: [],
  activeTab: 'discover',
};

export const templatesSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    setPersonalTemplates: (state, action: PayloadAction<ITemplate[]>) => {
      state.personalTemplates = action.payload;
    },
    setDiscoverTemplates: (state, action: PayloadAction<ITemplate[]>) => {
      state.discoverTemplates = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<'discover' | 'personal'>) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setPersonalTemplates, setDiscoverTemplates, setActiveTab } = templatesSlice.actions;
export default templatesSlice.reducer;
