import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  Pagination,
  Skeleton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import SearchIcon from "@mui/icons-material/Search";
import {
  fetchDoctors,
  selectAllDoctors,
  selectDoctorStatus,
  selectUserDetail,
} from "../../features/doctor/doctorSlice";
 
import { toast } from "react-toastify";
import { useDebounce } from "../../app/useDebounce";
import { addNewAppointment } from "../../features/appointment/appointmentSlice";
import * as Yup from "yup"; 
import { Form, Formik } from "formik";

const PatientDoctors = () => {
  const doctors = useAppSelector(selectAllDoctors);
  const user = useAppSelector(selectUserDetail);
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [search, setSearch] = useState("");
  const isLoading = useAppSelector(selectDoctorStatus) === "loading";

  const appointmentSchema = Yup.object().shape({
    date: Yup.string().required("Date is required"),
    time: Yup.string().required("Time is required"),
    reason: Yup.string().required("Reason is required"),
  });

  const itemsPerPage = 6;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useAppDispatch();
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    setFilteredDoctors(doctors);
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

  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
                      onClick={() => {
                        setSelectedDoctor(doctor); 
                        setOpenDialog(true);
                      }}
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
          Book Appointment with <strong>{selectedDoctor?.fullname}</strong>
        </DialogTitle>
        <DialogContent dividers>
          <Formik
            initialValues={{
              date: "",
              time: "",
              reason: "",

            }}
            validationSchema={appointmentSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              dispatch(
                addNewAppointment({
                  ...values,
                  doctor: selectedDoctor?.id,
                  patient: user.id,
                })
              );
              toast.success("Appointment Booked Successfully");
              handleCloseDialog();
              resetForm();
              setSubmitting(false);
            }}
          >
            {({
              values,
              handleChange,
              errors,
              touched,
              handleBlur,
              isSubmitting,
            }) => (
              <Form>
                <DialogContent dividers>
                  <Box display="flex" flexDirection="column" gap={2} py={1}>
                    <TextField
                      label="Appointment Date"
                      type="date"
                      name="date"
                      value={values.date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.date && Boolean(errors.date)}
                      helperText={touched.date && errors.date}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                    />
                    <TextField
                      label="Preferred Time"
                      type="time"
                      name="time"
                      value={values.time}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.time && Boolean(errors.time)}
                      helperText={touched.time && errors.time}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                    />
                    <TextField
                      label="Reason for Visit"
                      name="reason"
                      value={values.reason}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.reason && Boolean(errors.reason)}
                      helperText={touched.reason && errors.reason}
                      multiline
                      rows={3}
                      fullWidth
                    />
                  </Box>
                </DialogContent>

                <Box display="flex" justifyContent="flex-end" p={2}>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Book Appointment
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitAppointment}>
            Confirm
          </Button>
        </DialogActions> */}
      </Dialog>
    </Container>
  );
};

export default PatientDoctors;
