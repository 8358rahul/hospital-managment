import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  selectCurrentRole,
  selectCurrentToken,
} from "../features/auth/authSlice";
import AdminLayout from "../layouts/AdminLayout";
import DoctorLayout from "../layouts/DoctorLayout";
import PatientLayout from "../layouts/PatientLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "../pages/NotFound";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import AdminPatients from "../pages/admin/Patients";
import AdminDoctors from "../pages/admin/Doctors";
import AdminAppointments from "../pages/admin/Appointments";
import AdminReports from "../pages/admin/Reports";
import GenerateReport from "../pages/admin/GenerateReport";
import ViewReport from "../pages/admin/ViewReport";

// Doctor Pages
import DoctorDashboard from "../pages/doctor/Dashboard";
import DoctorAppointments from "../pages/doctor/Appointments";
import DoctorPatients from "../pages/doctor/Patients";

// Patient Pages
import PatientDashboard from "../pages/patient/Dashboard";
import PatientDoctors from "../pages/patient/Doctors";
import PatientAppointments from "../pages/patient/Appointments";
import BookAppointment from "../pages/patient/BookAppointment";
import PatientRecords from "../pages/patient/Records";
import PatientReports from "../pages/patient/Reports";
import ReportDetails from "../pages/patient/ReportDetails";
import PatientBills from "../pages/patient/Bills";
import BillDetails from "../pages/patient/BillDetails";
import PatientDetails from "../pages/doctor/PatientDetails";
import SettingsPage from "../pages/Setting";
import ProfilePage from "../pages/Profile";

const AppRoutes = () => {
  const token = useSelector(selectCurrentToken);
  const role = useSelector(selectCurrentRole);

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={!token ? <Login /> : <Navigate to={`/${role}`} />}
      />
      <Route
        path="/register"
        element={!token ? <Register /> : <Navigate to={`/${role}`} />}
      />

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
      </Route>

      {/* Doctor Routes */}
      <Route
        path="/doctor"
        element={
          token && role === "doctor" ? (
            <DoctorLayout />
          ) : (
            <Navigate to="/login" />
          )
        }
      >
        <Route index element={<DoctorDashboard />} />
        <Route path="appointments" element={<DoctorAppointments />} />
        <Route path="patients" element={<DoctorPatients />} />
        <Route path="patients/:patientId" element={<PatientDetails />} />
      </Route>

      {/* Patient Routes */}
      <Route
        path="/patient"
        element={
          token && role === "patient" ? (
            <PatientLayout />
          ) : (
            <Navigate to="/login" />
          )
        }
      >
        <Route index element={<PatientDashboard />} />
        <Route path="doctors" element={<PatientDoctors />} />
        <Route path="appointments" element={<PatientAppointments />} />
        <Route path="book-appointment" element={<BookAppointment />} />
        <Route path="records" element={<PatientRecords />} />
        <Route path="reports" element={<PatientReports />} />
        <Route path="reports/:id" element={<ReportDetails />} />
        <Route path="bills" element={<PatientBills />} />
        <Route path="bills/:id" element={<BillDetails />} />
        <Route path="*" element={<SettingsPage />} />
        <Route path="*" element={<ProfilePage />} />
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
