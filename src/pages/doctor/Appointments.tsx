import { useState } from 'react'; 
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Container, 
  Chip, 
  Typography 
} from '@mui/material';
import { DataGrid,type GridColDef } from '@mui/x-data-grid'; 
import { mockAppointments } from '../../utils/mockData';
import { useAppSelector } from '../../app/hooks';

const DoctorAppointments = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [appointments, setAppointments] = useState(
    mockAppointments.filter(a => a.doctorId === user?.id)
  );

  const handleStatusChange = (id: string, status: string) => {
    setAppointments(appointments.map(appt => 
      appt.id === id ? { ...appt, status } : appt
    ));
  };

  const columns: GridColDef[] = [
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'time', headerName: 'Time', width: 100 },
    { field: 'patientName', headerName: 'Patient', width: 200 },
    { field: 'reason', headerName: 'Reason', width: 200 },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === 'Approved' ? 'success' : 
            params.value === 'Pending' ? 'warning' : 
            'error'
          }
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
                onClick={() => handleStatusChange(params.row.id, 'rejected')}
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
              onClick={() => handleStatusChange(params.row.id, 'completed')}
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

export default DoctorAppointments;