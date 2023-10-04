// Library
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Redux toolkit
import { createAsyncThunk, createReducer, createAction } from '@reduxjs/toolkit';

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
  user: User;
}

// INITIAL STATE
export const initialState: CollaboratorState = {
  loading: false,
  error: false,
  data: [],
  user: {
    id: undefined,
    firstname: undefined,
    lastname: undefined,
    email: undefined,
    phone: undefined,
    acces: false,
    secret_key: undefined,
    role_id: undefined,
    url: undefined,
    logged: false,
    avatar_id: undefined,
  },
};

// ACTION
export const setUserWithStorage = createAction('user/storage');

// THUNK MIDDLEWARE
// LOGIN
export const login = createAsyncThunk(
  'user/login',
  async (formData: FormData) => {
    try {
      const objData = Object.fromEntries(formData);
      const response = await axiosInstance.post('/login', objData);

      return response;
    } catch (error) {
      throw new Error(
        (error as ErrorType).response.data.error ||
          (error as AxiosError).response?.statusText
      );
    }
  }
);

// LOGOUT
export const logout = createAsyncThunk('user/logout', async () => {
  try {
    const response = await axiosInstance.get('/logout');

    return response;
  } catch (error) {
    throw new Error(
      (error as ErrorType).response.data.error ||
        (error as AxiosError).response?.statusText
    );
  }
});

// Get all collaborators
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

// Create a collaborator
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

// Update a collaborator
export const editCollaborator = createAsyncThunk(
  'user/edit',
  async (formData: User) => {
    try {
      const response = await axiosInstance.patch(
        `/collaborator/${formData.id}`,
        formData
      );

      return response;
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
    // LOGIN
    .addCase(login.pending, (state) => {
      // Just in case => Reset data initiale state
      // It's a precaution
      state.user = initialState.user;

      // Reset error state
      state.error = false;

      state.loading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      const { token } = action.payload.data;
      // We check if the user is successfully connected
      if (token) {
        localStorage.setItem('accessToken', token);
        // The token goes to the axios headers
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;

        // We want to delete the password to not send it into our redux state
        delete action.payload.data.result.password;

        const user = { ...action.payload.data.result, logged: true };
        state.user = user;

        // Set User into the local storage
        localStorage.setItem('user', JSON.stringify(user));
      }

      if (state.user.logged) {
        toast.info("Bienvenue sur votre application Immo'Pros", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }

      state.loading = false;
    })
    .addCase(login.rejected, (state, action) => {
      state.error = true;
      state.loading = false;

      toast.error(action.error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    // LOGOUT
    .addCase(logout.pending, () => {
      // We want to reset the state also while pending to avoid useless rerender in Init App
      return initialState;
    })
    .addCase(logout.fulfilled, () => {
      toast.info('Vous êtes déconnecté.', {
        position: toast.POSITION.BOTTOM_CENTER,
      });

      return initialState;
    })
    .addCase(logout.rejected, (state, action) => {
      state.error = true;
      state.loading = false;

      toast.error(action.error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
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
    })
    // Update Collaborator
    .addCase(editCollaborator.pending, (state) => {
      state.error = false;
    })
    .addCase(editCollaborator.fulfilled, (state, action) => {
      state.user.firstname = action.payload.data.result.firstname;
      state.user.lastname = action.payload.data.result.lastname;
      state.user.phone = action.payload.data.result.phone;
      state.user.email = action.payload.data.result.email;

      // It's important to set the user also in the localStorage. Otherwise, it will not update with a window.reload event
      localStorage.setItem('user', JSON.stringify(state.user));

      toast.success('Modification réalisée avec succès !', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    .addCase(editCollaborator.rejected, (state, action) => {
      state.error = true;
      state.loading = false;

      toast.error(action.error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    // Set user state with the storage
    .addCase(setUserWithStorage, (state) => {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      state.user = storedUser;
    });
});

export default collaboratorReducer;
