import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  Chip,
  Dialog,
  DialogContent,
  DialogActions,
  Container,
  IconButton
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import AddPatientForm from './AddPatientForm';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectAllPatients,
  fetchPatients,
  addNewPatient,
  deletePatientById,
} from '../../features/patient/patientSlice';
import { selectAppointmentsByPatient } from '../../features/appointment/appointmentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentToken } from '../../features/auth/authSlice';

const AdminPatients = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);

  const patients = useAppSelector(selectAllPatients);

  const [search, setSearch] = useState('');
  const [localPatients, setLocalPatients] = useState([]);

  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [selectedPatientStatus, setSelectedPatientStatus] = useState('');

  const [confirmDelete, setConfirmDelete] = useState({ open: false, patientId: null });

  const [addPatientOpen, setAddPatientOpen] = useState(false);

  // Fetch patients on mount
  useEffect(() => {
    dispatch(fetchPatients(token));
  }, [dispatch]);

  // Sync local copy
  useEffect(() => {
    setLocalPatients(patients);
  }, [patients]);

  const handleStatusToggle = (id) => {
    const patient = localPatients.find((p) => p.id === id);
    if (!patient) return;
    setSelectedPatientId(id);
    setSelectedPatientStatus(patient.status);
    setOpenStatusDialog(true);
  };

  const handleConfirmStatusChange = () => {
    setLocalPatients((prev) =>
      prev.map((p) =>
        p.id === selectedPatientId
          ? { ...p, status: selectedPatientStatus === 'Active' ? 'Inactive' : 'Active' }
          : p
      )
    );
    setOpenStatusDialog(false);
  };

  const handleCancelStatusChange = () => {
    setOpenStatusDialog(false);
    setSelectedPatientId(null);
    setSelectedPatientStatus('');
  };

  const handleSearchChange = (e) => setSearch(e.target.value);

  // const filteredPatients = localPatients.filter((p) =>
  //   p.name.toLowerCase().includes(search.toLowerCase())
  // );

  const handleAddPatient = async (newPatient) => {
    try {
      await dispatch(addNewPatient(newPatient)).unwrap();
      setAddPatientOpen(false);
      // fetchPatients will run automatically via useEffect update from store
    } catch (err) {
      console.error('Failed to add patient:', err);
    }
  };

  const handleDelete = (id) => {
    setConfirmDelete({ open: true, patientId: id });
  };

  const confirmDeletePatient = async () => {
    try {
      await dispatch(deletePatientById(confirmDelete.patientId)).unwrap();
      setConfirmDelete({ open: false, patientId: null });
    } catch (err) {
      console.error('Failed to delete patient:', err);
    }
  };

  const cancelDelete = () => setConfirmDelete({ open: false, patientId: null });

  const columns = [
    // ... (same as your version – name, email, age, gender, bloodType, phone, address)
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value === 'Active' ? 'Active' : 'Inactive'}
          size="small"
          onClick={() => handleStatusToggle(params.row.id)}
          sx={{
            backgroundColor: params.value === 'Active' ? '#c8e6c9' : '#f8d7da',
            color: params.value === 'Active' ? '#256029' : '#a94442',
            fontWeight: 600,
            px: 1.5,
            borderRadius: '6px',
            fontSize: '0.75rem',
            textTransform: 'capitalize',
            cursor: 'pointer',
          }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.5,
      minWidth: 110,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => {/* Optional: Add edit handling */}}>
            <EditIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      ),
      cellClassName: 'sticky-action-col',
    },
  ];

  return (
    <Container maxWidth="xl" disableGutters>
      <Box sx={{ px: { xs: 1, sm: 2, lg: 0 }, py: 4, width: '100%' }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Patients Management
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 2 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search by name"
            value={search}
            onChange={handleSearchChange}
            sx={{ width: { xs: '100%', sm: '300px' }, backgroundColor: '#fff' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" startIcon={<AddIcon />} sx={{ width: { xs: '100%', sm: 'auto' } }} onClick={() => setAddPatientOpen(true)}>
            Add Patient
          </Button>
        </Box>

        <Box sx={{ width: '100%', overflowX: 'auto', '& .MuiDataGrid-root': { backgroundColor: 'white' } }}>
          <DataGrid
            rows={patients}
            columns={columns}
            pageSizeOptions={[10]}
            getRowId={(row) => row.id}
            disableRowSelectionOnClick
            autoHeight
          />
        </Box>

        {/* Status Confirmation Dialog */}
        <Dialog open={openStatusDialog} onClose={handleCancelStatusChange}>
          <DialogContent>
            <Typography>
              Are you sure you want to mark this patient as{' '}
              <strong>{selectedPatientStatus === 'Active' ? 'Inactive' : 'Active'}</strong>?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelStatusChange} color="secondary">Cancel</Button>
            <Button onClick={handleConfirmStatusChange} variant="contained">Confirm</Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={confirmDelete.open} onClose={cancelDelete}>
          <DialogContent>
            <Typography>Are you sure you want to delete this patient?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelDelete}>No</Button>
            <Button onClick={confirmDeletePatient} color="error" variant="contained">Yes</Button>
          </DialogActions>
        </Dialog>

        {/* Add Patient Dialog */}
        <AddPatientForm open={addPatientOpen} onClose={() => setAddPatientOpen(false)} onSave={handleAddPatient} token={token}/>
      </Box>
    </Container>
  );
};

export default AdminPatients;
