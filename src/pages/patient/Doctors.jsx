import { Box, Button, Card, CardContent, Container, Grid, Typography, Pagination } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { Link } from 'react-router-dom';
import { selectAllDoctors } from '../../features/doctor/doctorSlice';
import { useState } from 'react';

const PatientDoctors = () => {
  const doctors = useAppSelector(selectAllDoctors);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10; // Number of doctors per page

  const handlePageChange = (event ) => {
    setPage(value);
  };

  // Calculate the doctors to display based on the current page
  const displayedDoctors = doctors.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Available Doctors
        </Typography>
        
        <Grid container spacing={3}>
          {displayedDoctors.map((doctor) => (
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

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={Math.ceil(doctors.length / itemsPerPage)} // Total number of pages
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default PatientDoctors;