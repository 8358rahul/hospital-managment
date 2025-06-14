import { createSlice } from '@reduxjs/toolkit'; 
 

const initialState = {
  records: [],
  status: 'idle',
  error: null,
};

const recordSlice = createSlice({
  name: 'record',
  initialState,
  reducers: {
    setRecords: (state, action) => { 
      state.records = action.payload;
      state.status = 'succeeded';
    },
    // ... other reducers
  },
});

// Correct selector implementation
export const selectAllMedicalRecords = (state) => state.records;
 

export const { setRecords } = recordSlice.actions;
export default recordSlice.reducer;