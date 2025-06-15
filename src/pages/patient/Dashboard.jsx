import React from 'react';
import {
  Box,
  Card,
  Grid,
  Typography,
  Avatar,
  Container,
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EventNoteIcon from '@mui/icons-material/EventNote';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import dashboardBg from '../../assets/dashboard.jpg';

const DashboardCard = ({ title, count, icon, color }) => (
  <Card
    sx={{
      height: '180px',
      width: '365px',
      boxShadow: 6,
      borderRadius: 3,
      px: 3,
      py: 4,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'scale(1.02)',
      },
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

const PatientDashboard = () => {
  const totalDoctors = 12;
  const totalAppointments = 25;
  const totalRequests = 7;
  const bloodGroup = 'O+';
  const heartBeats = 72;
  const weight = '65 kg';
  const userName = 'John Doe'; // 👈 Replace with dynamic user data

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(224, 246, 246, 0.85), rgba(255,255,255,0.95)), url(${dashboardBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        py: { xs: 4, sm: 6 },
      }}
    >
      <Container maxWidth="lg">
        {/* Welcome Card */}
        <Card
          sx={{
            mb: 5,
            p: { xs: 3, sm: 4 },
            boxShadow: 3,
            borderRadius: 3,
            textAlign: 'center',
            background: 'linear-gradient(90deg, #549ee9, #00acc1)',
            color: '#fff',
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            Welcome, {userName}
          </Typography>
          <Typography variant="subtitle1" mt={1}>
            Here's a quick overview of your hospital statistics
          </Typography>
        </Card>

        {/* Dashboard Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <DashboardCard
              title="Available Doctors"
              count={totalDoctors}
              icon={<LocalHospitalIcon />}
              color="#1976d2"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DashboardCard
              title="Total Appointments"
              count={totalAppointments}
              icon={<EventNoteIcon />}
              color="#ed6c02"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DashboardCard
              title="Total Requests"
              count={totalRequests}
              icon={<HelpOutlineIcon />}
              color="#d32f2f"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DashboardCard
              title="Blood Group"
              count={bloodGroup}
              icon={<BloodtypeIcon />}
              color="#9c27b0"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DashboardCard
              title="Heart Beats"
              count={heartBeats}
              icon={<FavoriteIcon />}
              color="#e91e63"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DashboardCard
              title="Weight"
              count={weight}
              icon={<MonitorWeightIcon />}
              color="#009688"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PatientDashboard;
