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
import { User } from '../../@types/user';

interface CollaboratorState {
  loading: boolean;
  error: boolean;
  data: User[];
}

export const initialState: CollaboratorState = {
  loading: false,
  error: false,
  data: [],
}

export const fetchCollaborators = createAsyncThunk('collaborator/getAll', async () => {
  const response = await axiosInstance.get('/collaborator');

  return response.data
})

const collaboratorReducer = createReducer(initialState, (bulider) => {
  bulider
    .addCase(fetchCollaborators.pending, (state) => {
      state.error = false;
      state.loading = true;
    })
    .addCase(fetchCollaborators.fulfilled, (state, action) => {
      state.data = action.payload;

      state.loading = false;
    })
    .addCase(fetchCollaborators.rejected, (state) => {
      state.error = false;
      state.loading = false;

      toast.error(
        'Une erreur est survenue lors de la récupération des collaborateurs...',
        {
          position: toast.POSITION.BOTTOM_RIGHT,
        }
      );
    })
})

export default collaboratorReducer;