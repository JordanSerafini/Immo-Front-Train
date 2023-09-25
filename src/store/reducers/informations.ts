import axios from 'axios';
import { createAsyncThunk, createReducer, createAction } from '@reduxjs/toolkit';

// Create an information interface

interface InformationsState {
  loading: boolean;
  error: boolean;
  informations: [];
}

export const initialState: InformationsState = {
  loading: true,
  error: false,
  informations: [],
};

export const fetchInformations = createAsyncThunk(
  'informations/APICall',
  async () => {
    const response = await axios.get(
      'http://localhost:5000/informations'
    );

    return response.data;
  }
);

export const filterInformation = createAction("informations/filter")

const informationsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchInformations.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchInformations.fulfilled, (state, action) => {
      state.informations = action.payload;

      state.loading = false;
    })
    .addCase(fetchInformations.rejected, (state) => {
      state.error = true;
      console.log('Une erreur est survenue');
    })
    .addCase(filterInformation, (state, action) => {
      console.log(action)
    })
});

export default informationsReducer;
