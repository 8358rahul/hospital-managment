import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Box,
  Autocomplete,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addNewAppointment, fetchAppointments } from '../../features/appointment/appointmentSlice';

// Dummy doctor data
const doctorList = [
  { id: 1, name: 'Dr. A. Kumar' },
  { id: 2, name: 'Dr. B. Shah' },
  { id: 3, name: 'Dr. C. Mehta' },
  { id: 4, name: 'Dr. D. Rao' },
];

const statusOptions = ['Pending', 'Approved', 'Completed', 'Cancelled'];

const initialFormState = {
  doctor: '',
  patient_name: '',
  doctor_name: '',
  date: '',
  time: '',
  reason: '',
  status: 'Pending',
};

const AddAppointmentForm = ({ open, onClose,onSave, token }) => {
    
  const [formData, setFormData] = useState(initialFormState);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async () => {
  if (!selectedDoctor || !formData.patient_name.trim()) {
    alert('Please select a doctor and enter a patient name.');
    return;
  }

  try {
    await dispatch(
      addNewAppointment({
        newAppointment: {
          ...formData,
          doctor: selectedDoctor.id,
          doctor_name: selectedDoctor.name, // optional, if your API uses it
        },
        token,
      })
    ).unwrap();

    // ✅ Fetch updated appointment list
    dispatch(fetchAppointments(token));

    setFormData(initialFormState);
    setSelectedDoctor(null);
    onClose();
  } catch (error) {
    console.error('Failed to add appointment:', error);
  }
};
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Appointment</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <Autocomplete
            options={doctorList}
            getOptionLabel={(option) => option.name}
            value={selectedDoctor}
            onChange={(event, newValue) => setSelectedDoctor(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Select Doctor" fullWidth />
            )}
          />

          {/* TextField for Patient Name */}
          <TextField
            label="Patient Name"
            name="patient_name"
            fullWidth
            value={formData.patient_name}
            onChange={handleChange}
          />

          <TextField
            label="Date"
            name="date"
            type="date"
            fullWidth
            value={formData.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Time"
            name="time"
            type="time"
            fullWidth
            value={formData.time}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Reason"
            name="reason"
            fullWidth
            multiline
            value={formData.reason}
            onChange={handleChange}
          />
          <TextField
            label="Status"
            name="status"
            select
            fullWidth
            value={formData.status}
            onChange={handleChange}
          >
            {statusOptions.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
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

export default AddAppointmentForm;
