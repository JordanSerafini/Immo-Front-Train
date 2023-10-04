// Library
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Redux toolkit
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

// Axios types
import { AxiosError } from 'axios';

// Axios
import axiosInstance from '../../utils/axios';

// Typescript interface
import { Sector } from '../../@types/sector';
import { ErrorType } from '../../@types/error';

interface SectorState {
  loading: boolean;
  error: boolean;
  data: Sector[];
}

export const initialState: SectorState = {
  loading: false,
  error: false,
  data: [],
};

export const fetchSectors = createAsyncThunk('sector/getAll', async () => {
  try {
    const response = await axiosInstance.get('/sectors');

    return response.data;
  } catch (error) {
    throw new Error(
      (error as ErrorType).response.data.error ||
        (error as AxiosError).response?.statusText
    );
  }
});

const sectorReducer = createReducer(initialState, (bulider) => {
  bulider
    .addCase(fetchSectors.pending, (state) => {
      state.error = false;
      state.loading = true;
    })
    .addCase(fetchSectors.fulfilled, (state, action) => {
      state.data = action.payload;

      state.loading = false;
    })
    .addCase(fetchSectors.rejected, (state, action) => {
      state.error = false;
      state.loading = false;

      toast.error(action.error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    });
});

export default sectorReducer;
