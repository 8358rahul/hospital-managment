import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';

import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  MedicalServices as MedicalServicesIcon,
  CalendarToday as CalendarTodayIcon,
  ExitToApp as ExitToAppIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';
import { logout, selectCurrentRole } from '../../features/auth/authSlice';
import { NavLink } from 'react-router-dom';
import hospitalLogo from "../../assets/1_AFo1fCc4zToskBIkRZU82g.webp";

const drawerWidth = 240;

const navItemStyles = {
  '&.active': {
    backgroundColor: '#88c4f357',
    color: 'black',
    fontWeight: 'bold',
    borderRadius: '4px',
    '& .MuiListItemIcon-root': {
      color: 'black',
    },
  },
};

// Sidebar config for each role
const sidebarConfig = {
  admin: [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
    { label: 'Patients', icon: <PeopleIcon />, path: '/admin/patients' },
    { label: 'Doctors', icon: <MedicalServicesIcon />, path: '/admin/doctors' },
    { label: 'Reports', icon: <AssessmentIcon />, path: '/admin/reports' },
    { label: 'Appointments', icon: <CalendarTodayIcon />, path: '/admin/appointments' },
  ],
  doctor: [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/doctor' },
    { label: 'Appointments', icon: <CalendarTodayIcon />, path: '/doctor/appointments' },
    { label: 'Patients', icon: <PeopleIcon />, path: '/doctor/patients' },
  ],
  patient: [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/patient' },
    { label: 'Doctor', icon: <PeopleIcon />, path: '/patient/doctors' },
    { label: 'Appointments', icon: <CalendarTodayIcon />, path: '/patient/appointments' },
    { label: 'Bills', icon: <CalendarTodayIcon />, path: '/patient/bills' },
    { label: 'Medical Reports', icon: <CalendarTodayIcon />, path: '/patient/reports' },
  ],
};

const AdminSidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const dispatch = useDispatch();
  const role = useSelector(selectCurrentRole);
  

  const handleLogout = () => {
    dispatch(logout());
  };

  const drawerContent = (
    <>
      <Toolbar sx={{ height: 64, px: 0 }}>
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={hospitalLogo}
            alt="Hospital Logo"
            style={{ height: '64px', width: '240px', objectFit: 'cover' }}
          />
        </Box>
      </Toolbar>
      <Divider />
      <Box sx={{ px: 2, overflow: 'auto' }}>
        <List>
          {sidebarConfig[role]?.map((item) => (
            <ListItem disablePadding sx={{ mb: 1 }} key={item.path}>
              <ListItemButton component={NavLink} to={item.path} sx={navItemStyles} end>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </>
  );

  return (
    <>
      {/* Permanent Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#ffffff',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Temporary Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#ffffff',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default AdminSidebar;
