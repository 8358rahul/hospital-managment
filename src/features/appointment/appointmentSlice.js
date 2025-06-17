
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;

// // Helper to get headers with token
// const getAuthHeaders = () => {
//   const token = localStorage.getItem('token');
//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
// };

// // Thunks
// export const fetchAppointments = createAsyncThunk(
//   'appointments/fetchAppointments',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(API_URL, getAuthHeaders());
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// export const addNewAppointment = createAsyncThunk(
//   'appointments/addNewAppointment',
//   async (newAppointment, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(API_URL, newAppointment, getAuthHeaders());
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// export const updateAppointmentById = createAsyncThunk(
//   'appointments/updateAppointmentById',
//   async (updatedAppointment, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(
//         `${API_URL}/${updatedAppointment.id}`,
//         updatedAppointment,
//         getAuthHeaders()
//       );
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// export const deleteAppointmentById = createAsyncThunk(
//   'appointments/deleteAppointmentById',
//   async (id, { rejectWithValue }) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
//       return id;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // Initial state
// const initialState = {
//   appointments: [],
//   status: 'idle',
//   error: null,
// };

// // Slice
// const appointmentSlice = createSlice({
//   name: 'appointments',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAppointments.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchAppointments.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.appointments = action.payload;
//       })
//       .addCase(fetchAppointments.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(addNewAppointment.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(addNewAppointment.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.appointments.push(action.payload);
//       })
//       .addCase(addNewAppointment.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(updateAppointmentById.fulfilled, (state, action) => {
//         const index = state.appointments.findIndex((a) => a.id === action.payload.id);
//         if (index !== -1) {
//           state.appointments[index] = action.payload;
//         }
//       })
//       .addCase(deleteAppointmentById.fulfilled, (state, action) => {
//         state.appointments = state.appointments.filter((a) => a.id !== action.payload);
//       });
//   },
// });

// // Selectors
// export const selectAllAppointments = (state) => state.appointments.appointments;
// export const selectAppointmentStatus = (state) => state.appointments.status;
// export const selectAppointmentError = (state) => state.appointments.error;
// export const selectAppointmentsByPatient = (state, patientId) =>
//   state.appointments.appointments.filter((a) => a.patientId === patientId);
// export const selectAppointmentsByDoctor = (state, doctorId) =>
//   state.appointments.appointments.filter((a) => a.doctorId === doctorId);
// export const selectAppointmentsByPatientAndDoctor = (state, patientId, doctorId) =>
//   state.appointments.appointments.filter((a) => a.patientId === patientId && a.doctorId === doctorId);

// // Export reducer
// export default appointmentSlice.reducer;

import { createSlice } from '@reduxjs/toolkit'; 
 

const initialState = {
  appointments: [],
  status: 'idle',
  error: null,
};

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.status = action.payload;
    },
    setAppointments: (state, action) => {
      state.appointments = action.payload;
      state.status = 'succeeded';
    },
    addAppointment: (state, action) => {
      state.appointments.push(action.payload);
    },
    updateAppointment: (state, action) => {
      const index = state.appointments.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
    },
    removeAppointment: (state, action) => {
      state.appointments = state.appointments.filter(appointment => appointment.id !== action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    },
  },
});

export const { 
  setLoading, 
  setAppointments, 
  addAppointment, 
  updateAppointment, 
  removeAppointment, 
  setError 
} = appointmentSlice.actions;

export const selectAllAppointments = (state) => 
  state.appointments.appointments;
export const selectAppointmentStatus = (state) => 
  state.appointments.status;
export const selectAppointmentError = (state) => 
  state.appointments.error;
export const selectAppointmentsByPatient = (state, patientId) => 
  state.appointments.appointments.filter(a => a.patientId === patientId);
export const selectAppointmentsByDoctor = (state, doctorId) => 
  state.appointments.appointments.filter(a => a.doctorId === doctorId);

export const selectAppointmentsByPatientAndDoctor = (
  state, 
  patientId ,
  doctorId
) => state.appointments.appointments.filter(
  a => a.patientId === patientId && a.doctorId === doctorId
);

export default appointmentSlice.reducer;