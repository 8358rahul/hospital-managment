import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import { DataGrid,type GridColDef } from '@mui/x-data-grid'; 
import { selectAllAppointments } from '../../features/appointment/appointmentSlice';
import { useAppSelector } from '../../app/hooks';
 
const AdminAppointments = () => {
  const appointments = useAppSelector(selectAllAppointments);

  const columns: GridColDef[] = [
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'time', headerName: 'Time', width: 100 },
    { field: 'patientName', headerName: 'Patient', width: 200 },
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
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Appointments
        </Typography>
        
        <Card>
          <CardContent>
            <Box sx={{ height: 600, width: '100%' }}>
              <DataGrid
                rows={appointments}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                getRowId={(row) => row.id}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default AdminAppointments;