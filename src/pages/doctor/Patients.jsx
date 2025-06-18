import {  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  Chip,
  Dialog,
  DialogContent,
  DialogActions,
  Container,
  IconButton} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import AddPatientForm from '../admin/AddPatientForm';
import EditIcon from '@mui/icons-material/Edit';

import { useAppSelector } from '../../app/hooks';
import { selectAppointmentsByDoctor } from '../../features/appointment/appointmentSlice';
import { fetchPatients, selectAllPatients } from '../../features/patient/patientSlice';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { selectCurrentToken } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const DoctorPatients = () => {
  const dispatch =useDispatch()
    const token = useSelector(selectCurrentToken);
 const patients = useAppSelector(selectAllPatients);
   const [search, setSearch] = useState('');
   const [localPatients, setLocalPatients] = useState(patients);
 
   const [openDialog, setOpenDialog] = useState(false);
   const [selectedPatientId, setSelectedPatientId] = useState(null);
   const [selectedPatientStatus, setSelectedPatientStatus] = useState('');
   const [confirmDelete, setConfirmDelete] = useState({ open: false, doctorId: null });

     // Fetch patients on mount
     useEffect(() => {
       dispatch(fetchPatients(token));
     }, [dispatch]);
 
   const handleStatusToggle = (id) => {
     const patient = localPatients.find((p) => p.id === id);
     if (!patient) return;
 
     setSelectedPatientId(id);
     setSelectedPatientStatus(patient.status);
     setOpenDialog(true);
   };
 
   const handleConfirmStatusChange = () => {
     const updated = localPatients.map((p) =>
       p.id === selectedPatientId
         ? {
           ...p,
           status: selectedPatientStatus === 'Active' ? 'Inactive' : 'Active',
         }
         : p
     );
     setLocalPatients(updated);
     setOpenDialog(false);
   };
 
   const handleCancelStatusChange = () => {
     setOpenDialog(false);
     setSelectedPatientId(null);
     setSelectedPatientStatus('');
   };
 
  //  const filteredPatients = localPatients.filter((p) =>
  //    p.name.toLowerCase().includes(search.toLowerCase())
  //  );
   const [addPatientOpen, setAddPatientOpen] = useState(false);
 
   const handleAddPatient = (newPatient) => {
     const newPatientWithId = { ...newPatient, id: Date.now(), status: 'Active' };
     setLocalPatients((prev) => [...prev, newPatientWithId]);
     setAddPatientOpen(false);
   };
     const handleEdit = (doctor) => {
     setCurrentDoctor(doctor);
     setOpenDialog(true);
   };
 
 
   const handleDelete = (id) => {
     setConfirmDelete({ open: true, doctorId: id });
   };
 
   const confirmDeleteDoctor = () => {
     setDoctors(doctors.filter((doctor) => doctor.id !== confirmDelete.doctorId));
     setConfirmDelete({ open: false, doctorId: null });
   };
 
   const cancelDelete = () => {
     setConfirmDelete({ open: false, doctorId: null });
   };
 
   const columns = [
     { field: 'fullname', headerName: 'Name', flex: 1, minWidth: 130 },
     { field: 'email', headerName: 'Email', flex: 1.5, minWidth: 160 },
     { field: 'age', headerName: 'Age', width: 90 },
     { field: 'gender', headerName: 'Gender', width: 120 },
     { field: 'bloodType', headerName: 'Blood Type', width: 120 },
     { field: 'phone', headerName: 'Phone', flex: 1, minWidth: 150 },
     { field: 'address', headerName: 'Address', flex: 2, minWidth: 220 },
    //  {
    //    field: 'status',
    //    headerName: 'Status',
    //    width: 130,
    //    renderCell: (params) => (
    //      <Chip
    //        label={params.value === 'Active' ? 'Active' : 'Inactive'}
    //        size="small"
    //        onClick={() => handleStatusToggle(params.row.id)}
    //        sx={{
    //          backgroundColor: params.value === 'Active' ? '#c8e6c9' : '#f8d7da',
    //          color: params.value === 'Active' ? '#256029' : '#a94442',
    //          fontWeight: 600,
    //          px: 1.5,
    //          borderRadius: '6px',
    //          fontSize: '0.75rem',
    //          textTransform: 'capitalize',
    //          cursor: 'pointer',
    //        }}
    //      />
    //    ),
    //  },
       {
       field: 'actions',
       headerName: 'Actions',
       flex: 0.5,
       minWidth: 110,
       sortable: false,
       renderCell: (params) => (
         <Box>
           <IconButton onClick={() => handleEdit(params.row)}>
             <EditIcon color="primary" />
           </IconButton>
           {/* <IconButton onClick={() => handleDelete(params.row.id)}>
             <DeleteIcon color="error" />
           </IconButton> */}
         </Box>
       ),
     },
   ];
 

  return (
    <Box
        sx={{
          width: '100%',
          px: { xs: 1, sm: 2, lg: 4 },
          py: 4,
          boxSizing: 'border-box',
          maxWidth: '100%'
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{ textAlign: { xs: 'center', sm: 'left' } }}
        >
          Patients Management
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
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              width: { xs: '100%', sm: '300px' },
              backgroundColor: '#fff',
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              width: {
                xs: '100%', sm: 'auto',
                background: 'linear-gradient(90deg, #2196f3, #2196f3)',

              }
            }}
            onClick={() => setAddPatientOpen(true)}
          >
            Add Patient
          </Button>
        </Box>

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
            rows={patients}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } },
            }}
            pageSizeOptions={[10]}
            getRowId={(row) => row.id}
            disableRowSelectionOnClick
            autoHeight
          />
        </Box>

        {/* Confirmation Dialog */}
        <Dialog open={openDialog} onClose={handleCancelStatusChange} fullWidth maxWidth="xs">
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
            <Button
              onClick={handleConfirmStatusChange}
              color="primary"
              variant="contained"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        <AddPatientForm
          open={addPatientOpen}
          onClose={() => setAddPatientOpen(false)}
          onSave={handleAddPatient}
        />
      </Box>
  );
};

export default DoctorPatients;