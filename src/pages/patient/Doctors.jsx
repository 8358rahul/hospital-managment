import React, { useEffect, useState } from 'react';
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
  useMediaQuery,
  useTheme,
  Stack
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks'; 
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { fetchDoctors, selectAllDoctors } from '../../features/doctor/doctorSlice';
import { selectCurrentToken } from '../../features/auth/authSlice';
import { addNewAppointment, fetchAppointments } from '../../features/appointment/appointmentSlice';
import { toast } from 'react-toastify';
 
const PatientDoctors = () => {
    const token = useAppSelector(selectCurrentToken);
  const doctors = useAppSelector(selectAllDoctors);
 
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

  const itemsPerPage = 6;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
   const dispatch = useAppDispatch();

   
    useEffect(() => {
      const getDoctors = async () => {
        await dispatch(fetchDoctors());
      };
      getDoctors();
    }, []);

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
    if(appointmentData.date === '' || appointmentData.time === '' || appointmentData.reason === '') {
      toast.error('Please fill in all the fields.');
      return;
    }
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
        toast.success("Appointment Booked Successfully");
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
        <Typography
          variant={isSmallScreen ? 'h5' : 'h4'}
          fontWeight="bold"
          align="center"
          mb={4}
        >
          Our Expert Doctors
        </Typography>

        <Grid container spacing={4} alignItems={'center'} justifyContent={'center'} >
          {displayedDoctors.map((doctor) => (
            <Grid item xs={12} sm={6} md={4} key={doctor.id} width={"300px"} height={"350px"} >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: 4,
                  boxShadow: 4,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 3 }}>
                  <Avatar sx={{ bgcolor: '#1976d2', width: 70, height: 70, mb: 2 }}>
                    <LocalHospitalIcon fontSize="large" />
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold">
                    {doctor?.fullname}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {doctor.specialization}
                  </Typography>
                </Box>

                <CardContent sx={{ px: 3, pt: 0 }}>
                  <Typography variant="body2" gutterBottom>
                    <strong>Qualifications:</strong> {doctor.qualifications?.join(', ')}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Experience:</strong> {doctor.experience} years
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Consultation Fee:</strong> ${doctor.consultation_fee}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => handleOpenDialog(doctor)}
                  >
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <Pagination
            count={Math.ceil(doctors.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size={isSmallScreen ? 'small' : 'medium'}
            shape="rounded"
          />
        </Box>
      </Box>

      {/* Appointment Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          Book Appointment with <strong>{selectedDoctor?.name}</strong>
        </DialogTitle>
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
