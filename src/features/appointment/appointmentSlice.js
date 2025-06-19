import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
import API from '../api';
 

export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAll',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/appointments/appointments/`, {
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

export const fetchPatientAppointments = createAsyncThunk(
  'appointments/fetchByPatient',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `${API_URL}/appointments/appointments/` 
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchDoctorAppointments = createAsyncThunk(
  'appointments/fetchByDoctor',
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`${API_URL}/appointments/appointments/?doctor_id=${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const addNewAppointment = createAsyncThunk(
  'appointments/add',
  async ( newAppointment, { rejectWithValue }) => {
    try {
      const response = API.post(`${API_URL}/appointments/book/`, newAppointment)
      
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
 
export const appointmentsStatus = createAsyncThunk(
  'appointments/status',
  async (data, { rejectWithValue,dispatch }) => { 
    try {
      await API.patch(`${API_URL}/appointments/update-status/${data.id}/`,{status:data.status});
      dispatch(fetchDoctorAppointments(data?.doctor_id));
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Initial state
const initialState = {
  appointments: [],
  status: 'idle',
  error: null,
};

// Slice
const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchAppointments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Fetch by patient
      .addCase(fetchPatientAppointments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPatientAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments = action.payload;
      })
      .addCase(fetchPatientAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Fetch by doctor
      .addCase(fetchDoctorAppointments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments = action.payload;
      })
      .addCase(fetchDoctorAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Add
      .addCase(addNewAppointment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addNewAppointment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments.push(action.payload);
      })
      .addCase(addNewAppointment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      }) 
  },
});

// Selectors
export const selectAllAppointments = (state) => state.appointments.appointments;
export const selectAppointmentStatus = (state) => state.appointments.status;
export const selectAppointmentError = (state) => state.appointments.error;
export const selectAppointmentsByPatient = (state) => state.appointments.appointments;
export const selectAppointmentsByDoctor =  (state) => state.appointments.appointments;
export const selectAppointmentsByPatientAndDoctor =  (state) => state.appointments.appointments;
// Export reducer
export default appointmentSlice.reducer;
