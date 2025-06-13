import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  CalendarToday as CalendarTodayIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { logout } from '../../features/auth/authSlice';
import hospitalLogo from "../../assets/1_AFo1fCc4zToskBIkRZU82g.webp";


const drawerWidth = 240;

const DoctorSidebar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: drawerWidth, 
          boxSizing: 'border-box',
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      <Toolbar sx={{ height: 64, backgroundColor: '#e0f7fa',  paddingLeft:"0px", paddingRight:"0px"}}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
          <img 
            src={hospitalLogo}
            alt="Hospital Management Logo" 
            style={{ height: '64px', width: '240px' }} 
          />
        </Box>
      </Toolbar>
      <Divider />
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/doctor">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/doctor/appointments">
              <ListItemIcon>
                <CalendarTodayIcon />
              </ListItemIcon>
              <ListItemText primary="Appointments" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/doctor/patients">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Patients" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/doctor/settings">
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default DoctorSidebar;