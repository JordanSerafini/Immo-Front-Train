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

    console.log(response.data);

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

export const createInformationAndAction = createAsyncThunk(
  'information/create',
  async ({
    formData,
  }: {
    formData: {
      date: string;
      sector_id: number;
      notification_date: string;
    };
  }) => {
    // First request to create an information
    const response = await axiosInstance.post(`/informations`, formData);

    // Second request to create an action
    await axiosInstance.post(
      `/informations/${response.data.data.id}/actions`,
      formData
    );

    return response ;
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
    .addCase(createInformationAndAction.fulfilled, (state, action) => {
      console.log(action.payload);
      state.informations.push(action.payload.data.data);
    })
    .addCase(createInformationAndAction.rejected, (state) => {
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
