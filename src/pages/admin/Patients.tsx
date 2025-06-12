import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material';
import { DataGrid,type GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add'; 
import { useAppSelector } from '../../app/hooks';
import { selectAllPatients } from '../../features/patient/patientSlice';

const AdminPatients = () => {
  const patients = useAppSelector(selectAllPatients);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'age', headerName: 'Age', width: 100 },
    { field: 'gender', headerName: 'Gender', width: 120 },
    { field: 'bloodType', headerName: 'Blood Type', width: 120 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'address', headerName: 'Address', width: 200 },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Patients Management
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button variant="contained" startIcon={<AddIcon />}>
            Add Patient
          </Button>
        </Box>

        <Card>
          <CardContent>
            <Box sx={{ height: 600, width: '100%' }}>
              <DataGrid
                rows={patients}
                columns={columns}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10, page: 0 } }
                }}
                pageSizeOptions={[10]}
                getRowId={(row) => row.id}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default AdminPatients;