import { useState } from 'react';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Container, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  Grid, 
  IconButton, 
  TextField, 
  Typography 
} from '@mui/material';
import { DataGrid,type GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'; 
import { mockDoctors } from '../../utils/mockData';

const DoctorsManagement = () => {
  const [doctors, setDoctors] = useState(mockDoctors);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState<any>(null);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'specialization', headerName: 'Specialization', width: 180 },
    { field: 'experience', headerName: 'Experience (years)', width: 150 },
    { field: 'consultationFee', headerName: 'Fee', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
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

  const handleEdit = (doctor: any) => {
    setCurrentDoctor(doctor);
    setOpenDialog(true);
  };

  const handleDelete = (id: string) => {
    setDoctors(doctors.filter(doctor => doctor.id !== id));
  };

  const handleSave = () => {
    if (currentDoctor.id) {
      // Update existing doctor
      setDoctors(doctors.map(doctor => 
        doctor.id === currentDoctor.id ? currentDoctor : doctor
      ));
    } else {
      // Add new doctor
      const newDoctor = {
        ...currentDoctor,
        id: `d${doctors.length + 1}`,
        role: 'doctor',
      };
      setDoctors([...doctors, newDoctor]);
    }
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Doctors Management
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
          >
            Add Doctor
          </Button>
        </Box>

        <Card>
          <CardContent>
            <Box sx={{ height: 600, width: '100%' }}>
              <DataGrid
                rows={doctors}
                columns={columns}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10 } }
                }}
                pageSizeOptions={[10]}
                getRowId={(row) => row.id}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {currentDoctor?.id ? 'Edit Doctor' : 'Add New Doctor'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={currentDoctor?.name || ''}
                onChange={(e) => setCurrentDoctor({...currentDoctor, name: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={currentDoctor?.email || ''}
                onChange={(e) => setCurrentDoctor({...currentDoctor, email: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Specialization"
                value={currentDoctor?.specialization || ''}
                onChange={(e) => setCurrentDoctor({...currentDoctor, specialization: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Qualifications"
                value={currentDoctor?.qualifications || ''}
                onChange={(e) => setCurrentDoctor({...currentDoctor, qualifications: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Experience (years)"
                type="number"
                value={currentDoctor?.experience || 0}
                onChange={(e) => setCurrentDoctor({...currentDoctor, experience: parseInt(e.target.value)})}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Consultation Fee"
                type="number"
                value={currentDoctor?.consultationFee || 0}
                onChange={(e) => setCurrentDoctor({...currentDoctor, consultationFee: parseInt(e.target.value)})}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DoctorsManagement;