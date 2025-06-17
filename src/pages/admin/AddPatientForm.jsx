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
import { useDispatch } from 'react-redux';
import { addNewPatient } from '../../features/patient/patientSlice';
import { toast } from 'react-toastify';

const initialFormState = {
  fullname: '',
  email: '',
  password: '',
  birth_date: '',
  phone: '',
  blood_type: '',
  gender: '',
  address: '',
  role: 'patient'
};

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const genders = ['Male', 'Female', 'Other'];

const AddPatientForm = ({ open, onClose, token }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullname.trim()) newErrors.fullname = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    if (!formData.birth_date) newErrors.birth_date = 'Birth date is required';
    return newErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await dispatch(
        addNewPatient({
          newPatient: { ...formData },
          token
        })
      ).unwrap();
      toast.success("Patient Added Successfully");
      setFormData(initialFormState);
      setErrors({});
      onClose();
    } catch (error) {
      console.error('Failed to add patient:', error);
    }
  };

  const requiredLabel = (label) => (
    <span>
      {label} <span style={{ color: 'red' }}>*</span>
    </span>
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Patient</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label={requiredLabel("Name")}
            name="fullname"
            fullWidth
            value={formData.fullname}
            onChange={handleChange}
            error={!!errors.fullname}
            helperText={errors.fullname}
          />
          <TextField
            label={requiredLabel("Email")}
            name="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label={requiredLabel("Password")}
            name="password"
            type="password"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            label={requiredLabel("Birth Date")}
            name="birth_date"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={formData.birth_date}
            onChange={handleChange}
            error={!!errors.birth_date}
            helperText={errors.birth_date}
          />
          <TextField
            label="Phone Number"
            name="phone"
            fullWidth
            value={formData.phone}
            onChange={handleChange}
          />
          <TextField
            label="Blood Group"
            name="blood_type"
            select
            fullWidth
            value={formData.blood_type}
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
