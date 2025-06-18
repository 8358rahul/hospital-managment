// AdminReports.jsx
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Paper
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectAllReports } from '../../features/report/reportSlice';
import { motion } from 'framer-motion';
import backgroundImageUrl from '../../assets/health-still-life-with-copy-space.jpg';
import ReportPopup from './ReportPopup';
import { useState } from 'react';

const reportTypes = [
  // { type: 'Financial', description: 'Track revenue, expenses and profits.' },
  // { type: 'Inventory', description: 'Monitor stock and inventory levels.' },
  { type: 'Patient', description: 'View patient statistics and history.' },
  { type: 'Appointment', description: 'Manage appointment records.' },
];

const AdminReports = () => {
  const reports = useAppSelector(selectAllReports);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleOpenPopup = (reportType) => {
    setSelectedReport(reportType);
    setOpenPopup(true);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        px: 2,
      }}
    >
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Paper
          elevation={6}
          sx={{
            borderRadius: 2,
            p: 2,
            mb: 3,
            maxWidth: 500,
            mx: 'auto',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(8px)',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="#0d47a1" gutterBottom>
            Reports Dashboard
          </Typography>
          <Typography variant="body2" sx={{ color: '#0d47a1', fontSize: '0.85rem' }}>
            Access and manage different types of system reports below.
          </Typography>
        </Paper>

        <Grid container spacing={4} justifyContent="center" >
          {reportTypes.map((report) => (
            <Grid item key={report.type} width={{ xs: '100%', sm: '50%', md: '33.33%',lg:"35%" }} >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between', 
                     background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), #ffffff)',
                    border: '1px solid #ccc',
                    borderRadius: 4,
                    boxShadow: 5,   
                    p: 3,
                   
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      mb={1}
                      sx={{ color: '#0d47a1', borderBottom: '1px solid #888', pb: 1 }}
                    >
                      {report.type} Report
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#333', mt: 1, fontSize: '0.95rem', minHeight: 60 }}>
                      {report.description}
                    </Typography>
                  </CardContent>

                  <Box textAlign="right">
                    <Button
                      variant="contained"
                      sx={{
                        background: '#1565c0',
                        color: '#fff',
                        fontWeight: 600,
                        textTransform: 'none',
                        px: 2,
                        py: 0.8,
                        fontSize: '0.875rem',
                        '&:hover': {
                          background: '#0d47a1',
                        },
                      }}
                      onClick={() => handleOpenPopup(report.type)}
                    >
                      View Reports
                    </Button>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {openPopup && (
          <ReportPopup open={openPopup} onClose={() => setOpenPopup(false)} reportType={selectedReport} />
        )}
      </Container>
    </Box>
  );
};

export default AdminReports;