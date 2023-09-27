import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';

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
    url: undefined,
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

export const editUser = createAsyncThunk(
  'user/edit',
  async (formData: User) => {
    const { data } = await axiosInstance.patch(
      `/collaborator/${formData.id}`,
      formData
    );

    return data;
  }
);

const userReducer = createReducer(initialState, (builder) => {
  builder
    // Login
    .addCase(login.pending, (state) => {
      state.error = false;
      state.loading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      // eslint-disable-next-line no-console
      console.log(
        `${
          action.payload.user.firstname
        } ${action.payload.user.lastname.toUpperCase()} est connecté !`
      );

      state.data = action.payload.user;
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
      state.data = action.payload;
      state.data.logged = true;
    });
});

export default userReducer;
