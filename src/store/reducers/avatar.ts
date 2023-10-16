// Library
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Redux toolkit
import {
  createAction,
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

// Delete Avatar
export const deleteAvatar = createAsyncThunk(
  'avatar/delete',
  async ({ id }: { id: number }) => {
    try {
      await axiosInstance.delete(`/avatars/${id}`);

      return id;
    } catch (error) {
      throw new Error(
        (error as ErrorType).response.data.error ||
          (error as AxiosError).response?.statusText
      );
    }
  }
);

// Upload avatar
export const uploadAvatar = createAsyncThunk(
  'avatar/upload',
  async (formData: FormData) => {
    try {
      const response = await axiosInstance.post('/avatars/download', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(
        (error as ErrorType).response.data.error ||
          (error as AxiosError).response?.statusText
      );
    }
  }
);

// ACTION
export const resetAvatars = createAction('avatar/reset');

// REDUCER
const avatarReducer = createReducer(initialState, (builder) => {
  builder
    // Get all avatars
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
    })
    // Upload Avatars
    .addCase(uploadAvatar.fulfilled, (state, action) => {
      state.data.push(action.payload.result);

      state.loading = false;

      toast.success('Votre avatar a bien été créé !', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    .addCase(uploadAvatar.rejected, (state, action) => {
      state.error = true;
      state.loading = false;

      toast.error(action.error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    // Delete Avatars
    .addCase(deleteAvatar.fulfilled, (state, action) => {
      state.data = state.data.filter((avatar) => avatar.id !== action.payload);

      toast.success('Votre avatar a été supprimé avec succès !', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    .addCase(deleteAvatar.rejected, (state, action) => {
      state.error = true;
      state.loading = false;

      toast.error(action.error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    // Reset
    .addCase(resetAvatars, () => {
      return initialState;
    });
});

export default avatarReducer;