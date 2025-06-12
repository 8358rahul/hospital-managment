import { createSlice,type PayloadAction } from '@reduxjs/toolkit'; 
import type { Appointment } from '../../@types';

interface AppointmentState {
  appointments: Appointment[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AppointmentState = {
  appointments: [],
  status: 'idle',
  error: null,
};

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<'idle' | 'loading' | 'succeeded' | 'failed'>) => {
      state.status = action.payload;
    },
    setAppointments: (state, action: PayloadAction<Appointment[]>) => {
      state.appointments = action.payload;
      state.status = 'succeeded';
    },
    addAppointment: (state, action: PayloadAction<Appointment>) => {
      state.appointments.push(action.payload);
    },
    updateAppointment: (state, action: PayloadAction<Appointment>) => {
      const index = state.appointments.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
    },
    removeAppointment: (state, action: PayloadAction<string>) => {
      state.appointments = state.appointments.filter(appointment => appointment.id !== action.payload);
    },
    setError: (state, action: PayloadAction<string>) => {
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

export const selectAllAppointments = (state: { appointments: AppointmentState }) => 
  state.appointments.appointments;
export const selectAppointmentStatus = (state: { appointments: AppointmentState }) => 
  state.appointments.status;
export const selectAppointmentError = (state: { appointments: AppointmentState }) => 
  state.appointments.error;
export const selectAppointmentsByPatient = (state: { appointments: AppointmentState }, patientId: string) => 
  state.appointments.appointments.filter(a => a.patientId === patientId);
export const selectAppointmentsByDoctor = (state: { appointments: AppointmentState }, doctorId: string) => 
  state.appointments.appointments.filter(a => a.doctorId === doctorId);

export default appointmentSlice.reducer;