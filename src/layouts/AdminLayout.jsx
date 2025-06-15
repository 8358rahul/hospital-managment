// AdminLayout.jsx or wherever you're rendering the layout
import { useState } from 'react';
import AdminAppBar from '../components/layout/AdminAppBar';
import AdminSidebar from '../components/layout/AdminSidebar';
import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminAppBar handleDrawerToggle={handleDrawerToggle} />
      <AdminSidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar /> {/* to offset the AppBar height */}
        <Outlet />
      
      </Box>
    </Box>
  );
};

export default AdminLayout;
