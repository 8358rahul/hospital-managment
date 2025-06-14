import { Box, Button, Card, CardContent, Container, Divider, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';  
import { Download, Print } from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useAppSelector } from '../../app/hooks'; 
import { selectReportById } from '../../features/report/reportSlice';

const ViewReport = () => {
  const { id } = useParams();
  const report = useAppSelector((state) => 
    selectReportById(state, id || '')
  );
 

  if (!report) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Report not found
        </Typography>
      </Container>
    );
  }

  // Format data for charts based on report type
  const getChartData = () => {
    switch (report.type) {
      case 'financial':
        return Object.entries(report.data.revenueByService || {}).map(([name, value]) => ({
          name,
          value
        }));
      case 'appointments':
        return [
          { name: 'Completed', value: report.data.completedAppointments || 0 },
          { name: 'Cancelled', value: report.data.cancelledAppointments || 0 },
          { name: 'No Show', value: report.data.noShowAppointments || 0 }
        ];
      default:
        return [];
    }
  };

  const chartData = getChartData();

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">
            {report.title}
          </Typography>
          <Box>
            <Button startIcon={<Download />} sx={{ mr: 2 }}>
              Download PDF
            </Button>
            <Button startIcon={<Print />}>
              Print
            </Button>
          </Box>
        </Box>
        
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="textSecondary">
                  Generated on: {new Date(report.generatedDate).toLocaleDateString()} | Period: {report.period}
                </Typography>
              </Grid>

              {report.type === 'financial' && (
                <>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Financial Summary
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography>Total Revenue:</Typography>
                          <Typography fontWeight="bold">
                            ${report.data.totalRevenue?.toLocaleString() || '0'}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography>Paid Bills:</Typography>
                          <Typography fontWeight="bold">
                            {report.data.paidBills || '0'}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography>Pending Bills:</Typography>
                          <Typography fontWeight="bold">
                            {report.data.pendingBills || '0'}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Revenue Breakdown
                        </Typography>
                        <Box sx={{ height: 300 }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="value" fill="#8884d8" name="Revenue ($)" />
                            </BarChart>
                          </ResponsiveContainer>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </>
              )}

              {report.type === 'appointments' && (
                <>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Appointment Summary
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography>Total Appointments:</Typography>
                          <Typography fontWeight="bold">
                            {report.data.totalAppointments || '0'}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography>Completed:</Typography>
                          <Typography fontWeight="bold">
                            {report.data.completedAppointments || '0'}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography>Cancellation Rate:</Typography>
                          <Typography fontWeight="bold">
                            {report.data.cancellationRate ? `${report.data.cancellationRate}%` : '0%'}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Appointment Status
                        </Typography>
                        <Box sx={{ height: 300 }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="value" fill="#82ca9d" name="Appointments" />
                            </BarChart>
                          </ResponsiveContainer>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </>
              )}

              {report.type === 'patient' && (
                <Grid item xs={12}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Patient Statistics
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                          <Typography>New Patients:</Typography>
                          <Typography variant="h5">
                            {report.data.newPatients || '0'}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Typography>Returning Patients:</Typography>
                          <Typography variant="h5">
                            {report.data.returningPatients || '0'}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Typography>Average Visits:</Typography>
                          <Typography variant="h5">
                            {report.data.averageVisits || '0'}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              )}

              {report.type === 'doctor' && (
                <Grid item xs={12}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Doctor Performance
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                          <Typography>Most Appointments:</Typography>
                          <Typography variant="h5">
                            {report.data.topDoctor?.name || 'N/A'}
                          </Typography>
                          <Typography color="textSecondary">
                            {report.data.topDoctor?.count || '0'} appointments
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Typography>Highest Satisfaction:</Typography>
                          <Typography variant="h5">
                            {report.data.topRatedDoctor?.name || 'N/A'}
                          </Typography>
                          <Typography color="textSecondary">
                            {report.data.topRatedDoctor?.rating || '0'} rating
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Typography>Busiest Day:</Typography>
                          <Typography variant="h5">
                            {report.data.busiestDay?.day || 'N/A'}
                          </Typography>
                          <Typography color="textSecondary">
                            {report.data.busiestDay?.count || '0'} appointments
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              )}

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Notes
                </Typography>
                <Typography>
                  {report.data.notes || 'No additional notes available for this report.'}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ViewReport;