import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Toolbar } from '@mui/material'; 
import DoctorAppBar from '../components/layout/DoctorAppBar';
import DoctorSidebar from '../components/layout/DoctorSidebar';

const DoctorLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <DoctorAppBar />
      <DoctorSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DoctorLayout;