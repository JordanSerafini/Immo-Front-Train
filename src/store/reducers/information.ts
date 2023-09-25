import axios from 'axios';
import {
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

// Typescript interface
import { Information } from '../../@types/information';

// Create an information interface
interface InformationState {
  loading: boolean;
  error: boolean;
  data: Information | null;
}

export const initialState: InformationState = {
  loading: true,
  error: false,
  data: null,
};

export const fetchInformation = createAsyncThunk(
  'information/APICall',
  async ({id} : {id: string | undefined}) => {
    const response = await axios.get(`http://localhost:5000/informations/${id}`);

    return response.data;
  }
);


const informationReducer = createReducer(initialState, (builder) => {
  builder
    // FetchInformations
    .addCase(fetchInformation.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchInformation.fulfilled, (state, action) => {
      state.data = action.payload;

      state.loading = false;
    })
    .addCase(fetchInformation.rejected, (state) => {
      state.error = true;
      console.log('Une erreur est survenue');
    })
});

export default informationReducer;
