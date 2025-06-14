// src/pages/ProfilePage.tsx
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "Dr. Jane Smith",
    email: "jane.smith@example.com",
    phone: "+91 98765 43210",
    specialization: "Cardiologist",
    bio: "Experienced doctor with 10+ years of service.",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box display="flex" justifyContent="center" mb={3}>
          <Avatar sx={{ width: 100, height: 100 }}>JS</Avatar>
        </Box>

        <Typography variant="h5" align="center" gutterBottom>
          {editMode ? "Edit Profile" : "Profile Details"}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Specialization"
              name="specialization"
              value={profile.specialization}
              onChange={handleChange}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Bio"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              disabled={!editMode}
            />
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            variant={editMode ? "contained" : "outlined"}
            startIcon={<EditIcon />}
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Save Changes" : "Edit Profile"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
