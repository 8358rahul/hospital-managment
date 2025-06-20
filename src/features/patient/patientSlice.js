import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { all } from 'axios';
import API from '../api';

const API_URL = import.meta.env.VITE_API_URL; // Adjust endpoint if needed

// Thunks

// 1. Fetch Patients
export const fetchPatients = createAsyncThunk(
  'patients/fetchPatients',
  async ( _, { rejectWithValue }) => {
    try {
      const response = await API.get(`${API_URL}/adminpanel/patients_list/`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const fetchAllPatients = createAsyncThunk(
  'patients/fetchAllPatients',
  async ( _, { rejectWithValue }) => {
    try {
      const response = await API.get(`${API_URL}/adminpanel/admin/patients/`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 2. Add Patient
export const addNewPatient = createAsyncThunk(
  'patients/addNewPatient',
  async ({newPatient, token}, {  rejectWithValue }) => {
   try {
      const response = await axios.post(
        `${API_URL}/adminpanel/patients/`,
        newPatient,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 3. Update Patient
export const updatePatientById = createAsyncThunk(
  'patients/updatePatientById',
  async ({newPatient, token}, {  rejectWithValue }) => {
   try {
      const response = await axios.patch(
        `${API_URL}/patient/patient_update_profile/`,
        newPatient,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
  allPatients: [],
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
      // Fetch all patients
      .addCase(fetchAllPatients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllPatients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allPatients = action.payload;
      })
      .addCase(fetchAllPatients.rejected, (state, action) => {
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
export const allPatients = (state) => state.patients.allPatients;
export const selectPatientStatus = (state) => state.patients.status;
export const selectPatientError = (state) => state.patients.error;
export const selectPatientById = (state, id) =>
  state.patients.patients.find((patient) => patient.id === id);

// Export reducer
export default patientSlice.reducer;
