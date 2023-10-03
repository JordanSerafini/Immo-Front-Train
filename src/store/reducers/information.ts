// Library
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Redux
import { createAsyncThunk, createReducer } from '@reduxjs/toolkit';

// Axios types
import { AxiosError } from 'axios';

// Axios
import axiosInstance from '../../utils/axios';

// Typescript interface
import { Information } from '../../@types/information';

// Typescript interface
import { ErrorType } from '../../@types/error';

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
  async ({ id }: { id: string | undefined }) => {
    try {
      const response = await axiosInstance.get(`/informations/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(
        (error as ErrorType).response.data.error ||
          (error as AxiosError).response?.statusText
      );
    }
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
    .addCase(fetchInformation.rejected, (state, action) => {
      state.error = true;
      state.loading = false;

      toast.error(action.error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    });
});

export default informationReducer;
