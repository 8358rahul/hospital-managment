// src/pages/SettingsPage.tsx
import { useState } from "react";
import {
  Container,
  Tabs,
  Tab,
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SecurityIcon from "@mui/icons-material/Security";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AccessibleIcon from "@mui/icons-material/Accessible";
import { useAppSelector } from "../app/hooks";
import { selectCurrentRole } from "../features/auth/authSlice";

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index} role="tabpanel">
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default function SettingsPage() {
  const [tab, setTab] = useState(0);
    const role = useAppSelector(selectCurrentRole);


  const handleChange = (e, newValue) => {
    
    setTab(newValue);

  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      {/* <Tabs value={tab} onChange={handleChange} centered>
        <Tab icon={<AdminPanelSettingsIcon />} label="Admin" />
        <Tab icon={<LocalHospitalIcon />} label="Doctor" />
        <Tab icon={<AccessibleIcon />} label="Patient" />
      </Tabs> */}

      {/* Admin Panel */}
      <TabPanel value={tab} index={0}>
        <SettingsSection title="Profile Settings" icon={<PersonIcon />}>
          {/* Insert admin-specific settings here */}
          Manage hospital staff, system users, and notifications.
        </SettingsSection>
        <SettingsSection title="Security Settings" icon={<SecurityIcon />}>
          Change password, manage access roles and logs.
        </SettingsSection>
      </TabPanel>

      {/* Doctor Panel */}
      <TabPanel value={tab} index={1}>
        <SettingsSection title="Profile Settings" icon={<PersonIcon />}>
          Update your specialization, availability, and bio.
        </SettingsSection>
        <SettingsSection title="Security Settings" icon={<SecurityIcon />}>
          Change password and manage two-factor authentication.
        </SettingsSection>
      </TabPanel>

      {/* Patient Panel */}
      <TabPanel value={tab} index={2}>
        <SettingsSection title="Profile Settings" icon={<PersonIcon />}>
          Update personal information, contact, and emergency details.
        </SettingsSection>
        <SettingsSection title="Security Settings" icon={<SecurityIcon />}>
          Update password, manage device logins.
        </SettingsSection>
      </TabPanel>
    </Container>
  );
}

function SettingsSection({ title, children, icon }) {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>{icon}</Grid>
        <Grid item>
          <Typography variant="h6">{title}</Typography>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Typography>{children}</Typography>
    </Paper>
  );
}
