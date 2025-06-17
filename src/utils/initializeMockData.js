// src/utils/initializeMockData.ts
import store from '../app/store';
import { mockDoctors, mockPatients, mockAppointments, mockMedicalRecords, mockBills, mockReports } from './mockData';
// import { setDoctors } from '../features/doctor/doctorSlice';
// import { setPatients } from '../features/patient/patientSlice';
import { setAppointments } from '../features/appointment/appointmentSlice';
import { setRecords } from '../features/record/recordSlice';
import { setBills } from '../features/billing/billingSlice';
import { setReports } from '../features/report/reportSlice';

export const initializeMockData = () => {
  // store.dispatch(setDoctors(mockDoctors));
  // store.dispatch(setPatients(mockPatients));
  store.dispatch(setAppointments(mockAppointments));
  store.dispatch(setRecords(mockMedicalRecords)); 
  store.dispatch(setBills(mockBills));
  store.dispatch(setReports(mockReports));

};