import React, { useState, useEffect, useMemo } from 'react';
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
  IconButton,
  Pagination,
  Skeleton,
  Stack
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from "@mui/icons-material/Refresh";

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
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../features/auth/authSlice';

const AdminPatients = () => {
  const dispatch = useAppDispatch();
  const token = useSelector(selectCurrentToken);
  const patients = useAppSelector(selectAllPatients);
  const status = useAppSelector(selectAllPatients);

  const [search, setSearch] = useState('');
  const [localPatients, setLocalPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
const [editPatient, setEditPatient] = useState(null);

  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [selectedPatientStatus, setSelectedPatientStatus] = useState('');

  const [confirmDelete, setConfirmDelete] = useState({ open: false, patientId: null });
  const [addPatientOpen, setAddPatientOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPatients(token));
  }, [dispatch, token]);

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

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset page on search
  };

  const handleAddPatient = async (newPatient) => {
    try {
      await dispatch(addNewPatient(newPatient)).unwrap();
      setAddPatientOpen(false);
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

  const filtered = useMemo(() => {
    return localPatients.filter((p) =>
      p.fullname?.toLowerCase().includes(search.toLowerCase())
    );
  }, [localPatients, search]);

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = useMemo(
    () =>
      filtered.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      ),
    [filtered, currentPage, rowsPerPage]
  );

  const columns = [
    { field: 'fullname', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'birth_date', headerName: 'Birth Date', flex: 0.5 },
    { field: 'gender', headerName: 'Gender', flex: 0.5 },
    { field: 'blood_type', headerName: 'Blood Group', flex: 0.5 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },

    // {
    //   field: 'status',
    //   headerName: 'Status',
    //   width: 130,
    //   renderCell: (params) => (
    //     <Chip
    //       label={params.value === 'Active' ? 'Active' : 'Inactive'}
    //       size="small"
    //       onClick={() => handleStatusToggle(params.row.id)}
    //       sx={{
    //         backgroundColor: params.value === 'Active' ? '#c8e6c9' : '#f8d7da',
    //         color: params.value === 'Active' ? '#256029' : '#a94442',
    //         fontWeight: 600,
    //         px: 1.5,
    //         borderRadius: '6px',
    //         fontSize: '0.75rem',
    //         cursor: 'pointer',
    //       }}
    //     />
    //   ),
    // },
    // {
    //   field: 'actions',
    //   headerName: 'Actions',
    //   flex: 0.5,
    //   sortable: false,
    //   renderCell: (params) => (
    //     <Box>
    //       {/* <IconButton onClick={() => {}}>
    //         <EditIcon color="primary" />
    //       </IconButton> */}
    //       {/* <IconButton onClick={() => handleDelete(params.row.id)}>
    //         <DeleteIcon color="error" />
    //       </IconButton> */}
    //     </Box>
    //   ),
    // },
  ];

  const handleRefresh = () => {};
  return (
    <Container maxWidth="xl" disableGutters>
      <Box sx={{ px: { xs: 1, sm: 2 }, py: 4, width: '100%' }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Patients Management
        </Typography>

        <Stack
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
          <Stack
          direction="row"
          spacing={2}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            fullWidth={true}
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
              },
            }}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
                background: "linear-gradient(90deg, #2196f3, #2196f3)",
              },
            }}
            onClick={() => setAddPatientOpen(true)}
          >
            Add Patient
          </Button>
        </Stack>
        </Stack>

        <Box
          sx={{
            width: '100%',
            overflowX: 'auto',
            '& .MuiDataGrid-root': { backgroundColor: 'white' },
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

          {status === "loading" ? (
          <Box>
            {[...Array(10)].map((_, i) => (
              <Skeleton
                key={i}
                height={50}
                sx={{ mb: 1 }}
                variant="rectangular"
              />
            ))}
          </Box>
        ) : (
          <DataGrid
            rows={paginated}
            columns={columns}
            getRowId={(row) => row.id}
            autoHeight
            disableRowSelectionOnClick
            hideFooter
          />
            )}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, value) => setCurrentPage(value)}
            color="primary"
          />
        </Box>

        {/* Status Dialog */}
        <Dialog open={openStatusDialog} onClose={handleCancelStatusChange}>
          <DialogContent>
            <Typography>
              Are you sure you want to mark this patient as{' '}
              <strong>
                {selectedPatientStatus === 'Active' ? 'Inactive' : 'Active'}
              </strong>
              ?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelStatusChange} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleConfirmStatusChange} variant="contained">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog open={confirmDelete.open} onClose={cancelDelete}>
          <DialogContent>
            <Typography>Are you sure you want to delete this patient?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelDelete}>No</Button>
            <Button
              onClick={confirmDeletePatient}
              color="error"
              variant="contained"
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Patient Form */}
        <AddPatientForm
          open={addPatientOpen}
          onClose={() => setAddPatientOpen(false)}
          onSave={handleAddPatient}
          token={token}
        />
      </Box>
    </Container>
  );
};

export default AdminPatients;
