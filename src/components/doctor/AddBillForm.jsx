import React, { useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";

import { useFormik, FieldArray, FormikProvider } from "formik";
import * as Yup from "yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  fetchAppointmentById,
  selectAppointments,
} from "../../features/doctor/doctorSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const AddBillForm = ({ patientId, onGoBack, onSubmitBill }) => {
  const appoinments = useAppSelector(selectAppointments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAppointmentById(patientId));
  }, [patientId]);

  const validationSchema = Yup.object().shape({
    date: Yup.string().required("Date is required"),
    payment_method: Yup.string().required("Payment method is required"),
    appointment: Yup.string().required("Appointment is required"),

    items: Yup.array()
      .of(
        Yup.object().shape({
          description: Yup.string().required("Required"),
          quantity: Yup.number().min(1).required("Required"),
          unit_price: Yup.number().min(1).required("Required"),
        })
      )
      .min(1, "Add at least one item"),
  });

  const paymentData = [
    'cash',
    'card',
    'online',
    'credit_card',

  ]

  const formik = useFormik({
    initialValues: {
      date: "",
      payment_method: "",
      appointment: "",
      items: [{ description: "", quantity: 1, unit_price: 0 }],
    },
    validationSchema,
    onSubmit: (values) => {
      const totalAmount = values.items.reduce(
        (sum, item) => sum + item.quantity * item.unit_price,
        0
      );
      const bill = {
        ...values,
        patient: Number(patientId),
        totalAmount,
        payment_date: values.date,
        date: values.date,

        status: "paid",
      };
      onSubmitBill(bill);
    },
  });

  const { values, errors, touched, handleChange, handleSubmit } = formik;

  return (
    <Paper sx={{ p: 4, maxWidth: 850, mx: "auto", mt: 4 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={onGoBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" ml={1}>
          Create & Share Bill
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <FormControl
            fullWidth
            error={touched.appointment && Boolean(errors.appointment)}
          >
            <InputLabel id="appointment-label">Appointment</InputLabel>
            <Select
              labelId="appointment-label"
              id="appointment"
              name="appointment"
              value={values.appointment}
              onChange={handleChange}
              label="Appointment"
            >
              {appoinments.map((appointment) => (
                <MenuItem key={appointment.id} value={appointment.id}>
                  {`${appointment.date} - ${appointment.reason || "No reason"}`}
                </MenuItem>
              ))}
            </Select>
            {touched.appointment && errors.appointment && (
              <FormHelperText>{errors.appointment}</FormHelperText>
            )}
          </FormControl>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Date"
              type="date"
              name="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={values.date}
              onChange={handleChange}
              error={touched.date && Boolean(errors.date)}
              helperText={touched.date && errors.date}
            />
          </Grid>

          <Grid item xs={12} sm={6} width={200}> 
              <FormControl
            fullWidth
            error={touched.appointment && Boolean(errors.appointment)}
          >
            <InputLabel id="appointment-label">Payment Method</InputLabel>
            <Select
              labelId="appointment-label"
              id="payment_method"
              name="payment_method"
              value={values.payment_method}
              onChange={handleChange}
              label="Payment Method"
            >
              {paymentData.map((i) => (
                <MenuItem key={i} value={i}> 
                {i}
                </MenuItem>
              ))}
            </Select>
            {touched.payment_method && errors.payment_method && (
              <FormHelperText>{errors.payment_method}</FormHelperText>
            )}
          </FormControl>
          </Grid>

          <FormikProvider value={formik}>
            <FieldArray
              name="items"
              render={(arrayHelpers) => (
                <>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      Bill Items
                    </Typography>
                  </Grid>

                  {values.items.map((item, index) => (
                    <Grid item xs={12} key={index}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={5}>
                          <TextField
                            label="Description"
                            name={`items[${index}].description`}
                            fullWidth
                            value={item.description}
                            onChange={handleChange}
                            error={
                              touched.items?.[index]?.description &&
                              Boolean(errors.items?.[index]?.description)
                            }
                            helperText={
                              touched.items?.[index]?.description &&
                              errors.items?.[index]?.description
                            }
                          />
                        </Grid>

                        <Grid item xs={12} sm={2}>
                          <TextField
                            label="Qty"
                            type="number"
                            name={`items[${index}].quantity`}
                            fullWidth
                            value={item.quantity}
                            onChange={handleChange}
                            error={
                              touched.items?.[index]?.quantity &&
                              Boolean(errors.items?.[index]?.quantity)
                            }
                            helperText={
                              touched.items?.[index]?.quantity &&
                              errors.items?.[index]?.quantity
                            }
                          />
                        </Grid>

                        <Grid item xs={12} sm={3}>
                          <TextField
                            label="Unit Price"
                            type="number"
                            name={`items[${index}].unit_price`}
                            fullWidth
                            value={item.unit_price}
                            onChange={handleChange}
                            error={
                              touched.items?.[index]?.unit_price &&
                              Boolean(errors.items?.[index]?.unit_price)
                            }
                            helperText={
                              touched.items?.[index]?.unit_price &&
                              errors.items?.[index]?.unit_price
                            }
                          />
                        </Grid>

                        <Grid item xs={12} sm={2}>
                          <Stack direction="row" spacing={1}>
                            <IconButton
                              color="success"
                              onClick={() =>
                                arrayHelpers.insert(index + 1, {
                                  description: "",
                                  quantity: 1,
                                  unit_price: 0,
                                })
                              }
                            >
                              <AddCircleOutlineIcon />
                            </IconButton>
                            {values.items.length > 1 && (
                              <IconButton
                                color="error"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <RemoveCircleOutlineIcon />
                              </IconButton>
                            )}
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </>
              )}
            />
          </FormikProvider>

          <Grid item xs={12} mt={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Share Bill
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AddBillForm;
