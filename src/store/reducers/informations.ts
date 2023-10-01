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
import { Action } from '../../@types/action';

// Create an information interface
interface InformationsState {
  loading: boolean;
  error: boolean;
  informations: Information[];
  filteredInformations: Information[];
}

export const initialState: InformationsState = {
  loading: false,
  error: false,
  informations: [],
  filteredInformations: [],
};

export const resetInformations = createAction("informations/reset");

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
  async ({ formData }: { formData: Information }) => {
    const response = await axiosInstance.post('/informations', formData);

    return response;
  }
);

export const updateInformation = createAsyncThunk(
  'information/update',
  async (information: Information) => {
    console.log(information);

    const response1 = await axiosInstance.patch(
      `/informations/${information.id}`,
      information
    );

    console.log(response1);

    const response = await axiosInstance.get(`/informations`);

    return response.data;
  }
);

export const createInformationAndAction = createAsyncThunk(
  'information/createWithAction',
  async ({
    formData,
  }: {
    formData: Information & Action
  }) => {
    // First request to create an information
    const response = await axiosInstance.post(`/informations`, formData);

    const actionData = {
      information_id: response.data.result.id,
      description: formData.description,
      date: formData.notification_date
    }

    // Second request to create an action
    // We want to use the id from the previous created information to send it to the route post to create an action
    await axiosInstance.post(
      `/informations/${actionData.information_id}/actions`,
      actionData
    );


    return response;
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
      state.filteredInformations = action.payload;

      state.loading = false;
    })
    .addCase(fetchInformations.rejected, (state) => {
      state.error = true;
      console.log('Une erreur est survenue');
    })
    .addCase(filterInformation, (state, action) => {
      const { slug } = action.payload;

      const slugLC = slug.toLowerCase();

      const filteredInfos = state.informations.filter((info) => {
        const address = `${
          info.address_number
        } ${info.address_street.toLowerCase()} ${
          info.code_zip
        } ${info.address_city.toLowerCase()}`;

        if (
          address.includes(slugLC) ||
          info.owner_name.toLowerCase().includes(slugLC)
        )
          return true;

        return false;
      });

      if (!slug.length) {
        state.filteredInformations = state.informations;
      } else {
        state.filteredInformations = filteredInfos;
      }
    })
    // CreateInformation
    .addCase(createInformation.fulfilled, (state, action) => {
      state.informations.push(action.payload.data.result);
      state.filteredInformations.push(action.payload.data.result);
    })
    .addCase(createInformation.rejected, (state) => {
      state.error = true;
      console.log('erreur');
    })
    // CreateInformation WITH Action
    .addCase(createInformationAndAction.fulfilled, (state, action) => {
      state.informations.push(action.payload.data.result);
      state.filteredInformations.push(action.payload.data.result);
    })
    .addCase(createInformationAndAction.rejected, (state) => {
      state.error = true;
      console.log('Erreur');
    })
    // UpdateInformation
    .addCase(updateInformation.fulfilled, (state, action) => {
      state.informations = action.payload;
      state.filteredInformations = action.payload;

      state.loading = false;
    })
    .addCase(updateInformation.rejected, (state) => {
      state.error = true;
    })
    // DeleteInformation
    .addCase(deleteInformation.fulfilled, (state, action) => {
      const deletedId = parseInt(action.payload, 10);

      state.informations = state.informations.filter(
        (info) => info.id !== deletedId
      );
      state.filteredInformations = state.filteredInformations.filter(
        (info) => info.id !== deletedId
      );
    })
    .addCase(deleteInformation.rejected, (state) => {
      state.error = true;
    })
    .addCase(resetInformations, () => {
      return initialState;
    })
});

export default informationsReducer;
