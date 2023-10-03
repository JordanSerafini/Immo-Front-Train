// Library
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Redux
import {
  createReducer,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';

// Axios
import axiosInstance from '../../utils/axios';

import { User } from '../../@types/user';

interface UserState {
  loading: boolean;
  error: boolean;
  errorMessage: null | string;
  data: User;
}
export const initialState: UserState = {
  loading: false,
  error: false,
  errorMessage: null,
  data: {
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
  },
};

export const login = createAsyncThunk(
  'user/login',
  async (formData: FormData) => {
    try {
      const objData = Object.fromEntries(formData);
      const response = await axiosInstance.post('/login', objData);

      return response;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
);

export const logout = createAsyncThunk('user/logout', async () => {
  try {
    const response = await axiosInstance.get('/logout');

    return response;
  } catch (error) {
    throw new Error(`${error}`);
  }
});

export const editUser = createAsyncThunk(
  'user/edit',
  async (formData: User) => {
    try {
      const response = await axiosInstance.patch(
        `/collaborator/${formData.id}`,
        formData
      );

      return response;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
);

export const setUserWithStorage = createAction('user/storage');

const userReducer = createReducer(initialState, (builder) => {
  builder
    // Login
    .addCase(login.pending, (state) => {
      // Just in case => Reset data initiale state
      // It's a precaution
      state.data = initialState.data;
      // Reset errorMessage state
      state.errorMessage = null;
      // Reset error state
      state.error = false;

      state.loading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      const { token } = action.payload.data;
      // We check if the user is successfully connected
      if (!token) {
        state.errorMessage = action.payload.data;
      } else {
        localStorage.setItem('accessToken', token);
        // The token goes to the axios headers
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;

        // We want to delete the password to not send it into our redux state
        delete action.payload.data.result.password;

        const user = { ...action.payload.data.result, logged: true };
        state.data = user;

        // Set User into the local storage
        localStorage.setItem('user', JSON.stringify(user));
      }

      if (state.data.logged) {
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
    // Logout
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
    // Edit User
    .addCase(editUser.pending, (state) => {
      state.error = false;
    })
    .addCase(editUser.fulfilled, (state, action) => {
      state.data.firstname = action.payload.data.result.firstname;
      state.data.lastname = action.payload.data.result.lastname;
      state.data.phone = action.payload.data.result.phone;
      state.data.email = action.payload.data.result.email;

      // It's important to set the user also in the localStorage. Otherwise, it will not update with a window.reload event
      localStorage.setItem('user', JSON.stringify(state.data));

      toast.success('Modification réalisée avec succès !', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    .addCase(editUser.rejected, (state, action) => {
      state.error = true;
      state.loading = false;

      toast.error(action.error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    // Set user state with the storage
    .addCase(setUserWithStorage, (state) => {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      state.data = storedUser;
    });
});

export default userReducer;
