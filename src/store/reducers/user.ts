import {
  createAction,
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
    id: null,
    firstname: null,
    lastname: null,
    email: null,
    phone: null,
    acces: false,
    secret_key: null,
    role_id: null,
    avatar_id: null,
    logged: false,
  },
  JSWToken: null
};

export const login = createAsyncThunk(
  'user/temporary',
  async (formData: FormData) => {
    const objData = Object.fromEntries(formData);

    const { data } = await axiosInstance.post('/login', objData);

    axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.token}`;

    console.log(data.token)

    return data;
  }
);

export const logout = createAction('user/logout');

const userReducer = createReducer(initialState, (builder) => {
  builder
    // Logout
    .addCase(logout, (state) => {
      state.data.id = null;
      state.data.firstname = null;
      state.data.lastname = null;
      state.data.email = null;
      state.data.phone = null;
      state.data.acces = false;
      state.data.role_id = null;
      state.data.avatar_id = null;
      state.data.logged = false;
    })
    // Login
    .addCase(login.pending, (state) => {
      state.error = false;
      state.loading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      console.log(action.payload);
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
    });
});

export default userReducer;
