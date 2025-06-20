import { Cancel, Save } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Typography,
} from "@mui/material";
import { Field, FieldArray, Form, Formik } from "formik";
import { Select, TextField } from "formik-mui";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  addDoctor,
  selectUserDetail,
  updateDoctor,
} from "../features/doctor/doctorSlice";

// Dummy for dropdown
const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const AddEditDoctorProfile = ({ onGoBack, isEdit = false }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserDetail);

  // Initial values from Redux store
  const initialValues = {
    email: "",
    phone: "",
    address: "",
    fullname: "",
    specialization: "",
    qualifications: [""],
    experience: 0,
    consultation_fee: 0,
    available_days: [],
    available_hours: "",
    password: "",
  };

  const isEditInitialValues = {
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    fullname: user?.fullname || "",
    specialization: user?.specialization || "",
    qualifications: user?.qualifications || [""],
    experience: user?.experience || 0,
    consultation_fee: Number(user?.consultation_fee) || 0,
    available_days: user?.available_days || [],
    available_hours: user?.available_hours || "",
  };

  // Validation Schema
  const profileSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    fullname: Yup.string().required("Required"),
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
    password: !isEdit && Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  const handleSubmit = (values) => {
    console.log("hey", values);
    if (!isEdit) {
      dispatch(addDoctor(values));
    } else {
      dispatch(updateDoctor(values));
    }
    onGoBack();
  };

  return (
    <Box sx={{ p: 4, maxWidth: "900px", mx: "auto" }}>
      <Formik
        initialValues={isEdit ? isEditInitialValues : initialValues}
        validationSchema={profileSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values }) => (
          <Form>
            <Grid container spacing={3}>
              {/* Personal Info */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>

                <Field
                  component={TextField}
                  name="fullname"
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
                  disabled={isEdit}
                />
                {!isEdit && (
                  <Field
                    component={TextField}
                    name="password"
                    label="Password"
                    fullWidth
                    margin="normal"
                    required
                  />
                )}
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

              {/* Professional Info */}
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

              {/* Qualifications */}
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
                      <Button variant="outlined" onClick={() => push("")}>
                        Add Qualification
                      </Button>
                    </Box>
                  )}
                </FieldArray>
              </Grid>

              {/* Availability */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Availability
                </Typography>
                <Field
                  component={Select}
                  name="available_days"
                  label="Available Days"
                  multiple
                  margin="normal"
                  fullWidth
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
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

              {/* Action Buttons */}
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
                    onClick={onGoBack}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Save />}
                    color="success" 
                  >
                    Save Changes
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddEditDoctorProfile;
