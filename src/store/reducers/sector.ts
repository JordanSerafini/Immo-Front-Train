// Library
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Redux toolkit
import {
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

// Axios
import axiosInstance from '../../utils/axios';

// Typescript interface
import { Sector } from '../../@types/sector';

interface SectorState {
  loading: boolean;
  error: boolean;
  data: Sector[];
}

export const initialState: SectorState = {
  loading: false,
  error: false,
  data: [],
}

export const fetchSectors = createAsyncThunk('sector/getAll', async () => {
  const response = await axiosInstance.get('/sectors');

  return response.data
})

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
    .addCase(fetchSectors.rejected, (state) => {
      state.error = false;
      state.loading = false;

      toast.error(
        'Une erreur est survenue lors de la récupération des secteurs...',
        {
          position: toast.POSITION.BOTTOM_RIGHT,
        }
      );
    })
})

export default sectorReducer;