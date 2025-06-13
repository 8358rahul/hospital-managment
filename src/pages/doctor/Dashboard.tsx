import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { CalendarToday, People, CheckCircle, Pending } from '@mui/icons-material';
import { useAppSelector } from '../../app/hooks';
import { selectAppointmentsByDoctor } from '../../features/appointment/appointmentSlice';

const DoctorDashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  const appointments = useAppSelector((state) => 
    selectAppointmentsByDoctor(state, user?.id || '')
  );

  const stats = [
    { title: 'Total Appointments', value: appointments.length, icon: <CalendarToday fontSize="large" /> },
    { title: 'Approved', value: appointments.filter(a => a.status === 'Approved').length, icon: <CheckCircle fontSize="large" /> },
    { title: 'Pending', value: appointments.filter(a => a.status === 'Pending').length, icon: <Pending fontSize="large" /> },
    { title: 'Patients', value: new Set(appointments.map(a => a.patientId)).size, icon: <People fontSize="large" /> },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Doctor Dashboard
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
        Welcome, Dr. {user?.name}
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between">
                  <div>
                    <Typography color="textSecondary" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="h5">{stat.value}</Typography>
                  </div>
                  <Box color="primary.main">
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DoctorDashboard;