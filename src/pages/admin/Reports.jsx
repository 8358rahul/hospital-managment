import { Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';  
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectAllReports } from '../../features/report/reportSlice';

const AdminReports = () => {
  const reports = useAppSelector(selectAllReports);

  const columns = [
    { field: 'title', headerName: 'Report', width: 300 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'period', headerName: 'Period', width: 150 },
    { field: 'generatedDate', headerName: 'Generated Date', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          component={Link}
          to={`/admin/reports/${params.row.id}`}
          variant="outlined"
          size="small"
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Reports
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            variant="contained"
            component={Link}
            to="/admin/reports/generate"
          >
            Generate New Report
          </Button>
        </Box>

        <Card>
          <CardContent>
            <Box sx={{ height: 600, width: '100%' }}>
              <DataGrid
                rows={reports}
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

export default AdminReports;