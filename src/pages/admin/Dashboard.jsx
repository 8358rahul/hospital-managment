import React, { useEffect } from 'react';
import {
  Box,
  Card,
  Grid,
  Typography,
  Avatar,
  Container,
  useTheme,
  useMediaQuery
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
} from '../../features/adminDashboard/adminDasboardSlice';
import dashboardBg from '../../assets/dashboard.jpg';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentToken } from '../../features/auth/authSlice';

const DashboardCard = ({ title, count, icon, color }) => (

  <Card
    sx={{
      height: "100%",
      px: 3,
      py: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: 4,
      borderRadius: 3,
      textAlign: "center",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: 6,
      },
      // make the width responsive all screen sizes 
      width: "280px"

    }}
  >
    <Avatar sx={{ bgcolor: color, width: 60, height: 60, mb: 2 }}>
      {icon}
    </Avatar>
    <Typography variant="subtitle1" fontWeight="600" color="text.secondary">
      {title}
    </Typography>
    <Typography variant="h5" fontWeight="bold" mt={1}>
      {count}
    </Typography>
  </Card>
);

const COLORS = ['#ff9800', '#4caf50', '#1976d2', '#d32f2f', '#00acc1'];

const AdminDashboard = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
      color: ['#2e7d32', '#81c784'],
    },
    {
      title: 'Appointment Report',
      data: appointmentReport,
      color: ['#d32f2f', '#ef9a9a'],
    },
  ];

  return (
    <Box
      px={{ xs: 2, sm: 4 }}
      py={4}
      sx={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.92), rgba(255,255,255,0.9)), url(${dashboardBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        // minWidth:'100vw'
      }}
    >
      <Container maxWidth="lg">
        {/* Welcome Banner */}
        <Card
          sx={{
            mb: 6,
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            boxShadow: 4,
            background: 'linear-gradient(90deg, #1976d2, #00acc1)',
            color: '#fff',
            textAlign: 'center',
          }}
        >
          <Typography
            variant={isSmallScreen ? 'h5' : 'h4'}
            fontWeight="bold"
            gutterBottom
          >
            Welcome,
          </Typography>
          <Typography variant="subtitle1">
            Here's a quick overview of your hospital statistics
          </Typography>
        </Card>

        {/* Cards Section */}
        <Grid container spacing={4} justifyContent="center" mb={5} mt={2}>
          <Grid item>
            <DashboardCard title="Total Doctors" count={totalDoctors} icon={<LocalHospitalIcon fontSize="large" />} color="#1976d2" />
          </Grid>
          <Grid item>
            <DashboardCard title="Total Patients" count={totalPatients} icon={<PeopleIcon fontSize="large" />} color="#009688" />
          </Grid>
          <Grid item>
            <DashboardCard title="Total Appointments" count={totalAppointments} icon={<EventNoteIcon fontSize="large" />} color="#ed6c02" />
          </Grid>
          <Grid item>
            <DashboardCard title="Total Requests" count={totalRequests} icon={<HelpOutlineIcon fontSize="large" />} color="#d32f2f" />
          </Grid>
        </Grid>

        {/* Chart Section */}
        <Grid container spacing={4} mt={4} justifyContent={'center'}>
          {[...reports, {
            title: 'Doctors by Specialization',
            isPie: true,
            data: doctorSpecializations,
          }].map((chart, idx) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={idx}>
              <Box
                sx={{
                  width: "100%",
                  borderRadius: 2,
                }}
              >

                <Card sx={{
                  p: 2,
                  boxShadow: 3,
                  borderRadius: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}>
                  <Typography variant="h6" fontWeight="bold" mb={2}>
                    {chart.title}
                  </Typography>
                    <Box sx={{ width: "280px", height: { xs: 250, sm: 300, md: 280 } }}>
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
                  </Box>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
