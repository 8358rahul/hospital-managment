import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Typography,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectUserDetail,
  shareReport,
  fetchAppointmentById,
  selectAppointments,
} from "../../features/doctor/doctorSlice";
import { toast } from "react-toastify";
import { Formik, Form, Field, FieldArray } from "formik";
import { TextField, Select } from "formik-mui";
import * as Yup from "yup";
import MenuItem from "@mui/material/MenuItem";

const ShareReportForm = ({ patientId, setShareDialog }) => { 
  const dispatch = useAppDispatch(); 
  const initialValues = {
    document_type: "lab",
    content: "",
    document: [""],
    appointment: "",
  };

  const validationSchema = Yup.object({
    document_type: Yup.string().required("Required"),
    content: Yup.string().required("Required"),
    document: Yup.array().min(1, "Please upload at least one file"),
    appointment: Yup.string().required("Required"),
  });

  const appoinments = useAppSelector(selectAppointments);

  useEffect(() => {
    dispatch(fetchAppointmentById(patientId));
  }, [patientId]);

  const handleSubmit = async (values, { setSubmitting }) => { 
     const resultAction = await dispatch(shareReport(values)); 
    if (shareReport.rejected.match(resultAction)) {
      console.error("Error:", resultAction.payload);
      toast.error("Failed to share report: " + resultAction.payload?.detail);
    } else {
      toast.success("Report shared successfully!");
      setShareDialog(false);
    }
  };

  return (
    <Card variant="outlined">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnMount
      >
        {({ isSubmitting }) => (
          <Form>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Share New Report with Patient
              </Typography> 
                <Grid container spacing={2} direction="column">
                  <Field
                    component={Select}
                    name="appointment"
                    label="Appoinment"
                    required
                    fullWidth
                  >
                    {appoinments.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.reason}
                      </MenuItem>
                    ))}
                  </Field>
                  <Field
                    component={Select}
                    name="document_type"
                    label="Report Type"
                    fullWidth
                    required
                  > 
                    <MenuItem value="medical_record">Medical Record</MenuItem>
                    <MenuItem value="report">Report</MenuItem>
                    <MenuItem value="receipt">Receipt</MenuItem>
                  </Field>

                  <Field
                    component={TextField}
                    name="content"
                    label="Content"
                    rows={4}
                    fullWidth
                    margin="normal"
                    required
                  />
                  <Grid item xs={12}>
                    <Field name="document">
                      {({ form }) => (
                        <>
                          <Button
                            variant="outlined"
                            component="label"
                            fullWidth
                          >
                            Upload Attachment(s)
                            <input
                              type="file"
                              hidden
                              multiple
                              onChange={(event) => {
                                const files = Array.from(
                                  event.currentTarget.files
                                );
                                form.setFieldValue("document", files);
                              }}
                            />
                          </Button>

                          {/* Show file names if uploaded */}
                          {form.values.document?.length > 0 && (
                            <Box mt={1}>
                              {form.values.document.map((file, idx) => (
                                <Typography key={idx} variant="body2">
                                  📎 {file.name}
                                </Typography>
                              ))}
                            </Box>
                          )}
                        </>
                      )}
                    </Field>
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" fullWidth>
                      Share Report
                    </Button>
                  </Grid>
                </Grid> 
            </CardContent>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default ShareReportForm;
