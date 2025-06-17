import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/patients`; // Adjust endpoint if needed

// Thunks

// 1. Fetch Patients
export const fetchPatients = createAsyncThunk(
  'patients/fetchPatients',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 2. Add Patient
export const addNewPatient = createAsyncThunk(
  'patients/addNewPatient',
  async (newPatient, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.post(API_URL, newPatient, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 3. Update Patient
export const updatePatientById = createAsyncThunk(
  'patients/updatePatientById',
  async (updatedPatient, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.put(`${API_URL}/${updatedPatient.id}`, updatedPatient, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 4. Delete Patient
export const deletePatientById = createAsyncThunk(
  'patients/deletePatientById',
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Initial state
const initialState = {
  patients: [],
  status: 'idle',
  error: null,
};

// Slice
const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch
      .addCase(fetchPatients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.patients = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Add
      .addCase(addNewPatient.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNewPatient.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.patients.push(action.payload);
      })
      .addCase(addNewPatient.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Update
      .addCase(updatePatientById.fulfilled, (state, action) => {
        const index = state.patients.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.patients[index] = action.payload;
        }
      })

      // Delete
      .addCase(deletePatientById.fulfilled, (state, action) => {
        state.patients = state.patients.filter(p => p.id !== action.payload);
      });
  },
});

// Selectors
export const selectAllPatients = (state) => state.patients.patients;
export const selectPatientStatus = (state) => state.patients.status;
export const selectPatientError = (state) => state.patients.error;
export const selectPatientById = (state, id) =>
  state.patients.patients.find((patient) => patient.id === id);

// Export reducer
export default patientSlice.reducer;
