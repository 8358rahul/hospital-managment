import { createSlice, type PayloadAction } from '@reduxjs/toolkit'; 
import type { Bill } from '../../@types';
import type { RootState } from '../../app/store';

interface BillingState {
  bills: Bill[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BillingState = {
  bills: [],
  status: 'idle',
  error: null,
};

const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    setBills: (state, action: PayloadAction<Bill[]>) => {
      state.bills = action.payload;
      state.status = 'succeeded';
    },
    addBill: (state, action: PayloadAction<Bill>) => {
      state.bills.push(action.payload);
    },
    updateBillStatus: (state, action: PayloadAction<{id: string, status: 'Pending' | 'paid' | 'cancelled'}>) => {
      const index = state.bills.findIndex(bill => bill.id === action.payload.id);
      if (index !== -1) {
        state.bills[index].status = action.payload.status;
      }
    },
    setLoading: (state, action: PayloadAction<'idle' | 'loading' | 'succeeded' | 'failed'>) => {
      state.status = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = 'failed';
    },
  },
});

export const { setBills, addBill, updateBillStatus, setLoading, setError } = billingSlice.actions;

export const selectAllBills = (state: RootState) => state.billing.bills;
export const selectBillsByPatient = (state: RootState, patientId: string) => 
  state.billing.bills.filter(bill => bill.patientId === patientId);
export const selectBillById = (state: RootState, id: string) => 
  state.billing.bills.find(bill => bill.id === id);

export default billingSlice.reducer;