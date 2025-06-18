import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Chip,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Skeleton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  appointmentsStatus,
  fetchDoctorAppointments,
  selectAppointmentsByDoctor,
} from "../../features/appointment/appointmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { selectUserDetail } from "../../features/doctor/doctorSlice";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { selectPatientStatus } from "../../features/patient/patientSlice";
const DoctorAppointments = () => {
  const dispatch = useAppDispatch();
  const appointments = useAppSelector(selectAppointmentsByDoctor);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const user = useAppSelector(selectUserDetail);
  const status = useAppSelector(selectPatientStatus);

  const handleChipClick = (params) => {
    setSelectedAppointment(params.row);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedAppointment(null);
  };

  useEffect(() => {
    dispatch(fetchDoctorAppointments(user?.id));
  }, [dispatch]);

  const handleUpdateStatus = (newStatus) => {
    const data = {
      status: newStatus,
      id: selectedAppointment.id,
      doctor_id: user?.id,
    };
    dispatch(appointmentsStatus(data));
    toast.success("Status Updated Successfully");
    handleClose();
    // Add real dispatch or API call here
  };

  const columns = [
    { field: "date", headerName: "Date", width: 110 },
    { field: "time", headerName: "Time", width: 100 },
    {
      field: "patient",
      headerName: "Patient",
      flex: 1,
      minWidth: 140,
      valueGetter: (params) => { 
        return  `${params.first_name || ""} ${params.last_name || ""}`.trim()
        
      },
    },

    {
      field: "doctor",
      headerName: "Doctor",
      flex: 1,
      minWidth: 140,
      valueGetter: (params) => { 
                return  `${params.first_name || ""} ${params.last_name || ""}`.trim()

      },
    },
    {
      field: "reason",
      headerName: "Reason",
      flex: 1.2,
      minWidth: 140,
    },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 130,

    //   renderCell: (params) => {
    //     const status = params.value?.toLowerCase();
    //     let color = "",
    //       bg = "";
    //     switch (status) {
    //       case "accepted":
    //         color = "#256029";
    //         bg = "#c8e6c9";
    //         break;
    //       case "pending":
    //         color = "#856404";
    //         bg = "#fff3cd";
    //         break;
    //       case "rejected":
    //         color = "#a94442";
    //         bg = "#f8d7da";
    //         break;
    //       default:
    //         color = "#000";
    //         bg = "#e0e0e0";
    //     }
    //     return (
    //       <Chip
    //         label={status.charAt(0).toUpperCase() + status.slice(1)}
    //         size="small"
    //         sx={{
    //           backgroundColor: bg,
    //           color: color,
    //           fontWeight: 600,
    //           px: 1.5,
    //           borderRadius: "6px",
    //           fontSize: "0.75rem",
    //           textTransform: "capitalize",
    //           cursor: "pointer",
    //         }}
    //       />
    //     );
    //   },
    // },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <MoreVertIcon onClick={() => handleChipClick(params)} />
        </div>
      ),
    },
  ];
  //  const filteredAppointments = appointments?.filter((a) =>
  //    a.patientName?.toLowerCase().includes(search.toLowerCase()) ||
  //    a.doctorName?.toLowerCase().includes(search.toLowerCase())
  //  );

  return (
    <Box
      sx={{
        width: "100%",
        px: { xs: 1, sm: 2, lg: 4 },
        py: 4,
        boxSizing: "border-box",
        maxWidth: "100%",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        sx={{ textAlign: { xs: "center", sm: "left" } }}
      >
        Appointment Management
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          mb: 2,
          flexWrap: "wrap",
        }}
      >
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: { xs: "100%", sm: "300px" }, backgroundColor: "#fff" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box
        sx={{
          width: "100%",
          overflowX: "auto",
          "& .MuiDataGrid-root": {
            backgroundColor: "white",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#ffffff",
            fontWeight: "bold",
            fontSize: "16px",
            borderBottom: "1px solid #e0e0e0",
          },
          "& .MuiDataGrid-columnHeader": {
            borderRight: "1px solid #e0e0e0",
          },
          "& .MuiDataGrid-cell": {
            fontSize: "14px",
            borderRight: "1px solid #e0e0e0",
          },
          "& .MuiDataGrid-row": {
            borderBottom: "1px solid #f0f0f0",
          },
        }}
      >
        {status === "loading" ? (
          <Box>
            {[...Array(10)].map((_, i) => (
              <Skeleton
                key={i}
                height={50}
                sx={{ mb: 1 }}
                variant="rectangular"
              />
            ))}
          </Box>
        ) : (
          <DataGrid
            rows={appointments?.results}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } },
            }}
            pageSizeOptions={[10]}
            getRowId={(row) => row.id}
            autoHeight
            disableRowSelectionOnClick
          />
        )}
      </Box>

      {/* Status Dialog */}
      <Dialog open={openDialog} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Status Options</DialogTitle>
        <DialogContent>
          <Typography variant="body2" gutterBottom>
            Appointment ID: {selectedAppointment?.id}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            Current Status: {selectedAppointment?.status}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between", p: 2 }}>
          {selectedAppointment?.status === "pending" && (
            <>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleUpdateStatus("accepted")}
              >
                Approve
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleUpdateStatus("rejected")}
              >
                Reject
              </Button>
            </>
          )}
          {selectedAppointment?.status === "accepted" && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleUpdateStatus("rejected")}
            >
              Mark as Rejected
            </Button>
          )}
          {selectedAppointment?.status === "rejected" && (
            <Button
              variant="contained"
              color="success"
              onClick={() => handleUpdateStatus("accepted")}
            >
              Re-Approve
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DoctorAppointments;
