import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Edit, Save, Cancel } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Formik, Form, Field, FieldArray } from "formik";
import { TextField, Select } from "formik-mui";
import MenuItem from "@mui/material/MenuItem";
import * as Yup from "yup";
import { 
  selectUserDetail,
  updateDoctor,
} from "../../features/doctor/doctorSlice"; 
import { selectCurrentRole } from "../../features/auth/authSlice";

// Validation Schema
const profileSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  first_name: Yup.string().required("Required"),
  specialization: Yup.string().required("Required"),
  qualifications: Yup.array()
    .of(Yup.string().required("Qualification cannot be empty"))
    .min(1, "At least one qualification is required"),
  experience: Yup.number()
    .positive("Must be positive")
    .integer("Must be integer")
    .required("Required"),
  consultation_fee: Yup.number()
    .positive("Must be positive")
    .required("Required"),
  available_days: Yup.array()
    .min(1, "Select at least one day")
    .required("Required"),
  available_hours: Yup.string().required("Required"),
});

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false); 
  const user = useAppSelector(selectUserDetail);
  const role = useAppSelector(selectCurrentRole)
  const dispatch = useAppDispatch();
 
  // Initial values from Redux store
  const initialValues = {
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    first_name: `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim(),
    specialization: user?.specialization || "",
    qualifications: user?.qualifications || [""],
    experience: user?.experience || 0,
    consultation_fee: Number(user?.consultation_fee) || 0,
    available_days: user?.available_days || [],
    available_hours: user?.available_hours || "",
  }; 
 
 
 
  const handleSubmit = (values) => { 
    dispatch(updateDoctor(values));
    setIsEditing(false);
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
            {!isEditing ? (
              // View Mode
              <Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <IconButton onClick={() => setIsEditing(true)}>
                    <Edit />
                  </IconButton>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      Personal Information
                    </Typography>
                    <Typography>
                      <strong>Name:</strong> {`${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim()}
                    </Typography>
                    <Typography>
                      <strong>Experience:</strong> {user?.experience} years
                    </Typography>
                    <Typography>
                      <strong>Consultation Fee:</strong> $
                      {user?.consultation_fee}
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
            ) : (
              // Edit Mode
              <Formik
                initialValues={initialValues}
                validationSchema={profileSchema}
                onSubmit={handleSubmit}
                enableReinitialize
              >
                {({ values, isSubmitting, isValid, dirty,touched,errors }) => { 
                  return (
                    <Form>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="h6" gutterBottom>
                            Personal Information
                          </Typography>

                          <Field
                            component={TextField}
                            name="first_name"
                            label="Full Name"
                            fullWidth
                            margin="normal"
                            required
                          />

                          <Field
                            component={TextField}
                            name="email"
                            label="Email"
                            fullWidth
                            margin="normal"
                            required
                            disabled // Email shouldn't be editable
                          />
                          <Field
                            component={TextField}
                            name="phone"
                            label="Phone"
                            fullWidth
                            margin="normal"
                            required
                          />
                          <Field
                            component={TextField}
                            name="address"
                            label="Address"
                            fullWidth
                            margin="normal"
                            required
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Typography variant="h6" gutterBottom>
                            Professional Information
                          </Typography>

                          <Field
                            component={TextField}
                            name="specialization"
                            label="Specialization"
                            fullWidth
                            margin="normal"
                            required
                          />

                          <Field
                            component={TextField}
                            name="experience"
                            label="Experience (years)"
                            type="number"
                            fullWidth
                            margin="normal"
                            required
                          />

                          <Field
                            component={TextField}
                            name="consultation_fee"
                            label="Consultation Fee ($)"
                            type="number"
                            fullWidth
                            margin="normal"
                            required
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Typography variant="h6" gutterBottom>
                            Qualifications
                          </Typography>
                          <FieldArray name="qualifications">
                            {({ push, remove }) => (
                              <Box>
                                {values.qualifications.map((_, index) => (
                                  <Box
                                    key={index}
                                    sx={{ display: "flex", gap: 2, mb: 2 }}
                                  >
                                    <Field
                                      component={TextField}
                                      name={`qualifications.${index}`}
                                      label={`Qualification ${index + 1}`}
                                      fullWidth
                                      required
                                    />
                                    {index > 0 && (
                                      <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => remove(index)}
                                      >
                                        Remove
                                      </Button>
                                    )}
                                  </Box>
                                ))}
                                <Button
                                  variant="outlined"
                                  onClick={() => push("")}
                                >
                                  Add Qualification
                                </Button>
                              </Box>
                            )}
                          </FieldArray>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Typography variant="h6" gutterBottom>
                            Availability
                          </Typography>

                          <Field
                            component={Select}
                            name="available_days"
                            label="Available Days"
                            multiple
                            fullWidth
                            margin="normal"
                            renderValue={(selected) => (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 0.5,
                                }}
                              >
                                {selected.map((value) => (
                                  <Chip key={value} label={value} />
                                ))}
                              </Box>
                            )}
                          >
                            {daysOfWeek.map((day) => (
                              <MenuItem key={day} value={day}>
                                {day}
                              </MenuItem>
                            ))}
                          </Field>

                          <Field
                            component={TextField}
                            name="available_hours"
                            label="Available Hours (e.g., 9:00 AM - 5:00 PM)"
                            fullWidth
                            margin="normal"
                            required
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Divider sx={{ my: 2 }} />
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                              gap: 2,
                            }}
                          >
                            <Button
                              variant="outlined"
                              startIcon={<Cancel />}
                              onClick={() => setIsEditing(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              variant="contained"
                              startIcon={<Save />}
                            //   disabled={isSubmitting || !isValid || !dirty}
                            >
                              Save Changes
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Form>
                  );
                }}
              </Formik>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Profile;
