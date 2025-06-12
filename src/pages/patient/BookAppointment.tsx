import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Container, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select, 
  TextField, 
  Typography ,
  Grid
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs'; 
import { mockDoctors } from '../../utils/mockData';

const BookAppointment = () => {
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [time, setTime] = useState<Dayjs | null>(dayjs().hour(10).minute(0));
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would dispatch an action to save the appointment
    alert('Appointment booked successfully!');
    navigate('/patient/appointments');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Book Appointment
        </Typography>
        
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="doctor-label">Select Doctor</InputLabel>
                <Select
                  labelId="doctor-label"
                  value={selectedDoctor}
                  label="Select Doctor"
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  required
                >
                  {mockDoctors.map((doctor) => (
                    <MenuItem key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialization}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid container spacing={3} sx={{ mb: 3 }}>
                  <Grid item xs={12} md={6}>
                    <DatePicker
                      label="Appointment Date"
                      value={date}
                      onChange={(newValue) => setDate(newValue)}
                      minDate={dayjs()}
                      maxDate={dayjs().add(30, 'day')}
                      slotProps={{ textField: { fullWidth: true, required: true } }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TimePicker
                      label="Appointment Time"
                      value={time}
                      onChange={(newValue) => setTime(newValue)}
                      minutesStep={15}
                      slotProps={{ textField: { fullWidth: true, required: true } }}
                    />
                  </Grid>
                </Grid>
              </LocalizationProvider>

              <TextField
                fullWidth
                label="Reason for Appointment"
                multiline
                rows={4}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                sx={{ mb: 3 }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                  variant="contained" 
                  type="submit"
                  size="large"
                >
                  Book Appointment
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default BookAppointment;