import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import doctorReducer from '../features/doctor/doctorSlice';
import patientReducer from '../features/patient/patientSlice';
import appointmentReducer from '../features/appointment/appointmentSlice';
import recordReducer from '../features/record/recordSlice';
import billingReducer from '../features/billing/billingSlice';
import reportReducer from '../features/report/reportSlice';
import patientReportReducer from '../features/patientReport/patientReportSlice';
import adminDashboardReducer from "../features/adminDashboard/adminDasboardSlice"
import adminReportReducer from "../features/adminDashboard/adminReportSlice"
import doctorDashboardReducer from "../features/doctorDashboard/doctorDashboardSlice"
import patientDashboardReducer from "../features/patientDashboard/patientDashboardSlice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    doctors: doctorReducer,
    patients: patientReducer,
    appointments: appointmentReducer,
    records: recordReducer,
    billing: billingReducer,
    report: reportReducer,
    patientReport: patientReportReducer,
    adminDashboard:adminDashboardReducer,
    adminReport: adminReportReducer,
    patientDashboard:patientDashboardReducer,
    doctorDashboard: doctorDashboardReducer,

  },
});

export default store;

