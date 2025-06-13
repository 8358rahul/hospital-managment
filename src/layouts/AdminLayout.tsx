import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Toolbar } from '@mui/material';   
import AdminSidebar from '../components/layout/AdminSidebar';
import AdminAppBar from '../components/layout/AdminAppBar';

const AdminLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* <CssBaseline /> */}
      <AdminAppBar />
      <AdminSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;