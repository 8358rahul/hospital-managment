import { Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { useParams, Link } from 'react-router-dom';  
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectSharedPatientReports, shareReport } from '../../features/patientReport/patientReportSlice';
import { selectPatientById } from '../../features/patient/patientSlice'; 
import { ArrowBack } from '@mui/icons-material';
import ShareReportForm from '../../components/doctor/ShareReportForm';
import { selectAppointmentsByPatientAndDoctor } from '../../features/appointment/appointmentSlice';

const PatientDetails = () => {
  const { patientId } = useParams();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const patient = useAppSelector((state) => 
    selectPatientById(state, patientId || '')
  );

  const appointments = useAppSelector((state) => 
    selectAppointmentsByPatientAndDoctor(state, patientId || '', user?.id || '')
  );

  const reports = useAppSelector((state) =>
    selectSharedPatientReports(state, patientId || '')
  );

  const handleShareReport = (reportData ) => {
    const newReport = {
      ...reportData,
      id: `report-${Date.now()}`,
      isShared: true,
      doctorId: user?.id || '',
      doctorName: user?.name || 'Dr. Unknown',
      date: new Date().toISOString()
    };
    dispatch(shareReport(newReport));
  };

  if (!patient) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Patient not found
        </Typography>
        <Button component={Link} to="/doctor/patients" startIcon={<ArrowBack />}>
          Back to Patients
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Button 
          component={Link} 
          to="/doctor/patients" 
          startIcon={<ArrowBack />}
          sx={{ mb: 2 }}
        >
          Back to Patients
        </Button>

        <Typography variant="h4" gutterBottom>
          Patient Details
        </Typography>

        <Grid container spacing={3}>
          {/* Patient Information */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Name</Typography>
                    <Typography>{patient.name}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Age</Typography>
                    <Typography>{patient.age || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Gender</Typography>
                    <Typography>{patient.gender || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2">Blood Type</Typography>
                    <Typography>{patient.bloodType || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Contact</Typography>
                    <Typography>{patient.phone || 'N/A'}</Typography>
                    <Typography>{patient.email || 'N/A'}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Appointments Summary */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Appointments Summary
                </Typography>
                <Typography>
                  Total Appointments: {appointments.length}
                </Typography>
                <Typography>
                  Last Appointment: {appointments.length > 0 ? 
                    new Date(appointments[0].date).toLocaleDateString() : 'N/A'}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button 
                    variant="outlined" 
                    component={Link} 
                    to={`/doctor/patients/${patientId}/appointments`}
                  >
                    View All Appointments
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Shared Reports */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Shared Reports ({reports.length})
                </Typography>
                {reports.length === 0 ? (
                  <Typography color="textSecondary">
                    No reports shared with this patient yet.
                  </Typography>
                ) : (
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    {reports.slice(0, 3).map(report => (
                      <Card key={report.id} sx={{ minWidth: 275 }}>
                        <CardContent>
                          <Typography variant="subtitle1">
                            {report.title}
                          </Typography>
                          <Typography color="textSecondary" variant="body2">
                            {new Date(report.date).toLocaleDateString()}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            {report.type}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                    {reports.length > 3 && (
                      <Typography sx={{ alignSelf: 'center' }}>
                        +{reports.length - 3} more...
                      </Typography>
                    )}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Share New Report */}
          <Grid item xs={12}>
            <ShareReportForm
              patientId={patient.id} 
              onShare={handleShareReport} 
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default PatientDetails;