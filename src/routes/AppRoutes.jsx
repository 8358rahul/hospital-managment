import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  alreadyLoggedIn,
  selectCurrentRole,
  selectCurrentToken,
} from "../features/auth/authSlice";
import AdminLayout from "../layouts/AdminLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "../pages/NotFound";

// Admin Pages
import AdminAppointments from "../pages/admin/Appointments";
import AdminDashboard from "../pages/admin/Dashboard";
import AdminDoctors from "../pages/admin/Doctors";
import GenerateReport from "../pages/admin/GenerateReport";
import AdminPatients from "../pages/admin/Patients";
import AdminReports from "../pages/admin/Reports";
import ViewReport from "../pages/admin/ViewReport";

// Doctor Pages
import DoctorAppointments from "../pages/doctor/Appointments";
import DoctorDashboard from "../pages/doctor/Dashboard";
import DoctorPatients from "../pages/doctor/Patients";

// Patient Pages
import { useEffect } from "react";
import { fetchUserDetail } from "../features/doctor/doctorSlice";
import Forgot from "../pages/auth/Forgot";
import ShareBillPage from "../pages/doctor/AddBillForm";
import Profile from "../pages/doctor/Profile";
import PatientAppointments from "../pages/patient/Appointments";
import PatientBills from "../pages/patient/Bills";
import PatientDashboard from "../pages/patient/Dashboard";
import PatientDoctors from "../pages/patient/Doctors";
import ReportDetails from "../pages/patient/ReportDetails";
import PatientReports from "../pages/patient/Reports";

const AppRoutes = () => {
  const token = useSelector(selectCurrentToken);
  const role = useSelector(selectCurrentRole);
  const dispatch = useDispatch();

  const getProfile = async () => {
    await dispatch(fetchUserDetail());
  };

  useEffect(() => {
    if (token && role) {
      getProfile();
    }
  }, [token, dispatch, role]);

  useEffect(() => {
    const checkUserIsLoggedIn = () => {
      try {
        const user = localStorage.getItem("user");
        dispatch(alreadyLoggedIn(JSON.parse(user)));
      } catch (error) {
        console.log(error);
      }
    };
    checkUserIsLoggedIn();
  }, []);

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={!token || !role ? <Login /> : <Navigate to={`/${role}`} />}
      />
      <Route
        path="/register"
        element={!token || !role ? <Register /> : <Navigate to={`/${role}`} />}
      />

      <Route path="/forgot" element={<Forgot />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          token && role === "admin" ? <AdminLayout /> : <Navigate to="/login" />
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="/admin/patients" element={<AdminPatients />} />
        <Route path="doctors" element={<AdminDoctors />} />
        <Route path="appointments" element={<AdminAppointments />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="reports/generate" element={<GenerateReport />} />
        <Route path="reports/:id" element={<ViewReport />} />
        <Route path="profile" element={<Profile />} />  
      </Route>

      {/* Doctor Routes */}
      <Route
        path="/doctor"
        element={
          token && role === "doctor" ? (
            <AdminLayout />
          ) : (
            <Navigate to="/login" />
          )
        }
      >
        <Route index element={<DoctorDashboard />} />
        <Route path="appointments" element={<DoctorAppointments />} />
        <Route path="patients" element={<DoctorPatients />} />
        <Route path="profile" element={<Profile />} />
        <Route path="sharebill/:id" element={<ShareBillPage />} /> 

      </Route>

      {/* Patient Routes */}
      <Route
        path="/patient"
        element={
          token && role === "patient" ? (
            <AdminLayout />
          ) : (
            <Navigate to="/login" />
          )
        }
      >
        <Route index element={<PatientDashboard />} />
        <Route path="doctors" element={<PatientDoctors />} />
        <Route path="appointments" element={<PatientAppointments />} />
        <Route path="reports" element={<PatientReports />} />
        <Route path="reports/:id" element={<ReportDetails />} />
        <Route path="bills" element={<PatientBills />} />
        {/* <Route path="*" element={<SettingsPage />} />  */}
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Default Route */}
      <Route
        path="/"
        element={<Navigate to={token ? `/${role}` : "/login"} />}
      />


      {/* Not Found Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
