// Library
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Redux toolkit
import {
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

// Axios types
import { AxiosError } from 'axios';

// Axios
import axiosInstance from '../../utils/axios';

// Typescript interface
import { Avatar } from '../../@types/avatar';
import { ErrorType } from '../../@types/error';

interface AvatarState {
  loading: boolean;
  error: boolean;
  data: Avatar[];
}

// INITIAL STATE
export const initialState: AvatarState = {
  loading: false,
  error: false,
  data: [],
};

// THUNK MIDDLEWARE
// Get all avatars
export const fetchAvatars = createAsyncThunk('avatar/getAll', async () => {
  try {
    const response = await axiosInstance.get('/avatars');

    return response.data;
  } catch (error) {
    throw new Error(
      (error as ErrorType).response.data.error ||
        (error as AxiosError).response?.statusText
    );
  }
});

// REDUCER
const avatarReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchAvatars.pending, (state) => {
      state.loading = true;
      state.error = false;
    })
    .addCase(fetchAvatars.fulfilled, (state, action) => {
      state.data = action.payload;

      state.loading = false;
    })
    .addCase(fetchAvatars.rejected, (state, action) => {
      state.error = true;
      state.loading = false;

      toast.error(action.error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    });
});

export default avatarReducer;
