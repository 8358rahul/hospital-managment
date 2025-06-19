import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
  useMediaQuery,
  useTheme,
  Stack,
  InputAdornment,
  Skeleton,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import RefreshIcon from "@mui/icons-material/Refresh";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import {
  fetchDoctors,
  selectAllDoctors,
  selectDoctorStatus,
  selectUserDetail,
} from "../../features/doctor/doctorSlice";
import { selectCurrentToken } from "../../features/auth/authSlice";
import SearchIcon from "@mui/icons-material/Search";

import {
  addNewAppointment,
  fetchAppointments,
} from "../../features/appointment/appointmentSlice";
import { toast } from "react-toastify";
import { useDebounce } from "../../app/useDebounce";

const PatientDoctors = () => {
  const doctors = useAppSelector(selectAllDoctors);
  const user = useAppSelector(selectUserDetail);
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [search, setSearch] = useState("");
  const isLoading = useAppSelector(selectDoctorStatus) === "loading";
   
  const [appointmentData, setAppointmentData] = useState({
    doctor: null,
    patient: user.id,
    date: "",
    time: "",
    reason: "",
  });
  const itemsPerPage = 6;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useAppDispatch();
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const debouncedSearch = useDebounce(search, 300);


  useEffect(() => {
     setFilteredDoctors(doctors)
  }, [doctors]);

    useEffect(() => {
      setFilteredDoctors(
        doctors?.filter((p) =>
          p?.fullname.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
      );
    }, [debouncedSearch]);


  const getDoctors = async () => {
    await dispatch(fetchDoctors());
  };
  useEffect(() => {
    getDoctors();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleOpenDialog = (doctor) => {
    setSelectedDoctor(doctor);
    setAppointmentData((prev) => ({
      ...prev,
      doctor: doctor.id,
    }));
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setAppointmentData({ date: "", time: "", reason: "", doctor: null });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitAppointment = async () => {
    if (
      appointmentData.date === "" ||
      appointmentData.time === "" ||
      appointmentData.reason === ""
    ) {
      toast.error("Please fill in all the fields.");
      return;
    }
    dispatch(
      addNewAppointment({ ...appointmentData, doctor: selectedDoctor?.id })
    );

    toast.success("Appointment Booked Successfully");
    handleCloseDialog();
  };

  const displayedDoctors = filteredDoctors.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
          Our Expert Doctors
      </Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", md: "center" }}
        mb={5}
        flexWrap="wrap"
      >
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            width: { xs: "100%", sm: "300px" },
            backgroundColor: "#fff",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <Stack
          direction="row"
          spacing={2}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={() => {
              getDoctors();
            }}
            fullWidth={true}
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
              },
            }}
          >
            Refresh
          </Button>
        </Stack>
      </Stack>

      <Grid
        container
        spacing={4}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {isLoading
          ? [...Array(6)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    width: 300,
                    height: 350,
                    borderRadius: 4,
                    padding: 2,
                    boxShadow: 3,
                  }}
                >
                  <Skeleton
                    variant="circular"
                    width={70}
                    height={70}
                    sx={{ mx: "auto", mb: 2 }}
                  />
                  <Skeleton
                    variant="text"
                    height={30}
                    width="60%"
                    sx={{ mx: "auto", mb: 1 }}
                  />
                  <Skeleton
                    variant="text"
                    height={20}
                    width="40%"
                    sx={{ mx: "auto", mb: 2 }}
                  />

                  <Skeleton
                    variant="text"
                    height={20}
                    width="80%"
                    sx={{ mb: 1 }}
                  />
                  <Skeleton
                    variant="text"
                    height={20}
                    width="70%"
                    sx={{ mb: 1 }}
                  />
                  <Skeleton
                    variant="text"
                    height={20}
                    width="90%"
                    sx={{ mb: 1 }}
                  />
                  <Skeleton
                    variant="rectangular"
                    height={36}
                    sx={{ mt: 2, borderRadius: 2 }}
                  />
                </Card>
              </Grid>
            ))
          : displayedDoctors.map((doctor) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={doctor.id}
                width={"300px"}
                height={"350px"}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: 4,
                    boxShadow: 4,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      pt: 3,
                    }}
                  >
                    <Avatar
                      sx={{ bgcolor: "#1976d2", width: 70, height: 70, mb: 2 }}
                    >
                      <LocalHospitalIcon fontSize="large" />
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold">
                      {doctor?.fullname}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                      {doctor.specialization}
                    </Typography>
                  </Box>

                  <CardContent sx={{ px: 3, pt: 0 }}>
                    <Typography variant="body2" gutterBottom>
                      <strong>Qualifications:</strong>{" "}
                      {doctor.qualifications?.join(", ")}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Experience:</strong> {doctor.experience} years
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Consultation Fee:</strong> $
                      {doctor.consultation_fee}
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ mt: 2 }}
                      onClick={() => handleOpenDialog(doctor)}
                    >
                      Book Appointment
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Pagination
          count={Math.ceil(doctors.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          size={isSmallScreen ? "small" : "medium"}
          shape="rounded"
        />
      </Box>

      {/* Appointment Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Book Appointment with <strong>{selectedDoctor?.name}</strong>
        </DialogTitle>
        <DialogContent dividers>
          <Box display="flex" flexDirection="column" gap={2} py={1}>
            <TextField
              label="Appointment Date"
              type="date"
              name="date"
              value={appointmentData.date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Preferred Time"
              type="time"
              name="time"
              value={appointmentData.time}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Reason for Visit"
              name="reason"
              value={appointmentData.reason}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitAppointment}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PatientDoctors;
