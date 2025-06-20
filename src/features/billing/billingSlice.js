import { createAsyncThunk, createSlice, } from '@reduxjs/toolkit'; 
import API from '../api';

 

const initialState = {
  bills: [],
  status: 'idle',
  error: null,
};

export const fetchBills = createAsyncThunk(
  'billing/fetchBills',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/billing/patient/dashboard-bills/")
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
)

const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
 
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBills.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBills.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bills = action.payload;
      })
      .addCase(fetchBills.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const {  } = billingSlice.actions;

export const selectAllBills = (state) => state.billing.bills;  
export const selectAllBillsStatus = (state) => state.billing.status;

export default billingSlice.reducer;