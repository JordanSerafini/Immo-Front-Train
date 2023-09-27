import {
  createReducer,
  createAsyncThunk,
} from '@reduxjs/toolkit';

// Axios
import axiosInstance from '../../utils/axios';

import { User } from '../../@types/user';

interface UserState {
  loading: boolean;
  error: boolean;
  data: User;
  JSWToken: null | string;
}
export const initialState: UserState = {
  loading: false,
  error: false,
  data: {
    id: undefined,
    firstname: undefined,
    lastname: undefined,
    email: undefined,
    phone: undefined,
    acces: false,
    secret_key: undefined,
    role_id: undefined,
    avatar_id: undefined,
    logged: false,
  },
  JSWToken: null,
};

export const login = createAsyncThunk(
  'user/login',
  async (formData: FormData) => {
    const objData = Object.fromEntries(formData);

    const { data } = await axiosInstance.post('/login', objData);

    axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.token}`;

    return data;
  }
);

export const logout = createAsyncThunk('user/logout', async () => {
  const response = await axiosInstance.get('/logout');
  return response;
});

const userReducer = createReducer(initialState, (builder) => {
  builder
    // Login
    .addCase(login.pending, (state) => {
      state.error = false;
      state.loading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      console.log(`${action.payload.user.firstname} ${action.payload.user.lastname.toUpperCase()} est connecté !`)

      state.data.id = action.payload.user.id;
      state.data.firstname = action.payload.user.firstname;
      state.data.lastname = action.payload.user.lastname;
      state.data.email = action.payload.user.email;
      state.data.phone = action.payload.user.phone;
      state.data.acces = action.payload.user.acces;
      state.data.role_id = action.payload.user.role_id;
      state.data.avatar_id = action.payload.user.avatar_id;
      state.data.logged = true;

      state.loading = false;
    })
    .addCase(login.rejected, (state) => {
      state.error = true;
      state.loading = false;
    })
    // Logout
    .addCase(logout.fulfilled, (state) => {
      state.data.id = undefined;
      state.data.firstname = undefined
      state.data.lastname = undefined
      state.data.email = undefined
      state.data.phone = undefined
      state.data.acces = false;
      state.data.role_id = undefined
      state.data.avatar_id = undefined
      state.data.logged = false;
    });
});

export default userReducer;
