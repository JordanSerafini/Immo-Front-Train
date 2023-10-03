// Library
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Redux toolkit
import {
  createAsyncThunk,
  createReducer,
  createAction,
} from '@reduxjs/toolkit';

// Axios types
import { AxiosError } from 'axios';

// Axios
import axiosInstance from '../../utils/axios';

// Typescript interface
import { Information } from '../../@types/information';
import { Action } from '../../@types/action';

// Typescript interface
import { ErrorType } from '../../@types/error';

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

export const resetInformations = createAction('informations/reset');

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
    try {
      const response = await axiosInstance.post('/informations', formData);

      return response;
    } catch (error) {
      throw new Error(
        (error as ErrorType).response.data.error ||
          (error as AxiosError).response?.statusText
      );
    }
  }
);

export const updateInformation = createAsyncThunk(
  'information/update',
  async (information: Information) => {
    try {
      // Temporary to fix uppercase issue. It will not longer be the case with a new populate
      information.type = information.type.toLowerCase();

      await axiosInstance.patch(`/informations/${information.id}`, information);

      const response = await axiosInstance.get(`/informations`);

      return response.data;
    } catch (error) {
      throw new Error(
        (error as ErrorType).response.data.error ||
          (error as AxiosError).response?.statusText
      );
    }
  }
);

export const createInformationAndAction = createAsyncThunk(
  'information/createWithAction',
  async ({ formData }: { formData: Information & Action }) => {
    try {
      // First request to create an information
      const response = await axiosInstance.post(`/informations`, formData);

      const actionData = {
        information_id: response.data.result.id,
        description: formData.description,
        date: formData.notification_date,
      };

      // Second request to create an action
      // We want to use the id from the previous created information to send it to the route post to create an action
      await axiosInstance.post(
        `/informations/${actionData.information_id}/actions`,
        actionData
      );

      return response;
    } catch (error) {
      throw new Error(
        (error as ErrorType).response.data.error ||
          (error as AxiosError).response?.statusText
      );
    }
  }
);

export const deleteInformation = createAsyncThunk(
  'information/delete',
  async ({ id }: { id: string }) => {
    try {
      await axiosInstance.delete(`/informations/${id}`);

      return id;
    } catch (error) {
      throw new Error(
        (error as ErrorType).response.data.error ||
          (error as AxiosError).response?.statusText
      );
    }
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
    .addCase(fetchInformations.rejected, (state, action) => {
      state.error = true;
      state.loading = false;

      toast.error(action.error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
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

      toast.success('Votre information à bien été créée !', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    .addCase(createInformation.rejected, (state, action) => {
      state.error = true;
      toast.error(action.error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    // CreateInformation WITH Action
    .addCase(createInformationAndAction.fulfilled, (state, action) => {
      state.informations.push(action.payload.data.result);
      state.filteredInformations.push(action.payload.data.result);

      toast.success('Votre information et votre action ont bien été créées !', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    .addCase(createInformationAndAction.rejected, (state, action) => {
      state.error = true;
      toast.error(action.error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    .addCase(updateInformation.pending, (state, action) => {
      console.log(action.payload);
    })
    // UpdateInformation
    .addCase(updateInformation.fulfilled, (state, action) => {
      state.informations = action.payload;
      state.filteredInformations = action.payload;

      state.loading = false;

      toast.success('Votre information a bien été mise à jour !', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    .addCase(updateInformation.rejected, (state, action) => {
      state.error = true;

      toast.error(action.error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
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

      toast.success("L'information a été supprimée avec succès !", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    .addCase(deleteInformation.rejected, (state, action) => {
      state.error = true;

      toast.error(action.error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    .addCase(resetInformations, () => {
      return initialState;
    });
});

export default informationsReducer;
