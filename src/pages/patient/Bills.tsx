import { Box, Button, Card, CardContent, Typography } from '@mui/material';
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
    { field: 'date', headerName: 'Date', width: 120 },
    { 
      field: 'totalAmount', 
      headerName: 'Amount', 
      width: 300,
      valueFormatter: (params) => `$${params}`
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 300,
      renderCell: (params) => (
        <Typography 
          color={
            params.value === 'paid' ? 'success.main' : 
            params.value === 'pending' ? 'warning.main' : 
            'error.main'
          }
        >
          {params.value}
        </Typography>
      )
    },
    { field: 'paymentMethod', headerName: 'Payment Method', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
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
    <Box
      sx={{
        maxWidth: '100%', // Allow full width for larger screens
        margin: '0 auto', // Center the content
        padding: '16px', // Add padding for spacing
      }}
    >
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
    </Box>
  );
};

export default PatientBills;