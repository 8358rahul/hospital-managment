import { Box, Card, CardContent, Container, Typography, Chip, Button } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid'; 
import { selectAllAppointments } from '../../features/appointment/appointmentSlice';
import { useAppSelector } from '../../app/hooks';

const AdminAppointments = () => {
  const appointments = useAppSelector(selectAllAppointments);

  const handleStatusChange = (id: string, newStatus: string) => {
    // Add logic to update the status of the appointment
    console.log(`Appointment ID: ${id}, New Status: ${newStatus}`);
  };

  const columns: GridColDef[] = [
    { field: 'date', headerName: 'Date', width: 200 },
    { field: 'time', headerName: 'Time', width: 180 },
    { field: 'patientName', headerName: 'Patient', width: 200 },
    { field: 'reason', headerName: 'Reason', width: 200 },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 200,
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
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      renderCell: (params) => (
        <Box>
          {params.row.status === 'Pending' && (
            <>
              <Button
                size="small"
                variant="contained"
                color="success"
                sx={{ mr: 1 }}
                onClick={() => handleStatusChange(params.row.id, 'Approved')}
              >
                Approve
              </Button>
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={() => handleStatusChange(params.row.id, 'Rejected')}
              >
                Reject
              </Button>
            </>
          )}
          {params.row.status === 'Approved' && (
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => handleStatusChange(params.row.id, 'Completed')}
            >
              Mark Completed
            </Button>
          )}
        </Box>
      ),
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