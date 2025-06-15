import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material';

const DoctorForm = ({ open, onClose, doctor, onSave }) => {
  const [formData, setFormData] = React.useState(doctor || {});

  React.useEffect(() => {
    if (doctor) setFormData(doctor);
    else {
      setFormData({
        name: '',
        email: '',
        specialization: '',
        qualifications: '',
        experience: 0,
        consultationFee: 0,
      });
    }
  }, [doctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ['experience', 'consultationFee'].includes(name)
        ? parseInt(value || '0')
        : value,
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 600 }}>
        {formData?.id ? 'Edit Doctor' : 'Add New Doctor'}
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email || ''}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Specialization"
            name="specialization"
            value={formData.specialization || ''}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Qualifications"
            name="qualifications"
            value={formData.qualifications || ''}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Experience (years)"
            name="experience"
            type="number"
            value={formData.experience || ''}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Consultation Fee"
            name="consultationFee"
            type="number"
            value={formData.consultationFee || ''}
            onChange={handleChange}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          sx={{ backgroundColor: '#e0e0e0', color: '#000', fontWeight: 500 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ fontWeight: 600 }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DoctorForm;
