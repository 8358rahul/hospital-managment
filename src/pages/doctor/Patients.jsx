import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  Chip,
  Dialog,
  DialogContent,
  DialogActions,
  Container,
  IconButton,
  Stack,
  Skeleton,
  Popover,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import AddPatientForm from "../admin/AddPatientForm";
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";
import ShareIcon from "@mui/icons-material/Share";
import { useAppSelector } from "../../app/hooks";
import {
  allPatients,
  fetchAllPatients,
  fetchPatients,
  selectAllPatients,
  selectPatientStatus,
} from "../../features/patient/patientSlice";
import { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShareReportForm from "../../components/doctor/ShareReportForm";
import { useDebounce } from "../../app/useDebounce";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ArticleIcon from "@mui/icons-material/Article";

const DoctorPatients = () => {
  const dispatch = useDispatch();
  const patients = useAppSelector(selectAllPatients);
  const allpatients = useAppSelector(allPatients);
  const [search, setSearch] = useState("");
  const [localPatients, setLocalPatients] = useState([]);
  const status = useAppSelector(selectPatientStatus);
  const [openDialog, setOpenDialog] = useState(false);
  const [shareDialog, setShareDialog] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [selectedPatientStatus, setSelectedPatientStatus] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const navigation = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [allList, setAllList] = useState(false);
  useEffect(() => {
    setLocalPatients(
      patients.filter((p) =>
        p.fullname.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    );
  }, [debouncedSearch]);

  // Fetch patients on mount
  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  useEffect(() => {
    if (allList) setLocalPatients(allpatients);
    else setLocalPatients(patients);
  }, [patients, allpatients, allList]);

  const handleConfirmStatusChange = () => {
    const updated = localPatients.map((p) =>
      p.id === selectedPatientId
        ? {
            ...p,
            status: selectedPatientStatus === "Active" ? "Inactive" : "Active",
          }
        : p
    );
    setLocalPatients(updated);
    setOpenDialog(false);
  };

  const handleCancelStatusChange = () => {
    setOpenDialog(false);
    setSelectedPatientId(null);
    setSelectedPatientStatus("");
  };
  const [addPatientOpen, setAddPatientOpen] = useState(false);

  const handleAddPatient = (newPatient) => {
    const newPatientWithId = {
      ...newPatient,
      id: Date.now(),
      status: "Active",
    };
    setLocalPatients((prev) => [...prev, newPatientWithId]);
    setAddPatientOpen(false);
  };

  const handleRefresh = () => {
    if (allList) dispatch(fetchAllPatients());
    else dispatch(fetchPatients());
  };

  const columns = [
    { field: "fullname", headerName: "Name", flex: 1, minWidth: 130 },
    { field: "email", headerName: "Email", flex: 1.5, minWidth: 160 },
    { field: "gender", headerName: "Gender", width: 120 },
    { field: "blood_type", headerName: "Blood Group", width: 120 },
    { field: "phone", headerName: "Phone", flex: 1, minWidth: 150 },
    { field: "address", headerName: "Address", flex: 2, minWidth: 220 },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 130,
    //   renderCell: (params) => (
    //     <Chip
    //       label={params.value === "Active" ? "Active" : "Inactive"}
    //       size="small"
    //       onClick={() => handleStatusToggle(params.row.id)}
    //       sx={{
    //         backgroundColor: params.value === "Active" ? "#c8e6c9" : "#f8d7da",
    //         color: params.value === "Active" ? "#256029" : "#a94442",
    //         fontWeight: 600,
    //         px: 1.5,
    //         borderRadius: "6px",
    //         fontSize: "0.75rem",
    //         textTransform: "capitalize",
    //         cursor: "pointer",
    //       }}
    //     />
    //   ),
    // },
    !allList && {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      minWidth: 80,
      sortable: false,
      renderCell: (params) => {
        return (
          <IconButton
            alignitems="center"
            justifycontent="center"
            aria-describedby={id}
            variant="contained"
            onClick={(event) => {
              setAnchorEl(event.currentTarget);

              setSelectedPatientId(params?.row?.id);
            }}
          >
            <ShareIcon color="primary" />
          </IconButton>
        );
      },
    },
  ];

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
        Patients Management
      </Typography>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", md: "center" }}
        mb={2}
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
            onClick={handleRefresh}
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
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
                background: "linear-gradient(90deg, #2196f3, #2196f3)",
              },
            }}
            onClick={() => setAddPatientOpen(true)}
          >
            Add Patient
          </Button>
          <Button
            variant="contained"
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
                background: "linear-gradient(90deg, #2196f3, #2196f3)",
              },
            }}
            onClick={() => {
              if (allList) {
                setAllList(false);
                dispatch(fetchPatients());
              } else {
                setAllList(true);
                dispatch(fetchAllPatients());
              }
            }}
          >
            {allList ? "View Patients" : "View All Patients"}
          </Button>
        </Stack>
      </Stack>
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
            rows={localPatients}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 10, page: 0 } },
            }}
            pageSizeOptions={[10]}
            getRowId={(row) => row?.id + new Date().getTime()}
            disableRowSelectionOnClick
            autoHeight
          />
        )}
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCancelStatusChange}
        fullWidth
        maxWidth="xs"
      >
        <DialogContent>
          <Typography>
            Are you sure you want to mark this patient as{" "}
            <strong>
              {selectedPatientStatus === "Active" ? "Inactive" : "Active"}
            </strong>
            ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelStatusChange} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmStatusChange}
            color="primary"
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog
        open={shareDialog}
        onClose={() => setShareDialog(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogContent>
          <ShareReportForm
            patientId={selectedPatientId}
            setShareDialog={setShareDialog}
          />
        </DialogContent>
      </Dialog>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          sx: { p: 2, width: 200 },
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Share Options
        </Typography>

        <Stack spacing={1}>
          <Button
            variant="outlined"
            startIcon={<ReceiptIcon />}
            onClick={() => {
              navigation(`/doctor/sharebill/${selectedPatientId}`);
            }}
            fullWidth
          >
            Share Bill
          </Button>

          <Button
            variant="outlined"
            startIcon={<ArticleIcon />}
            onClick={() => setShareDialog(true)}
            fullWidth
          >
            Share Report
          </Button>
        </Stack>
      </Popover>

      <AddPatientForm
        open={addPatientOpen}
        onClose={() => setAddPatientOpen(false)}
        onSave={handleAddPatient}
      />
    </Box>
  );
};

export default DoctorPatients;
