/* eslint-disable no-console */
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

// Axios
import axiosInstance from '../../utils/axios';

// Typescript interface
import { Action } from '../../@types/action';

interface ActionState {
  loading: boolean;
  error: boolean;
  data: Action[];
}

export const initialState: ActionState = {
  loading: false,
  error: false,
  data: [],
};

export const fetchActions = createAsyncThunk(
  'action/getAll',
  async ({infoId} : {infoId: number}) => {
    const response = await axiosInstance.get(`/informations/${infoId}/actions`);

    return response.data;
  }
);

export const createProspectionAction = createAsyncThunk(
  'action/create',
  async ({ formData }: { formData: {[k: string]: FormDataEntryValue;} }) => {

    const response = await axiosInstance.post(
      `/informations/${formData.information_id}/actions`,
      formData
    );

    return response.data;

  }
);

const actionsReducer = createReducer(initialState, (builder) => {
  builder
    // Fetch All Actions
    .addCase(fetchActions.pending, (state) => {
      state.error = false;
      state.loading = true;
    })
    .addCase(fetchActions.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(fetchActions.rejected, (state) => {
      state.loading = false;
      state.error = true;
    })
    // CreateAction
    .addCase(createProspectionAction.fulfilled, (state, action) => {
      state.data.push(action.payload);
    })
    .addCase(createProspectionAction.rejected, (state) => {
      state.error = true;
      console.log('Erreur');
    });
});

export default actionsReducer;
