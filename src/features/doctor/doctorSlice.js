import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api';
  
const initialState = { 
  doctors: [],
  doctor:{},
  status: 'idle',
  error: null,
};

export const fetchDoctor = createAsyncThunk(
  'doctors/fetchDoctor',
  async (_, { rejectWithValue }) => {
    try { 
       const response = await API.get("/accounts/profile/")
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchDoctors = createAsyncThunk(
  'doctors/fetchDoctors',
  async (_, { rejectWithValue }) => {
    try { 
       const response = await API.get("/appointments/doctor-list/")
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateDoctor = createAsyncThunk(
  'doctors/updateDoctor',
  async (updatedDoctor, { rejectWithValue,dispatch }) => {
    try {
       await API.patch('accounts/doctor/doctor_update_profile/', updatedDoctor);
        dispatch(fetchDoctor())
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {},
    extraReducers: (builder) => {
    builder
      // Fetch doctor
      .addCase(fetchDoctor.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDoctor.fulfilled, (state, action) => {
        state.status = 'succeeded'; 
        state.doctor = action.payload;
      })
      .addCase(fetchDoctor.rejected, (state, action) => {
        state.status = 'failed'; 
      }) 

         // Fetch doctors
      .addCase(fetchDoctors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.status = 'succeeded'; 
        state.doctors = action.payload?.results;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.status = 'failed'; 
      }) 
  }
});

export const { } = doctorSlice.actions;

export const selectAllDoctors = (state) => state.doctors.doctors;
export const selectDoctor = (state) =>state.doctors.doctor;
export const selectDoctorStatus = (state) => state.doctors.status;
export const selectDoctorError = (state) => state.doctors.error;
export const selectDoctorById = (state, id) => 
  state.doctors.doctors.find(doctor => doctor.id === id);

export default doctorSlice.reducer;