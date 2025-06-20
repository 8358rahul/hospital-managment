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
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentRole } from "../features/auth/authSlice";

export default function ProfilePage() {
  const role = useSelector(selectCurrentRole); // ⬅️ use your own selector logic
  const [editMode, setEditMode] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "Dr. Jane Smith",
    email: "jane.smith@example.com",
    phone: "+91 98765 43210",
    specialization: "Cardiologist",
    bio: "Experienced doctor with 10+ years of service.",
    blood_type: "A+",
    gender: "Female",
    address: "123 Heart Care Avenue, Delhi",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const isAdmin = role === "admin";
  const isPatient = role === "patient";

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box display="flex" justifyContent="center" mb={3}>
          <Avatar sx={{ width: 100, height: 100 }}>
            {profile.fullName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </Avatar>
        </Box>

        <Typography variant="h5" align="center" gutterBottom>
          {editMode ? "Edit Profile" : "Profile Details"}
        </Typography>

        <Grid container spacing={2}>
          {/* Full Name */}
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

          {/* Email */}
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

          {/* Only show extra fields if patient */}
          {isPatient && (
            <>
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
                  label="Blood Type"
                  name="blood_type"
                  value={profile.blood_type}
                  onChange={handleChange}
                  disabled={!editMode}
                  select
                >
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    )
                  )}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Gender"
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                  disabled={!editMode}
                  select
                >
                  {["Male", "Female", "Other"].map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {gender}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  disabled={!editMode}
                  multiline
                  rows={2}
                />
              </Grid>
            </>
          )}

          {/* Doctor-only fields (optional) */}
          {!isAdmin && !isPatient && (
            <>
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
            </>
          )}
        </Grid>

        {/* Button */}
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
