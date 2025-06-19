import { createSlice, } from '@reduxjs/toolkit'; 
 

 

const initialState = {
  bills: [],
  status: 'idle',
  error: null,
};

const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    setBills: (state, action) => {
      state.bills = action.payload;
      state.status = 'succeeded';
    },
    addBill: (state, action) => {
      state.bills.push(action.payload);
    },
    updateBillStatus: (state, action) => {
      const index = state.bills.findIndex(bill => bill.id === action.payload.id);
      if (index !== -1) {
        state.bills[index].status = action.payload.status;
      }
    },
    setLoading: (state, action ) => {
      state.status = action.payload;
    },
    setError: (state, action ) => {
      state.error = action.payload;
      state.status = 'failed';
    },
  },
});

export const { setBills, addBill, updateBillStatus, setLoading, setError } = billingSlice.actions;

export const selectAllBills = (state) => state.billing.bills; 
export const selectBillById = (state, id) => 
  state.billing.bills.find(bill => bill.id === id);

export default billingSlice.reducer;