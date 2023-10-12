// Library
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Redux toolkit
import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

// Axios types
import { AxiosError } from 'axios';

// Axios
import axiosInstance from '../../utils/axios';

// Typescript interface
import { Sector } from '../../@types/sector';
import { ErrorType } from '../../@types/error';

interface SectorState {
  loading: boolean;
  error: boolean;
  data: Sector[];
}

export const initialState: SectorState = {
  loading: false,
  error: false,
  data: [],
};

export const fetchSectors = createAsyncThunk('sector/getAll', async () => {
  try {
    const response = await axiosInstance.get('/sectors');

    return response.data;
  } catch (error) {
    throw new Error(
      (error as ErrorType).response.data.error ||
        (error as AxiosError).response?.statusText
    );
  }
});

export const createSector = createAsyncThunk(
  'sector/create',
  async ({ formData }: { formData: Sector }) => {
    try {
      const response = await axiosInstance.post('/sectors', formData);

      return response.data;
    } catch (error) {
      throw new Error(
        (error as ErrorType).response.data.error ||
          (error as AxiosError).response?.statusText
      );
    }
  }
);

export const editSector = createAsyncThunk(
  'sector/edit',
  async (formData: Sector) => {
    try {
      const response = await axiosInstance.patch(
        `/sectors/${formData.id}`,
        formData
      );

      return response.data;
    } catch (error) {
      throw new Error(
        (error as ErrorType).response.data.error ||
          (error as AxiosError).response?.statusText
      );
    }
  }
);

export const deleteSector = createAsyncThunk(
  'sector/delete',
  async ({ id }: { id: string }) => {
    try {
      const response = await axiosInstance.delete(`/sectors/${id}`);

      return { response, id };
    } catch (error) {
      throw new Error(
        (error as ErrorType).response.data.error ||
          (error as AxiosError).response?.statusText
      );
    }
  }
);

export const resetSectors = createAction('sectors/reset');

const sectorReducer = createReducer(initialState, (builder) => {
  builder
    // Fetch All Sectors
    .addCase(fetchSectors.pending, (state) => {
      state.error = false;
      state.loading = true;
    })
    .addCase(fetchSectors.fulfilled, (state, action) => {
      state.data = action.payload;

      state.loading = false;
    })
    .addCase(fetchSectors.rejected, (state, action) => {
      state.error = false;
      state.loading = false;

      toast.error(action.error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    // CreateSector
    .addCase(createSector.pending, (state) => {
      state.error = false;
    })
    .addCase(createSector.fulfilled, (state, action) => {
      const { result } = action.payload;
      state.data.push(result);

      toast.success(`Ajout du secteur ${result.city} réalisé avec succès !`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    .addCase(createSector.rejected, (state, action) => {
      state.error = false;
      state.loading = false;

      toast.error(action.error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    // Edit Sector
    .addCase(editSector.pending, (state) => {
      state.error = false;
    })
    .addCase(editSector.fulfilled, (state, action) => {
      const updatedSector = action.payload.result;

      state.data = state.data.map((sector) => {
        // For each sector, we'll find the one with the corresponding id
        if (sector.id === updatedSector.id) {
          // We return it
          return updatedSector;
        }
        // Otherwise, we return all of others sectors
        return sector;
      });

      toast.success(
        `Modification du secteur ${updatedSector.city.toUpperCase()} réalisée avec succès !`,
        {
          position: toast.POSITION.BOTTOM_RIGHT,
        }
      );
    })
    .addCase(editSector.rejected, (state, action) => {
      state.error = false;
      state.loading = false;

      toast.error(action.error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    // Delete Sector
    .addCase(deleteSector.fulfilled, (state, action) => {
      const deletedId = parseInt(action.payload.id, 10);

      state.data = state.data.filter((sector) => sector.id !== deletedId);

      toast.success('Le secteur a été supprimé avec succès !', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    .addCase(deleteSector.rejected, (state, action) => {
      state.error = true;

      toast.error(action.error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    })
    // Reset
    .addCase(resetSectors, () => {
      return initialState;
    });
});

export default sectorReducer;
