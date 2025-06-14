import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { People, MedicalServices, CalendarToday, Assignment } from '@mui/icons-material';
import { useAppSelector } from '../../app/hooks';
import { selectAllPatients } from '../../features/patient/patientSlice';
import { selectAllDoctors } from '../../features/doctor/doctorSlice';
import { selectAllAppointments } from '../../features/appointment/appointmentSlice';

const AdminDashboard = () => {
  const patients = useAppSelector(selectAllPatients);
  const doctors = useAppSelector(selectAllDoctors);
  const appointments = useAppSelector(selectAllAppointments);

  const stats = [
    { title: 'Total Patients', value: patients.length, icon: <People fontSize="large" /> },
    { title: 'Total Doctors', value: doctors.length, icon: <MedicalServices fontSize="large" /> },
    { title: 'Today Appointments', value: appointments.length, icon: <CalendarToday fontSize="large" /> },
    { title: 'Pending Requests', value: appointments.filter(a => a.status === 'pending').length, icon: <Assignment fontSize="large" /> },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
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

export default AdminDashboard;