import React, { useState } from 'react';
import {
   Container,
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  Chip,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { mockDoctors } from '../../utils/mockData';
import DoctorForm from './DoctorForm';

const DoctorsManagement = () => {
  const [doctors, setDoctors] = useState(mockDoctors);
  const [openDialog, setOpenDialog] = useState(false);
    const [search, setSearch] = useState('');
    const [currentDoctor, setCurrentDoctor] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, doctorId: null });

  

  const handleAdd = () => {
    setCurrentDoctor({
      id: '',
      name: '',
      email: '',
      specialization: '',
      qualifications: '',
      experience: 0,
      consultationFee: 0,
    });
    setOpenDialog(true);
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

  const handleSave = (doctorData) => {
    if (doctorData.id) {
      setDoctors(doctors.map((doc) => (doc.id === doctorData.id ? doctorData : doc)));
    } else {
      const newDoctor = {
        ...doctorData,
        id: `d${doctors.length + 1}`,
        role: 'doctor',
      };
      setDoctors([...doctors, newDoctor]);
    }
    setOpenDialog(false);
  };

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
    { field: 'email', headerName: 'Email', flex: 1.5, minWidth: 150 },
    { field: 'specialization', headerName: 'Specialization', flex: 1, minWidth: 150 },
    { field: 'experience', headerName: 'Experience (years)', flex: 0.6, minWidth: 120 },
    { field: 'consultationFee', headerName: 'Fee', flex: 0.5, minWidth: 110 },
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
    },   {
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
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth="xl" disableGutters>
      <Box
        sx={{
          px: { xs: 1, sm: 2, lg: 0 },
          py: 4,
          width: '100%',
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{ textAlign: { xs: 'center', sm: 'left' } }}
        >
          Doctors Management
        </Typography>

        <Box  sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            mb: 2,
            flexWrap: 'wrap',
          }}>
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

          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}
           sx={{
              width: {
                xs: '100%', sm: 'auto',
                background: 'linear-gradient(90deg, #2196f3, #2196f3)',

              }
            }}
          >

            Add Doctor
          </Button>
        </Box>

        <Box sx={{
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
          }}>
          <DataGrid
            rows={doctors}
            columns={columns}
            pageSizeOptions={[10]}
            getRowId={(row) => row.id}
            autoHeight
            sx={{
              backgroundColor: '#fff',
              border: '1px solid #e0e0e0',
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #e0e0e0',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f5f5f5',
                borderBottom: '1px solid #e0e0e0',
              },
              '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
                borderRight: '1px solid #e0e0e0',
              },
              '& .MuiDataGrid-columnHeader:last-of-type, & .MuiDataGrid-cell:last-of-type': {
                borderRight: 'none',
              },
            }}
          />

        </Box>
      </Box>

      <DoctorForm
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        doctor={currentDoctor}
        onSave={handleSave}
      />
          <Dialog open={confirmDelete.open} onClose={cancelDelete}>
        <DialogContent>
          <Typography>Are you sure you want to delete this doctor?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteDoctor} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DoctorsManagement;
