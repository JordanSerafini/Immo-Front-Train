// === LIBRARY === //
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// === REDUX TOOLKIT === //
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

// === AXIOS === //
import { AxiosError } from 'axios';
import axiosInstance from '../../utils/axios';

// === TYPESCRIPT === //
import { Action } from '../../@types/action';
import { ErrorType } from '../../@types/error';

interface ActionState {
  loading: boolean;
  error: boolean;
  data: Action[];
}

// === INITIAL STATE === //
export const initialState: ActionState = {
  loading: false,
  error: false,
  data: [],
};

// === THUNK MIDDLEWARE === //
export const fetchActions = createAsyncThunk(
  'action/getAll',
  async ({ infoId }: { infoId: number }) => {
    try {
      const response = await axiosInstance.get(
        `/informations/${infoId}/actions`
      );

      return response.data;
    } catch (error) {
      throw new Error(
        (error as ErrorType).response.data.error ||
          (error as AxiosError).response?.statusText
      );
    }
  }
);

export const createProspectionAction = createAsyncThunk(
  'action/create',
  async ({ formData }: { formData: Action }) => {
    try {
      const response = await axiosInstance.post(
        `/informations/${formData.information_id}/actions`,
        formData
      );

      return response.data;
    } catch (error) {
      throw new Error(
        (error as ErrorType).response.data.error ||
          (error as AxiosError).response?.statusText
      );
    }
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
    .addCase(fetchActions.rejected, (state, action) => {
      state.loading = false;
      state.error = true;

      toast.error(action.error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    // CreateAction
    .addCase(createProspectionAction.fulfilled, (state, action) => {
      state.data.push(action.payload.result);

      toast.success('Action créée avec succès !', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    .addCase(createProspectionAction.rejected, (state, action) => {
      state.error = true;

      toast.error(action.error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    });
});

export default actionsReducer;
