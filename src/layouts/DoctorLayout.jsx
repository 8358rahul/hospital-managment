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
    <Box sx={{ display: 'flex' }}>
      {/* <CssBaseline /> */}
      <DoctorAppBar handleDrawerToggle={handleDrawerToggle}/>
      <DoctorSidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DoctorLayout;