import { Box, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Typography,Grid } from '@mui/material';
import { useState } from 'react';  

 

const ShareReportForm = ({ patientId, onShare }) => {
  const [report, setReport] = useState({
    title: '',
    type: 'lab',
    content: '',
    attachments: ['']
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onShare({
      patientId,
      doctorId: '', // Will be set by the parent component
      date: new Date().toISOString(),
      ...report,
      attachments: report.attachments.filter(a => a.trim() !== '')
    });
    setReport({
      title: '',
      type: 'lab',
      content: '',
      attachments: ['']
    });
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Share New Report with Patient
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Report Title"
                value={report.title}
                onChange={(e) => setReport({...report, title: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Report Type</InputLabel>
                <Select
                  value={report.type}
                  label="Report Type"
                  onChange={(e) => setReport({...report, type: e.target.value})}
                  required
                >
                  <MenuItem value="lab">Lab Results</MenuItem>
                  <MenuItem value="diagnostic">Diagnostic Report</MenuItem>
                  <MenuItem value="prescription">Prescription</MenuItem>
                  <MenuItem value="summary">Visit Summary</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Report Content"
                multiline
                rows={4}
                value={report.content}
                onChange={(e) => setReport({...report, content: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Attachments (URLs)
              </Typography>
              {report.attachments.map((url, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <TextField
                    fullWidth
                    value={url}
                    onChange={(e) => {
                      const newAttachments = [...report.attachments];
                      newAttachments[index] = e.target.value;
                      setReport({...report, attachments: newAttachments});
                    }}
                    placeholder="https://example.com/report.pdf"
                  />
                  {index === report.attachments.length - 1 ? (
                    <Button
                      variant="outlined"
                      onClick={() => setReport({...report, attachments: [...report.attachments, '']})}
                    >
                      Add
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        const newAttachments = [...report.attachments];
                        newAttachments.splice(index, 1);
                        setReport({...report, attachments: newAttachments});
                      }}
                    >
                      Remove
                    </Button>
                  )}
                </Box>
              ))}
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained">
                Share Report
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ShareReportForm;