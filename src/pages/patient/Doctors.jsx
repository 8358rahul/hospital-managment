import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
} from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { selectAllDoctors } from '../../features/doctor/doctorSlice';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { addNewAppointment } from '../../features/appointment/appointmentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentToken } from '../../features/auth/authSlice';

const PatientDoctors = () => {
    const token = useSelector(selectCurrentToken);
  const doctors = useAppSelector(selectAllDoctors);
  const dispatch=useDispatch()
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
   const [appointmentData, setAppointmentData] = useState({
    doctor:null,
  
    date: '',
    time: '',
    reason: '',
    patient: '', // added patient field
  });
console.log("selectedDoctor", selectedDoctor)
console.log('appointmentData', appointmentData)
  const itemsPerPage = 6;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleOpenDialog = (doctor) => {
    setSelectedDoctor(doctor);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setAppointmentData({ date: '', time: '', reason: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prev) => ({ ...prev, [name]: value }));
  };

   const handleSubmitAppointment = async () => {
   

    try {
      await dispatch(
        addNewAppointment({
          newAppointment: {
            ...appointmentData,
            doctor: selectedDoctor.id,
          },
          token,
        })
      ).unwrap();

      handleCloseDialog();
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Failed to book appointment.');
    }
  };

  const displayedDoctors = doctors.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 5 }}>
        <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
          Available Doctors
        </Typography>

        <Grid container spacing={4}>
          {displayedDoctors.map((doctor) => (
            <Grid item xs={12} sm={6} md={4} key={doctor.id}>
              <Card
                sx={{
                  height: 330,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 6,
                  borderRadius: 3,
                  px: 4,
                  pt: 2,
                  
                }}
              >
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Avatar
                    sx={{
                      bgcolor: '#1976d2',
                      width: 70,
                      height: 70,
                      mb: 2,
                    }}
                  >
                    <LocalHospitalIcon fontSize="large" />
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold">
                    {doctor.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {doctor.specialization}
                  </Typography>
                </Box>

                <CardContent>
                  <Typography variant="body2" mb={0.5}>
                    <strong>Qualifications:</strong> {doctor.qualifications.join(', ')}
                  </Typography>
                  <Typography variant="body2" mb={0.5}>
                    <strong>Experience:</strong> {doctor.experience} years
                  </Typography>
                  <Typography variant="body2" mb={1}>
                    <strong>Consultation Fee:</strong> ${doctor.consultationFee}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleOpenDialog(doctor)}
                  >
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <Pagination
            count={Math.ceil(doctors.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>

      {/* Appointment Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Book Appointment with {selectedDoctor?.name}</DialogTitle>
        <DialogContent dividers>
          <Box display="flex" flexDirection="column" gap={2} py={1}>
            <TextField
              label="Appointment Date"
              type="date"
              name="date"
              value={appointmentData.date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Preferred Time"
              type="time"
              name="time"
              value={appointmentData.time}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Reason for Visit"
              name="reason"
              value={appointmentData.reason}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitAppointment}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PatientDoctors;
