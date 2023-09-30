import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';

// Axios
import axiosInstance from '../../utils/axios';

import { User } from '../../@types/user';

interface UserState {
  loading: boolean;
  error: boolean;
  errorMessage: null | string;
  data: User;
  JSWToken: null | string;
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
  JSWToken: null,
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

    return response;
  }
);

const userReducer = createReducer(initialState, (builder) => {
  builder
    // Login
    .addCase(login.pending, (state) => {
      state.errorMessage = null;
      state.error = false;
      state.loading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      const {token} = action.payload;
      // We check if the user is successfully connected
      if (!token) {
        state.errorMessage = action.payload
      } else {
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
        
        // eslint-disable-next-line no-console
        console.log(
          `${
            action.payload.result.firstname
          } ${action.payload.result.lastname.toUpperCase()} est connecté !`
        );

        // We want to delete the password to not send it into our redux state
        delete action.payload.result.password;
  
        state.data = action.payload.result;
  
        state.data.logged = true;
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
      state.data.logged = false;
    })
    // Edit User
    .addCase(editUser.fulfilled, (state, action) => {
      state.data.firstname = action.payload.data.firstname;
      state.data.lastname = action.payload.data.lastname;
      state.data.phone = action.payload.data.phone;
      state.data.email = action.payload.data.email;
    });
});

export default userReducer;
