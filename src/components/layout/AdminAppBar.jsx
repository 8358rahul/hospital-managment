import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useState } from 'react';
import AdminMenu from './AdminMenu';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { useAppSelector } from '../../app/hooks';

const AdminAppBar = ({ handleDrawerToggle }) => {
  const user = useAppSelector(selectCurrentUser);
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        width: '100%',
        background: 'linear-gradient(90deg, #2193b0, #6dd5ed)', // bluish gradient
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 56, sm: 64 },
          px: { xs: 1, sm: 2 },
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {/* Left side: Menu + Logo + Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' }, mr: 1 }}
          >
            <MenuIcon />
          </IconButton>

          <LocalHospitalIcon
            sx={{ color: 'white', fontSize: 28, mr: 1, flexShrink: 0 }}
          />

          <Typography
            variant="h6"
            noWrap
            sx={{
              color: 'white',
              fontSize: { xs: '0.9rem', sm: '1.25rem' },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: { xs: '150px', sm: 'unset' }, // prevent overflow
            }}
          >
            Hospital Management
          </Typography>
        </Box>

        {/* Right side: Avatar */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ p: 0 }}>
            <Avatar alt={user?.name} src={user?.avatar} sx={{ width: 32, height: 32 }} />
          </IconButton>
          <AdminMenu anchorEl={anchorEl} handleClose={() => setAnchorEl(null)} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminAppBar;
