import { Box, Button, Card, CardContent, Container, Divider, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Download, ArrowBack } from '@mui/icons-material';
import { useParams, Link } from 'react-router-dom'; 
import { useAppSelector } from '../../app/hooks'; 
 
const ReportDetails = () => {
  const { id } = useParams();
  const report = useAppSelector((state) => 
    selectPatientReportById(state, id || '')
  );

  if (!report) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Report not found
        </Typography>
        <Button component={Link} to="/patient/reports" startIcon={<ArrowBack />}>
          Back to Reports
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Button 
          component={Link} 
          to="/patient/reports" 
          startIcon={<ArrowBack />}
          sx={{ mb: 2 }}
        >
          Back to Reports
        </Button>
        
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {report.title}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {new Date(report.date).toLocaleDateString()} • {report.doctorName}
            </Typography>
            <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
              {report.content}
            </Typography>

            {report.attachments && report.attachments.length > 0 && (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" gutterBottom>
                  Attachments
                </Typography>
                <List>
                  {report.attachments.map((attachment, index) => (
                    <ListItem 
                      key={index}
                      secondaryAction={
                        <Button
                          variant="outlined"
                          startIcon={<Download />}
                          href={attachment}
                          download
                        >
                          Download
                        </Button>
                      }
                    >
                      <ListItemText
                        primary={`Attachment ${index + 1}`}
                        secondary={attachment.split('/').pop()}
                      />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ReportDetails;