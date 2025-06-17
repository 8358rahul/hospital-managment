import React from 'react';
import {
  Box,
  Card,
  Grid,
  Typography,
  Avatar,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EventNoteIcon from '@mui/icons-material/EventNote';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import dashboardBg from '../../assets/dashboard.jpg';

const DashboardCard = ({ title, count, icon, color }) => {
  return (
    <Card
      sx={{
        height: '100%',
        px: 3,
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 4,
        borderRadius: 3,
        textAlign: 'center',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
        width: '250px',
      }}
    >
      <Avatar sx={{ bgcolor: color, width: 70, height: 70, mb: 2 }}>
        {icon}
      </Avatar>
      <Typography variant="subtitle1" fontWeight="600" color="text.secondary">
        {title}
      </Typography>
      <Typography
        variant="h5"
        fontWeight="bold"
        mt={1}
        sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
      >
        {count}
      </Typography>
    </Card>
  );
};

const PatientDashboard = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const totalDoctors = 12;
  const totalAppointments = 25;
  const totalRequests = 7;
  const bloodGroup = 'O+';
  const heartBeats = 72;
  const weight = '65 kg';
  const userName = 'John Doe'; // Replace with dynamic user data

  const dashboardItems = [
    {
      title: 'Available Doctors',
      count: totalDoctors,
      icon: <LocalHospitalIcon fontSize="large" />,
      color: '#1976d2',
    },
    {
      title: 'Total Appointments',
      count: totalAppointments,
      icon: <EventNoteIcon fontSize="large" />,
      color: '#ed6c02',
    },
    {
      title: 'Total Requests',
      count: totalRequests,
      icon: <HelpOutlineIcon fontSize="large" />,
      color: '#d32f2f',
    },
    {
      title: 'Blood Group',
      count: bloodGroup,
      icon: <BloodtypeIcon fontSize="large" />,
      color: '#9c27b0',
    },
    {
      title: 'Heart Beats',
      count: heartBeats,
      icon: <FavoriteIcon fontSize="large" />,
      color: '#e91e63',
    },
    {
      title: 'Weight',
      count: weight,
      icon: <MonitorWeightIcon fontSize="large" />,
      color: '#009688',
    },
  ];

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.92), rgba(255,255,255,0.9)), url(${dashboardBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        py: { xs: 4, sm: 6 },
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
            Welcome, {userName}
          </Typography>
          <Typography variant="subtitle1">
            Here's a quick overview of your hospital statistics
          </Typography>
        </Card>

        {/* Dashboard Grid */}
        <Grid container spacing={6} justifyContent={'center'}>
          {dashboardItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} >
              <DashboardCard {...item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default PatientDashboard;
