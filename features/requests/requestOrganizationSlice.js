/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  organization: {
    id: null,
    name: null,
  },
};

const requestOrganizationSlice = createSlice({
  name: 'requestOrganization',
  initialState,
  reducers: {
    setOrganization: (state, action) => {
      state.organization = action.payload;
    },
    unsetOrganization(state) {
      state.organization.id = null;
      state.organization.name = null;
    },
    resetOrganizationState(state) {
      state = initialState;
    },
  },
});

export const { setOrganization, unsetOrganization, resetOrganizationState } =
  requestOrganizationSlice.actions;

export const selectOrganization = (state) =>
  state.requestOrganization.organization;

export default requestOrganizationSlice.reducer;
