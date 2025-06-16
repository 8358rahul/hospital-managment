import { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Divider,
  Paper,
  Grid,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useAppSelector } from '../../app/hooks';
import { selectBillsByPatient } from '../../features/billing/billingSlice';

const dummyReports = [
  {
    id: 'r1',
    date: '2024-06-01',
    doctor: 'Dr. Smith',
    disease: 'Hypertension',
    report: 'Blood pressure was found elevated. Recommended lifestyle changes and medication.',
  },
  {
    id: 'r2',
    date: '2024-06-10',
    doctor: 'Dr. Johnson',
    disease: 'Diabetes',
    report: 'Fasting glucose levels were high. Prescribed Metformin and advised diet control.',
  },
];

const PatientBills = () => {
  const { user } = useAppSelector((state) => state.auth);
  const bills = useAppSelector((state) => selectBillsByPatient(state, user?.id || ''));
  const [selectedBill, setSelectedBill] = useState(null);
  const [open, setOpen] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleViewDetails = (bill) => {
    setSelectedBill(bill);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBill(null);
  };

  const handleDownload = () => {
    window.print();
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setOpenReport(true);
  };

  const handleCloseReport = () => {
    setOpenReport(false);
    setSelectedReport(null);
  };

  const columns = [
    { field: 'date', headerName: 'Date', width: 220 },
    {
      field: 'totalAmount',
      headerName: 'Amount',
      width: 250,
      valueFormatter: (params) => `$${params}`,
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
              params.value === 'Paid'
                ? 'success.main'
                : params.value === 'Pending'
                ? 'warning.main'
                : 'error.main',
            color: 'white',
            borderRadius: '16px',
            fontWeight: 'bold',
            padding: '0 8px',
          }}
        />
      ),
    },
    { field: 'paymentMethod', headerName: 'Payment Method', width: 220 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 220,
      renderCell: (params) => (
        <Box> 
          <Button
            variant="outlined"
            size="small"
            sx={{ ml: 1 }}
            onClick={() => handleViewReport(dummyReports[0])} // just for demo
          >
            View Report
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Bills
      </Typography>

      <Box
        sx={{
          width: '100%',
          overflowX: 'auto',
          '& .MuiDataGrid-root': {
            backgroundColor: 'white',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#ffffff',
            fontWeight: 'bold',
            fontSize: '16px',
            borderBottom: '1px solid #e0e0e0',
          },
          '& .MuiDataGrid-columnHeader': {
            borderRight: '1px solid #e0e0e0',
          },
          '& .MuiDataGrid-cell': {
            fontSize: '14px',
            borderRight: '1px solid #e0e0e0',
          },
          '& .MuiDataGrid-row': {
            borderBottom: '1px solid #f0f0f0',
          },
        }}
      >
        <DataGrid
          rows={bills}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
          pageSizeOptions={[10]}
          getRowId={(row) => row.id}
          autoHeight
          disableRowSelectionOnClick
        />
      </Box>

      {/* Bill Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>Hospital Bill</DialogTitle>
        <DialogContent>
          {selectedBill && (
            <Paper sx={{ p: 3, border: '1px solid #ccc' }}>
              <Box sx={{ mb: 2, textAlign: 'center' }}>
                <Typography variant="h6">Sunrise Medical Center</Typography>
                <Typography variant="body2">123 Health Lane, Wellness City</Typography>
                <Typography variant="body2">Phone: (123) 456-7890</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box>
                <Typography variant="body1"><strong>Patient Name:</strong> {user?.name}</Typography>
                <Typography variant="body1"><strong>Age:</strong> {user?.age || 'N/A'}</Typography>
                <Typography variant="body1"><strong>Blood Group:</strong> {user?.bloodGroup || 'N/A'}</Typography>
                <Typography variant="body1"><strong>Bill Date:</strong> {selectedBill.date}</Typography>
                <Typography variant="body1"><strong>Bill ID:</strong> #{selectedBill.id}</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box>
                <Typography variant="body1"><strong>Service Description:</strong></Typography>
                <Typography variant="body2" sx={{ ml: 2 }}>{selectedBill.description || 'General Consultation'}</Typography>

                <Typography variant="body1" sx={{ mt: 2 }}><strong>Payment Method:</strong> {selectedBill.paymentMethod}</Typography>
                <Typography variant="body1"><strong>Status:</strong> {selectedBill.status}</Typography>
                <Typography variant="body1" sx={{ mt: 1 }}><strong>Total Amount:</strong> ${selectedBill.totalAmount}</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" sx={{ textAlign: 'center', color: 'gray' }}>
                This is a computer-generated bill and does not require a signature.
              </Typography>
            </Paper>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', px: 3 }}>
          <Button onClick={handleClose}>Close</Button>
          <Button variant="contained" color="primary" onClick={handleDownload}>
            Download Bill
          </Button>
        </DialogActions>
      </Dialog>

      {/* Report Dialog */}
      <Dialog open={openReport} onClose={handleCloseReport} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>Medical Report</DialogTitle>
        <DialogContent>
          {selectedReport && (
            <Paper sx={{ p: 3, border: '1px solid #ccc' }}>
              <Box>
                <Typography variant="body1"><strong>Date:</strong> {selectedReport.date}</Typography>
                <Typography variant="body1"><strong>Doctor:</strong> {selectedReport.doctor}</Typography>
                <Typography variant="body1"><strong>Disease:</strong> {selectedReport.disease}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                <strong>Report:</strong>
              </Typography>
              <Typography variant="body2" sx={{ ml: 2 }}>{selectedReport.report}</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" sx={{ textAlign: 'center', color: 'gray' }}>
                This is a computer-generated report and does not require a signature.
              </Typography>
            </Paper>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', px: 3 }}>
          <Button onClick={handleCloseReport}>Close</Button>
          <Button variant="contained" color="primary" onClick={handleDownload}>
            Download Report
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PatientBills;