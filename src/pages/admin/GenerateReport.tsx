import { Box, Button, Card, CardContent, Container, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAppDispatch } from '../../app/hooks';
import { addReport } from '../../features/report/reportSlice';

const GenerateReport = () => {
  const [reportType, setReportType] = useState('financial');
  const [period, setPeriod] = useState('monthly');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleGenerate = () => {
    // In a real app, this would generate actual data
    const newReport = {
      id: `report-${Date.now()}`,
      type: reportType as any,
      title: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report - ${new Date().toLocaleDateString()}`,
      generatedDate: new Date().toISOString(),
      period,
      data: { /* Generated report data would go here */ }
    };

    dispatch(addReport(newReport));
    navigate(`/admin/reports/${newReport.id}`);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Generate New Report
        </Typography>
        
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Report Type</InputLabel>
                <Select
                  value={reportType}
                  label="Report Type"
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <MenuItem value="financial">Financial</MenuItem>
                  <MenuItem value="appointments">Appointments</MenuItem>
                  <MenuItem value="patient">Patient Statistics</MenuItem>
                  <MenuItem value="doctor">Doctor Performance</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Period</InputLabel>
                <Select
                  value={period}
                  label="Period"
                  onChange={(e) => setPeriod(e.target.value)}
                >
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="yearly">Yearly</MenuItem>
                  <MenuItem value="custom">Custom Range</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Button 
                  variant="contained" 
                  onClick={handleGenerate}
                  size="large"
                >
                  Generate Report
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default GenerateReport;