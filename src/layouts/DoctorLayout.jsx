import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Toolbar } from '@mui/material'; 
import DoctorAppBar from '../components/layout/DoctorAppBar';
import DoctorSidebar from '../components/layout/DoctorSidebar';
import { useState } from 'react';

const DoctorLayout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
  return (
       <Box sx={{ display: 'flex', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* <CssBaseline /> */}
      <DoctorAppBar handleDrawerToggle={handleDrawerToggle}/>
      <DoctorSidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflowX: 'hidden' }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DoctorLayout;