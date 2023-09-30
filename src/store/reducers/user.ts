import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';

// Axios
import axiosInstance from '../../utils/axios';

import { User } from '../../@types/user';

interface UserState {
  loading: boolean;
  error: boolean;
  errorMessage: null | string;
  logged: boolean;
  data: User;
}
export const initialState: UserState = {
  loading: false,
  error: false,
  errorMessage: null,
  logged: false,
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
  },
};

export const login = createAsyncThunk(
  'user/login',
  async (formData: FormData) => {
    const objData = Object.fromEntries(formData);

    const response = await axiosInstance.post('/login', objData);

    return response.data;
  }
);

export const logout = createAsyncThunk('user/logout', async () => {
  
  const response = await axiosInstance.get('/logout');

  return response;
});

export const editUser = createAsyncThunk(
  'user/edit',
  async (formData: User) => {
    const response = await axiosInstance.patch(
      `/collaborator/${formData.id}`,
      formData
    );

    return response.data;
  }
);

const userReducer = createReducer(initialState, (builder) => {
  builder
    // Login
    .addCase(login.pending, (state) => {
      // Reset errorMessage state
      state.errorMessage = null;
      // Reset error state
      state.error = false;

      state.loading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      const { token } = action.payload;
      // We check if the user is successfully connected
      if (!token) {
        state.errorMessage = action.payload;
      } else {
        localStorage.setItem('accessToken', token);
        // The token goes to the axios headers
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;

        // We want to delete the password to not send it into our redux state
        delete action.payload.result.password;

        state.data = action.payload.result;

        state.logged = true;
      }

      state.loading = false;
    })
    .addCase(login.rejected, (state) => {
      state.error = true;
      state.loading = false;
    })
    // Logout
    .addCase(logout.fulfilled, (state) => {
      state.data.id = undefined;
      state.data.firstname = undefined;
      state.data.lastname = undefined;
      state.data.email = undefined;
      state.data.phone = undefined;
      state.data.url = undefined;
      state.data.acces = false;

      state.logged = false;
    })
    // Edit User
    .addCase(editUser.fulfilled, (state, action) => {
      state.data.firstname = action.payload.firstname;
      state.data.lastname = action.payload.lastname;
      state.data.phone = action.payload.phone;
      state.data.email = action.payload.email;
    });
});

export default userReducer;
