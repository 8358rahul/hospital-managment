import { Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectUserDetail,
  updateDoctor,
} from "../../features/doctor/doctorSlice";
import { useState } from "react";
import AddEditDoctorProfile from "../../components/AddEditDoctorProfile";

const Profile = () => { 
  const user = useAppSelector(selectUserDetail);
  const [openDialog, setOpenDialog] = useState(false);
 
 

  const handleCancelStatusChange = () => {
    setOpenDialog(false);
  };

  if (!user || !user.email) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>

        <Card variant="outlined">
          <CardContent>
            <Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton
                  onClick={() => {
                    setOpenDialog(true);
                  }}
                >
                  <Edit />
                </IconButton>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Personal Information
                  </Typography>
                  <Typography>
                    <strong>Name:</strong>{" "}
                    {user?.fullname || "Not specified"}
                  </Typography>
                  <Typography>
                    <strong>Experience:</strong> {user?.experience} years
                  </Typography>
                  <Typography>
                    <strong>Consultation Fee:</strong> ${user?.consultation_fee}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Qualifications
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {user?.qualifications?.map((qual, index) => (
                      <Chip key={index} label={qual} />
                    ))}
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Availability
                  </Typography>
                  <Typography>
                    <strong>Days:</strong>{" "}
                    {user?.available_days?.join(", ") || "Not specified"}
                  </Typography>
                  <Typography>
                    <strong>Hours:</strong>{" "}
                    {user?.available_hours || "Not specified"}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCancelStatusChange}
        fullWidth
        maxWidth="md"
      >
        <DialogContent>
          <AddEditDoctorProfile onGoBack={handleCancelStatusChange} isEdit={true} />
        </DialogContent> 
      </Dialog>
    </Container>
  );
};

export default Profile;
