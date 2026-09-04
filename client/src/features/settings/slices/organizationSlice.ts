import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrganization } from '../types/organization.types';

interface OrgState {
  organization: IOrganization | null;
}

const initialState: OrgState = {
  organization: {
    id: 'org1',
    name: 'Personal Workspace',
    createdAt: '2026-01-01',
    ownerId: 'u1',
  },
};

export const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    setOrganization: (state, action: PayloadAction<IOrganization>) => {
      state.organization = action.payload;
    },
  },
});

export const { setOrganization } = organizationSlice.actions;
export default organizationSlice.reducer;
