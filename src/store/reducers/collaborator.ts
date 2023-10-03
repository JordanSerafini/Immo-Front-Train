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
import { User } from '../../@types/user';
import { ErrorType } from '../../@types/error';

interface CollaboratorState {
  loading: boolean;
  error: boolean;
  data: User[];
}

export const initialState: CollaboratorState = {
  loading: false,
  error: false,
  data: [],
};

export const fetchCollaborators = createAsyncThunk(
  'collaborator/getAll',
  async () => {
    try {
      const response = await axiosInstance.get('/collaborator');

      return response.data;
    } catch (error) {
      throw new Error(
        (error as ErrorType).response.data.error ||
          (error as AxiosError).response?.statusText
      );
    }
  }
);

export const createCollaborator = createAsyncThunk(
  'collaborator/create',
  async ({ formData }: { formData: User }) => {
    try {
      const response = await axiosInstance.post('/collaborator', formData);

      return response.data;
    } catch (error) {
      throw new Error(
        (error as ErrorType).response.data.error ||
          (error as AxiosError).response?.statusText
      );
    }
  }
);

const collaboratorReducer = createReducer(initialState, (builder) => {
  builder
    // Fetch Collaborators
    .addCase(fetchCollaborators.pending, (state) => {
      state.error = false;
      state.loading = true;
    })
    .addCase(fetchCollaborators.fulfilled, (state, action) => {
      state.data = action.payload;

      state.loading = false;
    })
    .addCase(fetchCollaborators.rejected, (state, action) => {
      state.error = false;
      state.loading = false;

      toast.error(action.error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    // Create Collaborator
    .addCase(createCollaborator.fulfilled, (state, action) => {
      delete action.payload.password;

      state.data.push(action.payload);

      toast.success(
        `Le compte ${
          action.payload.firstname
        } ${action.payload.lastname.toUpperCase()} a bien été créé !`,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
        }
      );
    })
    .addCase(createCollaborator.rejected, (state, action) => {
      state.error = false;
      state.loading = false;

      toast.error(action.error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    });
});

export default collaboratorReducer;
