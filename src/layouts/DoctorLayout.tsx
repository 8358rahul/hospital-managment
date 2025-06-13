import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Toolbar } from '@mui/material'; 
import DoctorAppBar from '../components/layout/DoctorAppBar';
import DoctorSidebar from '../components/layout/DoctorSidebar';

const drawerWidth = 20;
const DoctorLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <DoctorAppBar />
      <DoctorSidebar />
      <Box component="main" sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: `${drawerWidth}px`, // Ensure content starts after the sidebar
          width: 1400, // Adjust width for larger screens
        }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DoctorLayout;