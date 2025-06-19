import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addNewPatient } from "../../features/patient/patientSlice";
import { toast } from "react-toastify";
import { Formik, Form, Field, FieldArray } from "formik";
import { TextField, Select } from "formik-mui";
import * as Yup from "yup";
import MenuItem from "@mui/material/MenuItem";

const initialValues = {
  fullname: "",
  email: "",
  password: "",
  birth_date: "",
  phone: "",
  blood_type: "",
  gender: "",
  address: "",
  role: "patient",
};

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const genders = ["Male", "Female", "Other"];

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  birth_date: Yup.date().required("Birth date is required"),
  phone: Yup.string().required("Phone is required"),
  blood_type: Yup.string().required("Blood type is required"),
  gender: Yup.string().required("Gender is required"),
  address: Yup.string().required("Address is required"),
});
 
const AddPatientForm = ({ open, onClose, token }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(
        addNewPatient({
          newPatient: values,
          token,
        })
      );
      toast.success("Patient Added Successfully");
      onClose();
    } catch (error) {
      console.error("Failed to add patient:", error);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Patient</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
         validateOnMount
      >
        {({ isSubmitting }) => (
          <Form>
            <DialogContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1, }}>
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
                />
                <Field
                  component={TextField}
                  name="password"
                  label="Password"
                  fullWidth
                  margin="normal"
                  required
                />
                <Field
                  component={TextField}
                  name="birth_date"
                  label="Birth Date"
                  fullWidth
                  margin="normal"
                  required
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Field
                  component={TextField}
                  name="phone"
                  label="Phone Number"
                  fullWidth
                  margin="normal"
                  required
                />

                <Field
                  component={Select}
                  name="blood_type"
                  label="Blood Type"
                  fullWidth
                  margin="normal"
                >
                  {bloodGroups.map((i) => (
                    <MenuItem key={i} value={i}>
                      {i}
                    </MenuItem>
                  ))}
                </Field>
                <Field
                  component={Select}
                  name="gender"
                  label="Gender"
                  fullWidth
                  margin="normal"
                >
                  {genders.map((i) => (
                    <MenuItem key={i} value={i}>
                      {i}
                    </MenuItem>
                  ))}
                </Field>

                <Field
                  component={TextField}
                  name="address"
                  label="Address"
                  fullWidth
                  margin="normal"
                  required
                  multiline
                  rows={3}
                />
              </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button
                onClick={onClose}
                variant="contained"
                sx={{
                  backgroundColor: "#e0e0e0",
                  color: "#333",
                  borderRadius: "6px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#d5d5d5",
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isSubmitting}
                sx={{
                  borderRadius: "6px",
                  textTransform: "none",
                }}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};


export default AddPatientForm;
