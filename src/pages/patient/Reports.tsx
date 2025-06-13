import { Box, Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import { Download, Visibility } from '@mui/icons-material'; 
import { Link } from 'react-router-dom';
import type { RootState } from '../../app/store';
import { selectSharedPatientReports } from '../../features/patientReport/patientReportSlice';
import { useAppSelector } from '../../app/hooks';

const PatientReports = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const reports = useAppSelector((state: RootState) => 
    selectSharedPatientReports(state, user?.id || '')
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Medical Reports
        </Typography>
        
        {reports.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            No reports available. Your doctor will share reports with you here.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {reports.map((report) => (
              <Grid item xs={12} md={6} key={report.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {report.title}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      {new Date(report.date).toLocaleDateString()} • {report.doctorName}
                    </Typography>
                    <Typography variant="body2" paragraph sx={{ mb: 2 }}>
                      {report.content.length > 150 
                        ? `${report.content.substring(0, 150)}...` 
                        : report.content}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button
                        component={Link}
                        to={`/patient/reports/${report.id}`}
                        variant="outlined"
                        startIcon={<Visibility />}
                      >
                        View Details
                      </Button>
                      {report.attachments && report.attachments.length > 0 && (
                        <Button
                          variant="contained"
                          startIcon={<Download />}
                          href={report.attachments[0]}
                          download
                        >
                          Download
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default PatientReports;