import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Dashboard,
  People,
  CalendarToday,
  MedicalServices,
  Settings,
  ExitToApp,
  Receipt,
  Description,
  Menu,
  ChevronLeft,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useEffect, useState } from "react";
import hospitalLogo from "../../assets/1_AFo1fCc4zToskBIkRZU82g.webp";

const drawerWidthOpen = 240;
const drawerWidthClosed = 72;

const PatientSidebar = ({ open, setOpen }) => { 
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isMobile]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/patient" },
    { text: "Doctors", icon: <People />, path: "/patient/doctors" },
    { text: "Bills", icon: <Receipt />, path: "/patient/bills" },
    { text: "Appointments", icon: <CalendarToday />, path: "/patient/appointments" },
    { text: "Medical Reports", icon: <Description />, path: "/patient/reports" },
    { text: "Medical Records", icon: <MedicalServices />, path: "/patient/records" },
    { text: "Settings", icon: <Settings />, path: "/patient/settings" },
  ];

  const drawerContent = (
    <Box height="100%" display="flex" flexDirection="column">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: open ? "space-between" : "center",
          alignItems: "center",
          px: 2,
          backgroundColor: "#e0f7fa",
        }}
      >
        {open && (
          <Box display="flex" alignItems="center" gap={1}>
            <img src={hospitalLogo} alt="Logo" style={{ height: 36 }} />
            <Typography variant="h6" noWrap>
              HMS
            </Typography>
          </Box>
        )}
        <IconButton onClick={() => setOpen(!open)}>
          {open ? <ChevronLeft /> : <Menu />}
        </IconButton>
      </Toolbar>

      <Divider />
      <List sx={{ flexGrow: 1 }}>
        {menuItems.map(({ text, icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <ListItem key={text} disablePadding>
              <ListItemButton
                component={Link}
                to={path}
                sx={{
                  justifyContent: open ? "initial" : "center",
                  px: 2,
                  backgroundColor: isActive ? "#e0f2f1" : "transparent",
                  borderRadius: 2,
                  mx: 1,
                }}
              >
                <ListItemIcon
                  sx={{ minWidth: 0, mr: open ? 2 : "auto", justifyContent: "center" }}
                >
                  {icon}
                </ListItemIcon>
                {open && <ListItemText primary={text} />}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              justifyContent: open ? "initial" : "center",
              px: 2,
              mx: 1,
              borderRadius: 2,
            }}
          >
            <ListItemIcon
              sx={{ minWidth: 0, mr: open ? 2 : "auto", justifyContent: "center" }}
            >
              <ExitToApp />
            </ListItemIcon>
            {open && <ListItemText primary="Logout" />}
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>  
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            width: open ? drawerWidthOpen : drawerWidthClosed,
            flexShrink: 0,
            whiteSpace: "nowrap",
            "& .MuiDrawer-paper": {
              width: open ? drawerWidthOpen : drawerWidthClosed,
              boxSizing: "border-box",
              overflowX: "hidden",
              backgroundColor: "#f9f9f9",
              transition: "width 0.3s",
            },
          }}
        >
          {drawerContent}
        </Drawer> 
    </>
  );
};

export default PatientSidebar;
