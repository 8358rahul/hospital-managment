import { Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { Link } from 'react-router-dom';
import { selectAllDoctors } from '../../features/doctor/doctorSlice';

const PatientDoctors = () => {
  const doctors = useAppSelector(selectAllDoctors);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Available Doctors
        </Typography>
        
        <Grid container spacing={3}>
          {doctors.map((doctor) => (
            <Grid item xs={12} sm={6} md={4} key={doctor.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {doctor.name}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {doctor.specialization}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Qualifications: {doctor.qualifications.join(', ')}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Experience: {doctor.experience} years
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Consultation Fee: ${doctor.consultationFee}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Availability: {doctor.availableDays.join(', ')} {doctor.availableHours}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/patient/book-appointment?doctorId=${doctor.id}`}
                    variant="contained"
                    fullWidth
                  >
                    Book Appointment
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default PatientDoctors;