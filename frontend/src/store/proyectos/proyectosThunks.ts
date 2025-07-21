import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleErrorMessage } from "../../utils/handleErrorMessage";
import { proyectosServices } from "../../services/proyectosServices";

// Thunk para login
export const getAllProyectosThunk = createAsyncThunk(
  "proyectos/getAllProyectosThunk",
  async (_, { rejectWithValue }) => {
    try {
        const response = await proyectosServices.getAll();
      return response;
    } catch (error: any) {
      return rejectWithValue(handleErrorMessage(error));
    }
  }
);

// Thunk para logout
export const getAllUnidadesThunk = createAsyncThunk(
  "proyectos/getAllUnidadesThunk",
  async (_, { rejectWithValue }) => {
    try {
        const response = await proyectosServices.getAllUnidades();
      return response;
    } catch (error: any) {
      return rejectWithValue(handleErrorMessage(error));
    }
  }
);

