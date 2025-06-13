import { Box, Card, CardContent, Container, Typography, Chip } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useAppSelector } from '../../app/hooks';
import { selectAppointmentsByPatient } from '../../features/appointment/appointmentSlice';

const PatientAppointments = () => {
  const { user } = useAppSelector((state) => state.auth);
  const appointments = useAppSelector((state) => 
    selectAppointmentsByPatient(state, user?.id || '')
  );

  const columns: GridColDef[] = [
    { field: 'date', headerName: 'Date', width: 220 },
    { field: 'time', headerName: 'Time', width: 220 },
    { field: 'doctorName', headerName: 'Doctor', width: 220 },
    { field: 'reason', headerName: 'Reason', width: 200 },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 220,
      renderCell: (params) => (
        <Chip 
          label={params.value}
          sx={{
            backgroundColor: 
              params.value === 'Approved' ? 'success.main' : 
              params.value === 'Pending' ? 'warning.main' : 
              'error.main',
            color: 'white', // Text color
            borderRadius: '16px', // Rounded corners
            fontWeight: 'bold', // Bold text
            padding: '0 8px', // Padding inside the badge
          }}
        />
      )
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Appointments
        </Typography>
        
        <Card>
          <CardContent>
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={appointments}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                getRowId={(row) => row.id}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default PatientAppointments;