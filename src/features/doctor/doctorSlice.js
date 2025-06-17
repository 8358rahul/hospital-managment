// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL; // ✅ Works with Vite
// // Thunks
// export const fetchDoctors = createAsyncThunk(
//   'doctors/fetchDoctors',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(API_URL);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// export const addNewDoctor = createAsyncThunk(
//   'doctors/addNewDoctor',
//   async (newDoctor, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(API_URL, newDoctor);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// export const updateDoctorById = createAsyncThunk(
//   'doctors/updateDoctorById',
//   async (updatedDoctor, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(`${API_URL}/${updatedDoctor.id}`, updatedDoctor);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// export const deleteDoctorById = createAsyncThunk(
//   'doctors/deleteDoctorById',
//   async (id, { rejectWithValue }) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       return id;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // Initial state
// const initialState = {
//   doctors: [],
//   status: 'idle',
//   error: null,
// };

// // Slice
// const doctorSlice = createSlice({
//   name: 'doctors',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch
//       .addCase(fetchDoctors.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchDoctors.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.doctors = action.payload;
//       })
//       .addCase(fetchDoctors.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })

//       // Add
//       .addCase(addNewDoctor.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(addNewDoctor.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.doctors.push(action.payload);
//       })
//       .addCase(addNewDoctor.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })

//       // Update
//       .addCase(updateDoctorById.fulfilled, (state, action) => {
//         const index = state.doctors.findIndex(d => d.id === action.payload.id);
//         if (index !== -1) {
//           state.doctors[index] = action.payload;
//         }
//       })

//       // Delete
//       .addCase(deleteDoctorById.fulfilled, (state, action) => {
//         state.doctors = state.doctors.filter(d => d.id !== action.payload);
//       });
//   }
// });

// // Selectors
// export const selectAllDoctors = (state) => state.doctors.doctors;
// export const selectDoctorStatus = (state) => state.doctors.status;
// export const selectDoctorError = (state) => state.doctors.error;
// export const selectDoctorById = (state, id) =>
//   state.doctors.doctors.find(doctor => doctor.id === id);

// // Export reducer
// export default doctorSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
 
const initialState = {
  doctors: [],
  status: 'idle',
  error: null,
};

const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.status = action.payload;
    },
    setDoctors: (state, action ) => {
      state.doctors = action.payload;
      state.status = 'succeeded';
    },
    addDoctor: (state, action ) => {
      state.doctors.push(action.payload);
    },
    updateDoctor: (state, action ) => {
      const index = state.doctors.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        state.doctors[index] = action.payload;
      }
    },
    removeDoctor: (state, action ) => {
      state.doctors = state.doctors.filter(doctor => doctor.id !== action.payload);
    },
    setError: (state, action ) => {
      state.error = action.payload;
      state.status = 'failed';
    },
  },
});

export const { 
  setLoading, 
  setDoctors, 
  addDoctor, 
  updateDoctor, 
  removeDoctor, 
  setError 
} = doctorSlice.actions;

export const selectAllDoctors = (state) => state.doctors.doctors;
export const selectDoctorStatus = (state) => state.doctors.status;
export const selectDoctorError = (state) => state.doctors.error;
export const selectDoctorById = (state, id) => 
  state.doctors.doctors.find(doctor => doctor.id === id);

export default doctorSlice.reducer;