import {
  Box,
  Typography,
  Chip,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Pagination,
  Container,
  Button,
  CircularProgress, } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';

import { useAppSelector } from '../../app/hooks';
import { fetchAppointments, fetchPatientAppointments, selectAppointmentsByPatient, selectAppointmentStatus } from '../../features/appointment/appointmentSlice';
import { selectAllAppointments } from '../../features/appointment/appointmentSlice';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentToken } from '../../features/auth/authSlice';

const PatientAppointments = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);
  const appointments = useSelector(selectAllAppointments); 
  const status = useSelector(selectAppointmentStatus);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [search, setSearch] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [addPatientOpen, setAddPatientOpen] = useState(false);
useEffect(() => {
  if (token) {
    dispatch(fetchPatientAppointments({ token, "patient_id":5 }));
  }
}, [dispatch, token]);


  const handleChipClick = (params) => {
    setSelectedAppointment(params.row);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedAppointment(null);
  };

  const handleUpdateStatus = (newStatus) => {
    alert(`Updated status to ${newStatus} for appointment ID: ${selectedAppointment.id}`);
    handleClose();
    // Add real dispatch or API call here
  };

  const handleAddAppointment = async (newPatient) => {
    try {
      await dispatch(addNewAppointment(newPatient)).unwrap();
      setAddPatientOpen(false);
    } catch (err) {
      console.error('Failed to add appointment:', err);
    }
  };

  const columns = [
    { field: 'date', headerName: 'Date', width: 110 },
    { field: 'time', headerName: 'Time', width: 100 },
    { field: 'patientName', headerName: 'Patient', flex: 1, minWidth: 140 },
    { field: 'doctorName', headerName: 'Doctor', flex: 1, minWidth: 140 },
    {
      field: 'reason',
      headerName: 'Reason',
      flex: 1.2,
      minWidth: 140,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => {
        const status = params.value?.toLowerCase();
        const colorMap = {
          approved: ['#256029', '#c8e6c9'],
          pending: ['#856404', '#fff3cd'],
          rejected: ['#a94442', '#f8d7da'],
        };
        const [color, bg] = colorMap[status] || ['#000', '#e0e0e0'];
        return (
          <Chip
            label={status.charAt(0).toUpperCase() + status.slice(1)}
            size="small"
            sx={{
              backgroundColor: bg,
              color: color,
              fontWeight: 600,
              px: 1.5,
              borderRadius: '6px',
              fontSize: '0.75rem',
              // cursor: 'pointer',
            }}
          />
        );
      },
    },
   
  ];

 
 const allRows = useMemo(() => {
  if (!Array.isArray(appointments?.results)) return [];
  return appointments.results.map((item) => ({
    ...item,
    patientName: item?.patient?.first_name || 'N/A',
    doctorName: item?.doctor?.first_name || 'N/A',
  }));
}, [appointments]);

  const filteredRows = useMemo(() => {
    return allRows.filter((row) =>
      row.patientName?.toLowerCase().includes(search.toLowerCase()) ||
      row.doctorName?.toLowerCase().includes(search.toLowerCase())
    );
  }, [allRows, search]);

  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredRows.slice(start, end);
  }, [filteredRows, currentPage]);

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

 return (
    <Container maxWidth="xl" disableGutters>
      <Box sx={{ width: '100%', px: { xs: 1, sm: 2, lg: 4 }, py: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Appointment Management
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            mb: 2,
            flexWrap: 'wrap',
          }}
        >
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search by name"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            sx={{ width: { xs: '100%', sm: '300px' }, backgroundColor: '#fff' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {status === 'loading' ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
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
            }}}
            >
              <DataGrid
                rows={paginatedRows}
                columns={columns}
                getRowId={(row) => row.id}
                autoHeight
                disableRowSelectionOnClick
                hideFooter
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(e, value) => setCurrentPage(value)}
                color="primary"
              />
            </Box>
          </>
        )}

        {/* Status Dialog */}
        <Dialog open={openDialog} onClose={handleClose} maxWidth="xs" fullWidth>
          <DialogTitle>Status Options</DialogTitle>
          <DialogContent>
            <Typography variant="body2" gutterBottom>
              Appointment ID: {selectedAppointment?.id}
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              Current Status: {selectedAppointment?.status}
            </Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-between', p: 2 }}>
            {selectedAppointment?.status === 'Pending' && (
              <>
                <Button variant="contained" color="success" onClick={() => handleUpdateStatus('Approved')}>
                  Approve
                </Button>
                <Button variant="outlined" color="error" onClick={() => handleUpdateStatus('Rejected')}>
                  Reject
                </Button>
              </>
            )}
            {selectedAppointment?.status === 'Approved' && (
              <Button variant="outlined" color="error" onClick={() => handleUpdateStatus('Rejected')}>
                Mark as Rejected
              </Button>
            )}
            {selectedAppointment?.status === 'Rejected' && (
              <Button variant="contained" color="success" onClick={() => handleUpdateStatus('Approved')}>
                Re-Approve
              </Button>
            )}
          </DialogActions>
        </Dialog>

       
      </Box>
    </Container>
  );
};

export default PatientAppointments;
