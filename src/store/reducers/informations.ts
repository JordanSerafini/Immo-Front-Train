import axios from 'axios';
import {
  createAsyncThunk,
  createReducer,
  createAction,
} from '@reduxjs/toolkit';

// Typescript interface
import { Information } from '../../@types/information';

// Create an information interface
interface InformationsState {
  loading: boolean;
  error: boolean;
  informations: Information[];
}

export const initialState: InformationsState = {
  loading: true,
  error: false,
  informations: [],
};

export const fetchInformations = createAsyncThunk(
  'informations/APICall',
  async () => {
    const response = await axios.get('http://localhost:5000/informations');

    return response.data;
  }
);

export const filterInformation = createAction(
  'informations/filter',
  function filter(slug: string) {
    return {
      payload: {
        slug,
      },
    };
  }
);

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
      const { slug } = action.payload;

      const filteredInformation = state.informations.filter(
        (info) => info.adress_city.includes(slug)
      );

      state.informations = filteredInformation;
    });
});

export default informationsReducer;
