/* eslint-disable no-console */
import {
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

// Axios
import axiosInstance from '../../utils/axios';

// Typescript interface
import { Action } from '../../@types/action';

interface ActionState {
  loading: boolean;
  error: boolean;
  actions: Action[];
}

export const initialState: ActionState = {
  loading: false,
  error: false,
  actions: [],
};

export const createProspectionAction = createAsyncThunk(
  'action/create',
  async ({ formData }: { formData: Action }) => {
    const response = await axiosInstance.post(`/informations/${formData.information_id}/actions`, formData);

    console.log(response)

    return response.data;
  }
);

const actionsReducer = createReducer(initialState, (builder) => {
  builder
    // CreateAction
    .addCase(createProspectionAction.fulfilled, (state, action) => {
      state.actions.push(action.payload.data);
    })
    .addCase(createProspectionAction.rejected, (state) => {
      state.error = true;
      console.log('Erreur');
    });
});

export default actionsReducer;
