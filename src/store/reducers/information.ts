import {
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

// Axios
import axiosInstance from '../../utils/axios';

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
    const response = await axiosInstance.get(`/informations/${id}`);

    return response.data;
  }
);


const informationReducer = createReducer(initialState, (builder) => {
  builder
    // Fetch just one information by its id
    .addCase(fetchInformation.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(fetchInformation.fulfilled, (state, action) => {
      state.data = action.payload;

      state.loading = false;
    })
    .addCase(fetchInformation.rejected, (state) => {
      state.error = true;
      state.loading = false;
    })
});

export default informationReducer;
