

import React, { useEffect } from 'react';
import {
  Box,
  Card,
  Grid,
  Typography,
  Avatar,
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PeopleIcon from '@mui/icons-material/People';
import EventNoteIcon from '@mui/icons-material/EventNote';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAdminDashboard,
  selectDashboardData,
  selectDashboardStatus,
} from "../../features/adminDashboard/adminDasboardSlice"
import dashboardBg from '../../assets/dashboard.jpg';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentToken } from '../../features/auth/authSlice';

const DashboardCard = ({ title, count, icon, color }) => (
  <Card
    sx={{
      width: '350px',
      height: '150px',
      boxShadow: 6,
      borderRadius: 3,
      px: 3,
      py: 4,
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <Box display="flex" alignItems="center" gap={3}>
      <Avatar sx={{ bgcolor: color, width: 60, height: 60 }}>{icon}</Avatar>
      <Box>
        <Typography variant="h6" fontWeight="bold" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h4" fontWeight="bold" mt={1}>
          {count}
        </Typography>
      </Box>
    </Box>
  </Card>
);

const COLORS = ['#ff9800', '#4caf50', '#1976d2', '#d32f2f', '#00acc1'];

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectDashboardData);
  const status = useSelector(selectDashboardStatus);
      const token = useAppSelector(selectCurrentToken);
  

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAdminDashboard(token));
    }
  }, [dispatch, token, status]);

  const totalDoctors = data?.total_doctors || 0;
  const totalPatients = data?.total_patients || 0;
  const totalAppointments = data?.total_appointments || 0;
  const totalRequests = data?.total_pending_appointments || 0;

  // const todayAppointments = Object.entries(data?.today_appointment_status || {}).map(
  //   ([name, value]) => ({ name, value })
  // );

  const doctorSpecializations = data?.doctor_by_specialization?.map(
    (item) => ({
      name: item.specialization,
      value: item.count,
    })
  ) || [];

  const patientReport = data?.weekly_patients?.map((item, index) => ({
    name: `Week ${index + 1}`,
    Last: Math.floor(item.count * 0.8),
    Current: item.count,
  })) || [];

  const appointmentReport = data?.weekly_appointments?.map((item, index) => ({
    name: `Week ${index + 1}`,
    Last: Math.floor(item.count * 0.75),
    Current: item.count,
  })) || [];

  const reports = [
    {
      title: 'Patient Report',
      data: patientReport,
      color: ['#2e7d32', '#81c784']
    },
    {
      title: 'Appointment Report',
      data: appointmentReport,
      color: ['#d32f2f', '#ef9a9a']
    },
  ];

  return (
    <Box
      px={{ xs: 2, sm: 4 }} py={4}
      sx={{
        backgroundImage: `linear-gradient(rgba(224, 246, 246, 0.85), rgba(255,255,255,0.95)), url(${dashboardBg})`,
        backgroundSize: 'cover',
        borderRadius: '5px',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3} mb={5} sx={{marginTop:"20px"}}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="Total Doctors" count={totalDoctors} icon={<LocalHospitalIcon />} color="#1976d2" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="Total Patients" count={totalPatients} icon={<PeopleIcon />} color="#2e7d32" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="Total Appointments" count={totalAppointments} icon={<EventNoteIcon />} color="#ed6c02" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="Total Requests" count={totalRequests} icon={<HelpOutlineIcon />} color="#d32f2f" />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {[...reports, {
          title: 'Doctors by Specialization',
          isPie: true,
          data: doctorSpecializations
        }].map((chart, idx) => (
          <Grid item xs={12} md={6} key={idx}>
            <Box sx={{ width: "25.7vw", borderRadius: "5px" }}>
              <Card sx={{ p: 3, boxShadow: 4, height: '100%' }}>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  {chart.title}
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  {chart.isPie ? (
                    <PieChart>
                      <Pie
                        data={chart.data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        label
                      >
                        {chart.data.map((entry, index) => (
                          <Cell key={`cell-${idx}-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  ) : (
                    <LineChart data={chart.data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="Last" stroke={chart.color[0]} strokeWidth={2} />
                      <Line type="monotone" dataKey="Current" stroke={chart.color[1]} strokeWidth={2} />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminDashboard;

