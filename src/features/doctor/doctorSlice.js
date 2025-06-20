import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";

const initialState = {
  doctors: [],
  user: {},
  status: "idle",
  error: null,
  appointments: [],
};

export const fetchUserDetail = createAsyncThunk(
  "doctors/fetchUserDetail",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/accounts/profile/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchAppointmentById = createAsyncThunk(
  "appoinments/fetchAppointmentById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/appointments/by-patient/${id}/`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchDoctors = createAsyncThunk(
  "doctors/fetchDoctors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/appointments/doctor-list/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateDoctor = createAsyncThunk(
  "doctors/updateDoctor",
  async (updatedDoctor, { rejectWithValue, dispatch }) => {
    try {
      await API.patch("accounts/doctor/doctor_update_profile/", updatedDoctor);
      dispatch(fetchUserDetail());
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const addDoctor = createAsyncThunk(
  "doctors/addDoctor",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      await API.post("adminpanel/admin/create-doctor/", data);
      dispatch(fetchDoctors());
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const createBill = createAsyncThunk(
  "doctors/createBill",
  async (data, { rejectWithValue }) => {
    try {
      await API.post("/billing/create/", data); 
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const shareReport = createAsyncThunk(
  "doctors/shareReport",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // Append all fields
      for (const key in data) {
        const value = data[key];

        if (key === "document" && Array.isArray(value)) {
          value.forEach((file) => {
            formData.append("document", file); // real File object
          });
        } else if (
          value !== undefined &&
          value !== null &&
          key !== "appointment"
        ) {
          formData.append(key, value);
        }
      }

      const result = await API.post(
        `appointments/send-report-to-patient/${data.appointment}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(result);

      return result.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch fetchUserDetail
      .addCase(fetchUserDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserDetail.rejected, (state, action) => {
        state.status = "failed";
      })

      // Fetch doctors
      .addCase(fetchDoctors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.doctors = action.payload?.results;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.status = "failed";
      })

      // Share report
      .addCase(shareReport.pending, (state) => {
        state.status = "loading";
      })
      .addCase(shareReport.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.doctors = action.payload?.results;
      })
      .addCase(shareReport.rejected, (state, action) => {
        state.status = "failed";
      })

      // patient appoinment
      .addCase(fetchAppointmentById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAppointmentById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.appointments = action.payload;
      })
      .addCase(fetchAppointmentById.rejected, (state, action) => {
        state.status = "failed";
      })
      // create bill  
      .addCase(createBill.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBill.fulfilled, (state, action) => {
        state.status = "succeeded"; 
      })
      .addCase(createBill.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const {} = doctorSlice.actions;

export const selectAllDoctors = (state) => state.doctors.doctors;
export const selectUserDetail = (state) => {
  return state.doctors.user;
};
export const selectAppointments = (state) => state.doctors.appointments;
export const selectDoctorStatus = (state) => state.doctors.status;
export const selectDoctorError = (state) => state.doctors.error;
export const selectDoctorById = (state, id) =>
  state.doctors.doctors.find((doctor) => doctor.id === id);

export default doctorSlice.reducer;
