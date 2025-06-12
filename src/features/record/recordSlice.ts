import { createSlice,type PayloadAction } from '@reduxjs/toolkit'; 
import type { MedicalRecord } from '../../@types';
import type { RootState } from '../../app/store';

interface RecordState {
  records: MedicalRecord[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: RecordState = {
  records: [],
  status: 'idle',
  error: null,
};

const recordSlice = createSlice({
  name: 'record',
  initialState,
  reducers: {
    setRecords: (state, action: PayloadAction<MedicalRecord[]>) => { 
      state.records = action.payload;
      state.status = 'succeeded';
    },
    // ... other reducers
  },
});

// Correct selector implementation
export const selectAllMedicalRecords = (state: RootState) => state.records;
 

export const { setRecords } = recordSlice.actions;
export default recordSlice.reducer;