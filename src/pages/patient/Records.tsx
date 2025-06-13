import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useAppSelector } from '../../app/hooks';
import { selectAllMedicalRecords } from '../../features/record/recordSlice'; 
import type { RootState } from '../../app/store';

const PatientRecords = () => {
  const { user } = useAppSelector((state: RootState) => state.auth); 
  const records = useAppSelector(selectAllMedicalRecords)?.records?.filter(
    (record) => record.patientId === user?.id 
  ) || []; // Ensure records is always an array
 
  
  const columns: GridColDef[] = [
    { field: 'date', headerName: 'Date', width: 250 },
    { field: 'doctorName', headerName: 'Doctor', width: 250 },
    { field: 'diagnosis', headerName: 'Diagnosis', width: 250 },
    { field: 'prescription', headerName: 'Prescription', width: 250 },
  ];
 
 

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Medical Records
        </Typography>
        
        {records.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No medical records found.
          </Typography>
        ) : (
          <Card>
            <CardContent>
              <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={records}
                  columns={columns}
                  initialState={{
                    pagination: { paginationModel: { pageSize: 5 } }
                  }}
                  pageSizeOptions={[5]}
                  getRowId={(row) => row.id}
                />
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
};

export default PatientRecords;