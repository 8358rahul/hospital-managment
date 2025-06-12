import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Toolbar } from '@mui/material'; 
import PatientAppBar from '../components/layout/PatientAppBar';
import PatientSidebar from '../components/layout/PatientSidebar';
const PatientLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <PatientAppBar />
      <PatientSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default PatientLayout;