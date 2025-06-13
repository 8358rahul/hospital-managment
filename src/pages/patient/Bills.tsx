import { Box, Button, Card, CardContent, Container, Typography, Chip } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useAppSelector } from '../../app/hooks';
import { selectBillsByPatient } from '../../features/billing/billingSlice'; 
import { Link } from 'react-router-dom';
import type { RootState } from '../../app/store';

const PatientBills = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const bills = useAppSelector((state: RootState) => 
    selectBillsByPatient(state, user?.id || '')
  );

  const columns: GridColDef[] = [
    { field: 'date', headerName: 'Date', width: 220 },
    { 
      field: 'totalAmount', 
      headerName: 'Amount', 
      width: 250,
      valueFormatter: (params) => `$${params}`
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 200,
      renderCell: (params) => (
        <Chip 
          label={params.value}
          sx={{
            backgroundColor: 
              params.value === 'Paid' ? 'success.main' : 
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
    { field: 'paymentMethod', headerName: 'Payment Method', width: 220 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Button
          component={Link}
          to={`/patient/bills/${params.row.id}`}
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
          My Bills
        </Typography>
        
        <Card>
          <CardContent>
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={bills}
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

export default PatientBills;