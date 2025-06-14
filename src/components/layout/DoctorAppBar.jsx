import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; 
import { useState } from 'react';
import DoctorMenu from './DoctorMenu';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { useAppSelector } from '../../app/hooks';

const drawerWidthOpen = 240;
const drawerWidthClosed = 72;

const DoctorAppBar = () => {
  const user = useAppSelector(selectCurrentUser); 
  const [anchorEl, setAnchorEl] = useState(null);

 

 
  return(
       <AppBar
          position="fixed"
          elevation={1}
          sx={{
            width: `calc(100% - ${open ? drawerWidthOpen : drawerWidthClosed}px)`,
            ml: `${open ? drawerWidthOpen : drawerWidthClosed}px`,
            transition: 'width 0.3s, margin 0.3s',
            backgroundColor: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            {/* Show on small screens for mobile drawer */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => setOpen(!open)}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1, color: 'black' }}>
              Doctor Portal
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ mr: 2 }}>
                {user?.name}
              </Typography>
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ p: 0 }}>
                <Avatar alt={user?.name} src={user?.avatar} />
              </IconButton>
              <DoctorMenu anchorEl={anchorEl} handleClose={() => setAnchorEl(null)} />
            </Box>
          </Toolbar>
        </AppBar>
  ) 
};

export default DoctorAppBar;