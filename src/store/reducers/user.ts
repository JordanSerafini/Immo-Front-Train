import {
  createAction,
  createReducer,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../@types/user';

interface UserState {
  loading: boolean;
  error: boolean;
  data: User;
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
};

export const login = createAsyncThunk(
  'user/temporary',
  async (formData: FormData) => {
    const objData = Object.fromEntries(formData);

    const response = await axios.post('http://localhost:5000/login', objData);

    console.log(response.data)

    return response.data;
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
      state.data.id = action.payload.id;
      state.data.firstname = action.payload.firstname;
      state.data.lastname = action.payload.lastname;
      state.data.email = action.payload.email;
      state.data.phone = action.payload.phone;
      state.data.acces = action.payload.acces;
      state.data.role_id = action.payload.role_id;
      state.data.avatar_id = action.payload.avatar_id;
      state.data.logged = true;

      state.loading = false;
    })
    .addCase(login.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
});

export default userReducer;
