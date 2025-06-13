import { useEffect } from 'react'; 
import { Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { mockAppointments, mockMedicalRecords } from '../../utils/mockData';
import { useAppSelector } from '../../app/hooks';

const PatientDashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  const appointments = mockAppointments.filter(a => a.patientId === user?.id);
  const records = mockMedicalRecords.filter(r => r.patientId === user?.id);

  const appointmentColumns: GridColDef[] = [
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'time', headerName: 'Time', width: 100 },
    { field: 'doctorName', headerName: 'Doctor', width: 200 },
    { field: 'reason', headerName: 'Reason', width: 200 },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 120,
      renderCell: (params) => (
        <Typography 
          color={
            params.value === 'approved' ? 'success.main' : 
            params.value === 'pending' ? 'warning.main' : 
            'error.main'
          }
        >
          {params.value}
        </Typography>
      )
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Patient Dashboard
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
        Welcome back, {user?.name}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Appointments
              </Typography>
              <Typography variant="h4" component="div">
                {appointments.filter(a => a.status === 'approved').length}
              </Typography>
              <Button
                component={Link}
                to="/patient/appointments"
                startIcon={<CalendarTodayIcon />}
                sx={{ mt: 2 }}
              >
                View Appointments
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Medical Records
              </Typography>
              <Typography variant="h4" component="div">
                {records.length}
              </Typography>
              <Button
                component={Link}
                to="/patient/records"
                startIcon={<MedicalServicesIcon />}
                sx={{ mt: 2 }}
              >
                View Records
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Available Doctors
              </Typography>
              <Typography variant="h4" component="div">
                12
              </Typography>
              <Button
                component={Link}
                to="/patient/doctors"
                startIcon={<PeopleIcon />}
                sx={{ mt: 2 }}
              >
                Find Doctors
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Recent Appointments
        </Typography>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={appointments}
            columns={appointmentColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row.id}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default PatientDashboard;