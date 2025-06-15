import React, { useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';

const initialFormState = {
  name: '',
  email: '',
  age: '',
  phone: '',
  bloodType: '',
  gender: '',
  address: '',
};

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const genders = ['Male', 'Female', 'Other'];

const AddPatientForm = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    setFormData(initialFormState); // Reset form after save
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Patient</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Name" name="name" fullWidth value={formData.name} onChange={handleChange} />
          <TextField label="Email" name="email" fullWidth value={formData.email} onChange={handleChange} />
          <TextField label="Age" name="age" fullWidth value={formData.age} onChange={handleChange} />
          <TextField label="Phone Number" name="phone" fullWidth value={formData.phone} onChange={handleChange} />
          <TextField
            label="Blood Group"
            name="bloodType"
            select
            fullWidth
            value={formData.bloodType}
            onChange={handleChange}
          >
            {bloodGroups.map((group) => (
              <MenuItem key={group} value={group}>
                {group}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Gender"
            name="gender"
            select
            fullWidth
            value={formData.gender}
            onChange={handleChange}
          >
            {genders.map((gender) => (
              <MenuItem key={gender} value={gender}>
                {gender}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Address"
            name="address"
            multiline
            rows={3}
            fullWidth
            value={formData.address}
            onChange={handleChange}
          />
        </Box>
      </DialogContent>
     <DialogActions sx={{ px: 3, pb: 2 }}>
  <Button
    onClick={onClose}
    variant="contained"
    sx={{
      backgroundColor: '#e0e0e0',
      color: '#333',
      borderRadius: '6px',
      textTransform: 'none',
      '&:hover': {
        backgroundColor: '#d5d5d5',
      },
    }}
  >
    Cancel
  </Button>
  <Button
    onClick={handleSubmit}
    variant="contained"
    color="primary"
    sx={{
      borderRadius: '6px',
      textTransform: 'none',
    }}
  >
    Save
  </Button>
</DialogActions>

    </Dialog>
  );
};

export default AddPatientForm;
