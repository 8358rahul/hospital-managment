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
  Button,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAppointments,
  addNewAppointment,
  selectAllAppointments,
  selectAppointmentStatus,
} from '../../features/appointment/appointmentSlice';
import { selectCurrentToken } from '../../features/auth/authSlice';
import AddAppointmentForm from './AddAppointmentForm';

const AdminAppointments = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);
  const appointments = useSelector(selectAllAppointments);
 
  const status = useSelector(selectAppointmentStatus);

  const [search, setSearch] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [addPatientOpen, setAddPatientOpen] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(fetchAppointments(token));
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
              cursor: 'pointer',
            }}
            onClick={() => handleChipClick(params)}
          />
        );
      },
    },
   
  ];

  const filteredAppointments = appointments.filter((a) =>
    a.patientName?.toLowerCase().includes(search.toLowerCase()) ||
    a.doctorName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
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
        }}
      >
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: { xs: '100%', sm: '300px' }, backgroundColor: '#fff' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        {/* <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddPatientOpen(true)}>
          Add Appointment
        </Button> */}
      </Box>

      {status === 'loading' ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ width: '100%', overflowX: 'auto' }}>
          <DataGrid
            rows={filteredAppointments}
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

      <AddAppointmentForm
        open={addPatientOpen}
        onClose={() => setAddPatientOpen(false)}
        onSave={handleAddAppointment}
        token={token}
      />
    </Box>
  );
};

export default AdminAppointments;
