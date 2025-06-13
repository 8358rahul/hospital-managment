import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; 
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'; // Import hospital icon
import { useState } from 'react';
import AdminMenu from './AdminMenu';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { useAppSelector } from '../../app/hooks';

const drawerWidth = 240;

const AdminAppBar = () => {
  const user = useAppSelector(selectCurrentUser);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <LocalHospitalIcon sx={{ mr: 1 }} /> {/* Hospital icon */}
          <Typography variant="h6" noWrap component="div">
            Hospital Management System
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {user?.name}
          </Typography>
          <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <Avatar alt={user?.name} src={user?.avatar} />
          </IconButton>
          <AdminMenu anchorEl={anchorEl} handleClose={handleMenuClose} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminAppBar;