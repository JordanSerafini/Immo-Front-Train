/* eslint-disable no-console */
import {
  createAsyncThunk,
  createReducer,
  createAction,
} from '@reduxjs/toolkit';

// Axios
import axiosInstance from '../../utils/axios';

// Typescript interface
import { Information } from '../../@types/information';

// Create an information interface
interface InformationsState {
  loading: boolean;
  error: boolean;
  informations: Information[];
}

export const initialState: InformationsState = {
  loading: true,
  error: false,
  informations: [],
};

export const fetchInformations = createAsyncThunk(
  'informations/APICall',
  async () => {
    const response = await axiosInstance.get(`/informations`);

    return response.data;
  }
);

export const filterInformation = createAction(
  'informations/filter',
  function filter(slug: string) {
    return {
      payload: {
        slug,
      },
    };
  }
);

export const createInformation = createAsyncThunk(
  'information/create',
  async ({
    formData,
  }: {
    formData: {date: string;
      collaborator_id: number | undefined;
      sector_id: number;};
  }) => {
    const response = await axiosInstance.post(`/informations`, formData);

    return response.data;
  }
);

export const deleteInformation = createAsyncThunk(
  'information/delete',
  async ({ id }: { id: string }) => {
    await axiosInstance.delete(`/informations/${id}`);

    return id;
  }
);

const informationsReducer = createReducer(initialState, (builder) => {
  builder
    // Get All Informations
    .addCase(fetchInformations.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchInformations.fulfilled, (state, action) => {
      state.informations = action.payload;

      state.loading = false;
    })
    .addCase(fetchInformations.rejected, (state) => {
      state.error = true;
      console.log('Une erreur est survenue');
    })
    .addCase(filterInformation, (state, action) => {
      const { slug } = action.payload;

      const filteredInformation = state.informations.filter((info) =>
        info.address_city.includes(slug)
      );

      state.informations = filteredInformation;
    })
    // CreateInformation
    .addCase(createInformation.fulfilled, (state, action) => {
      console.log(action.payload);
      state.informations.push(action.payload.data);
    })
    .addCase(createInformation.rejected, (state) => {
      state.error = true;
      console.log('Erreur');
    })
    // DeleteInformation
    .addCase(deleteInformation.fulfilled, (state, action) => {
      const deletedId = parseInt(action.payload, 10);

      state.informations = state.informations.filter(
        (info) => info.id !== deletedId
      );
    })
    .addCase(deleteInformation.rejected, (state) => {
      state.error = true;
    });
});

export default informationsReducer;
