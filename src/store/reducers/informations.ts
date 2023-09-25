import axios from 'axios';
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

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
      'http://localhost:5000/collaborator/2/informations'
    );

    return response.data;
  }
);

const informationsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchInformations.pending, (state) => {
      state.loading = true;
      console.log('Loading');
    })
    .addCase(fetchInformations.fulfilled, (state, action) => {
      state.informations = action.payload;

      state.loading = false;
    })
    .addCase(fetchInformations.rejected, (state) => {
      state.error = true;
      console.log('Une erreur est survenue');
    });
});

export default informationsReducer;
