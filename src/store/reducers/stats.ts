// Library
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* eslint-disable no-console */
import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

// Axios
import { AxiosError } from 'axios';
import axiosInstance from '../../utils/axios';
import { ErrorType } from '../../@types/error';

// Typescript interface
import { StatsInfoSector, StatsInfoCollab } from '../../@types/stats';

interface StatsState {
  loading: boolean;
  error: boolean;
  dataSector: StatsInfoSector[];
  dataCollabs: StatsInfoCollab[];
  dataInterval: StatsInfoCollab[];
}

export const initialState: StatsState = {
  loading: false,
  error: false,
  dataSector: [],
  dataCollabs: [],
  dataInterval: [],
};

export const infoBySector = createAsyncThunk('stats/infobysector', async () => {
  try {
    const response = await axiosInstance.get('/stats/informations/sectors');

    return response;
  } catch (error) {
    throw new Error(
      (error as ErrorType).response.data.error ||
        (error as AxiosError).response?.statusText
    );
  }
});

export const infoByCollaborator = createAsyncThunk(
  'stats/infobycollabs',
  async () => {
    try {
      const response = await axiosInstance.get(
        '/stats/informations/collaborators'
      );

      return response;
    } catch (error) {
      throw new Error(
        (error as ErrorType).response.data.error ||
          (error as AxiosError).response?.statusText
      );
    }
  }
);

export const infoWithInterval = createAsyncThunk(
  'stats/infowithinterval',
  async ({
    formValues,
  }: {
    formValues: { firstDate: string; secondDate: string };
  }) => {
    try {
      const response = await axiosInstance.post(
        `/stats/informations/dates`,
        formValues
      );

      return response;
    } catch (error) {
      throw new Error(
        (error as ErrorType).response.data.error ||
          (error as AxiosError).response?.statusText
      );
    }
  }
);

export const resetStats = createAction('stats/reset');

const statsReducer = createReducer(initialState, (builder) => {
  builder
    // Informations by Sector
    .addCase(infoBySector.pending, (state) => {
      state.error = false;
      state.loading = true;
    })
    .addCase(infoBySector.fulfilled, (state, action) => {
      const result = action.payload.data;
      state.loading = false;
      state.dataSector = result;
    })
    .addCase(infoBySector.rejected, (state, action) => {
      state.loading = false;
      state.error = true;

      toast.error(action.error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    // Informations by Collaborator
    .addCase(infoByCollaborator.pending, (state) => {
      state.error = false;
      state.loading = true;
    })
    .addCase(infoByCollaborator.fulfilled, (state, action) => {
      const result = action.payload.data;

      state.loading = false;
      state.dataCollabs = result;
    })
    .addCase(infoByCollaborator.rejected, (state, action) => {
      state.loading = false;
      state.error = true;

      toast.error(action.error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    // Info With Interval
    .addCase(infoWithInterval.pending, (state) => {
      state.error = false;
      state.loading = true;
    })
    .addCase(infoWithInterval.fulfilled, (state, action) => {
      const result = action.payload.data;

      state.loading = false;
      state.dataInterval = result;
    })
    .addCase(infoWithInterval.rejected, (state, action) => {
      state.loading = false;
      state.error = true;

      toast.error(action.error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    .addCase(resetStats, () => {
      return initialState;
    });
});

export default statsReducer;
