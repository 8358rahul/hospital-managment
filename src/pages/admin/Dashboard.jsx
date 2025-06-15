import React from 'react';
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
import dashboardBg from '../../assets/dashboard.jpg';

const DashboardCard = ({ title, count, icon, color }) => (
  <Card
    sx={{
      width: '350px',        // Fixed width
      height: '150px',       // Increased height
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
  const totalDoctors = 12;
  const totalPatients = 58;
  const totalAppointments = 25;
  const totalRequests = 7;

  const reports = [
    {
      title: 'Financial Report',
      data: [
        { name: 'Week 1', Last: 2000, Current: 2500 },
        { name: 'Week 2', Last: 2300, Current: 2700 },
        { name: 'Week 3', Last: 2100, Current: 2600 },
        { name: 'Week 4', Last: 2400, Current: 3000 },
      ],
      color: ['#1976d2', '#64b5f6']
    },
    {
      title: 'Inventory Report',
      data: [
        { name: 'Week 1', Last: 120, Current: 130 },
        { name: 'Week 2', Last: 140, Current: 135 },
        { name: 'Week 3', Last: 150, Current: 145 },
        { name: 'Week 4', Last: 160, Current: 155 },
      ],
      color: ['#ed6c02', '#ffb74d']
    },
    {
      title: 'Patient Report',
      data: [
        { name: 'Week 1', Last: 20, Current: 25 },
        { name: 'Week 2', Last: 30, Current: 35 },
        { name: 'Week 3', Last: 40, Current: 50 },
        { name: 'Week 4', Last: 45, Current: 60 },
      ],
      color: ['#2e7d32', '#81c784']
    },
    {
      title: 'Appointment Report',
      data: [
        { name: 'Week 1', Last: 10, Current: 12 },
        { name: 'Week 2', Last: 15, Current: 18 },
        { name: 'Week 3', Last: 20, Current: 25 },
        { name: 'Week 4', Last: 22, Current: 30 },
      ],
      color: ['#d32f2f', '#ef9a9a']
    },
  ];

  const todayAppointments = [
    { name: 'Completed', value: 10 },
    { name: 'Pending', value: 8 },
  ];

  const doctorSpecializations = [
    { name: 'Cardiology', value: 4 },
    { name: 'Dermatology', value: 3 },
    { name: 'Orthopedic', value: 2 },
    { name: 'ENT', value: 3 },
  ];

  return (
    <Box px={{ xs: 2, sm: 4 }} py={4}  sx={{
        backgroundImage: `linear-gradient(rgba(224, 246, 246, 0.85), rgba(255,255,255,0.95)), url(${dashboardBg})`,
        backgroundSize: 'cover',
        borderRadius:'5px',
        backgroundPosition: 'center',
        minHeight: '100vh',
        px: { xs: 2, sm: 4 },
        py: 4,
      }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3} mb={5}>
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

      <Grid container spacing={3} justifyContent="">
        {[...reports, { title: 'Today’s Appointments Status', isPie: true, data: todayAppointments },
                      { title: 'Doctors by Specialization', isPie: true, data: doctorSpecializations }]
          .map((chart, idx) => (
            <Grid item xs={12} sm={6} md="auto" key={idx}>
              <Box sx={{ width: "475px", borderRadius:"5px"}}>
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
