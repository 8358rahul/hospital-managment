import {
  Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  MedicalServices as MedicalServicesIcon,
  CalendarToday as CalendarTodayIcon,
  ExitToApp as ExitToAppIcon,
  Assessment as AssessmentIcon
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useEffect, useState } from "react";
import hospitalLogo from "../../assets/1_AFo1fCc4zToskBIkRZU82g.webp";
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;
const drawerWidthClosed = 72;

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

const PatientSidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const dispatch = useDispatch();

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
          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton component={NavLink} to="/patient" sx={navItemStyles} end>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton component={NavLink} to="/patient/doctors" sx={navItemStyles} end>
              <ListItemIcon><PeopleIcon /></ListItemIcon>
              <ListItemText primary="Doctor" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton component={NavLink} to="/patient/appointments" sx={navItemStyles}>
              <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
              <ListItemText primary="Appointments" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton component={NavLink} to="/patient/bills" sx={navItemStyles}>
              <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
              <ListItemText primary="Bills" />
            </ListItemButton>
          </ListItem>


          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton component={NavLink} to="/patient/reports" sx={navItemStyles}>
              <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
              <ListItemText primary="Medical Reports" />
            </ListItemButton>
          </ListItem>



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

export default PatientSidebar;
