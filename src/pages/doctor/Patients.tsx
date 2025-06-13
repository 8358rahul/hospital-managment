import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useAppSelector } from '../../app/hooks';
import { selectAppointmentsByDoctor } from '../../features/appointment/appointmentSlice';
import { selectAllPatients } from '../../features/patient/patientSlice';
import { Link } from 'react-router-dom';

const DoctorPatients = () => {
  const { user } = useAppSelector((state) => state.auth);
  const appointments = useAppSelector((state) => 
    selectAppointmentsByDoctor(state, user?.id || '')
  );
  const allPatients = useAppSelector(selectAllPatients);
  
  // Get unique patients who have appointments with this doctor
  const patientIds = [...new Set(appointments.map(a => a.patientId))];
  const patients = allPatients.filter(p => patientIds.includes(p.id));

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'age', headerName: 'Age', width: 100 },
    { field: 'gender', headerName: 'Gender', width: 120 },
    { field: 'bloodType', headerName: 'Blood Type', width: 120 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params) => (
      <Button
        component={Link}
        to={`/doctor/patients/${params.row.id}`}
        variant="outlined"
        size="small"
      >
        View Details
      </Button>
    ),
  },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Patients
        </Typography>
        
        <Card>
          <CardContent>
            <Box sx={{ height: 600, width: '100%' }}>
              <DataGrid
                rows={patients}
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

export default DoctorPatients;