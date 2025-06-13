import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Toolbar } from '@mui/material'; 
import PatientAppBar from '../components/layout/PatientAppBar';
import PatientSidebar from '../components/layout/PatientSidebar';

const drawerWidth = 20;

const PatientLayout = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <PatientAppBar />
      <PatientSidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
         // Ensure content starts after the sidebar
          width: 1400, // Adjust width for larger screens
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default PatientLayout;