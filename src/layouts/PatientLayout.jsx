import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Toolbar } from '@mui/material'; 
import PatientAppBar from '../components/layout/PatientAppBar';
import PatientSidebar from '../components/layout/PatientSidebar';
import { useState } from 'react';
const PatientLayout = () => {
const [mobileOpen, setMobileOpen] = useState(false);
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
  return (
       <Box sx={{ display: 'flex', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* <CssBaseline /> */}
       <PatientAppBar handleDrawerToggle={handleDrawerToggle}/>
      <PatientSidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflowX: 'hidden' }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default PatientLayout;