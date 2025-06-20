import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  InputAdornment,
  Pagination,
  Skeleton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import AddEditDoctorProfile from "../../components/AddEditDoctorProfile";
import {
  fetchDoctors,
  selectAllDoctors,
  selectDoctorStatus,
} from "../../features/doctor/doctorSlice"; 

const DoctorsManagement = () => {
  const doctors = useAppSelector(selectAllDoctors);
  const status = useAppSelector(selectDoctorStatus);
  

  const [openDialog, setOpenDialog] = useState(false); 
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const handleCancelStatusChange = () => {
    setOpenDialog(false);
  };

  
  const itemsPerPage = 10;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  useEffect(() => {
    const getDoctors = async () => {
      await dispatch(fetchDoctors());
    };
    getDoctors();
  }, []);

 
 
  const handlePageChange = (event, value) => {
    setPage(value);
  };
 
 

  const handleRefresh = () => {
    dispatch(fetchDoctors());
  };
  const columns = [
    { field: "fullname", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1.5, minWidth: 150 },
    {
      field: "specialization",
      headerName: "Specialization",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "experience",
      headerName: "Experience (years)",
      flex: 0.6,
      minWidth: 120,
    },
    { field: "consultation_fee", headerName: "Fee", flex: 0.5, minWidth: 110 },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value === "Active" ? "Active" : "Active"}
          size="small"
          onClick={() => handleStatusToggle(params.row.id)}
          sx={{
            backgroundColor: params.value === "Active" ? "#c8e6c9" : "#c8e6c9",
            color: params.value === "Active" ? "#256029" : "#256029",
            fontWeight: 600,
            px: 1.5,
            borderRadius: "6px",
            fontSize: "0.75rem",
            textTransform: "capitalize",
            cursor: "pointer",
          }}
        />
      ),
    },
  ];
  const filteredDoctors = useMemo(() => {
    return doctors?.filter((doc) =>
      doc.fullname?.toLowerCase().includes(search.toLowerCase())
    );
  }, [doctors, search]);

  const paginatedDoctors = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredDoctors?.slice(startIndex, endIndex);
  }, [filteredDoctors, page]);

  return (
    <Container maxWidth="xl" disableGutters>
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
          Doctors Management
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
              onClick={() => setOpenDialog(true)}
            >
              Add Doctor
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
              backgroundColor: "#cbebe2",
              fontWeight: "bold",
              color: "black",
              fontSize: "18px",
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
              rows={paginatedDoctors}
              columns={columns}
              pageSizeOptions={[10]}
              getRowId={(row) => row.id}
              autoHeight
              sx={{
                backgroundColor: "#fff",
                border: "1px solid #e0e0e0",
                "& .MuiDataGrid-cell": {
                  borderBottom: "1px solid #e0e0e0",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f5f5f5",
                  borderBottom: "1px solid #e0e0e0",
                },
                "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell": {
                  borderRight: "1px solid #e0e0e0",
                },
                "& .MuiDataGrid-columnHeader:last-of-type, & .MuiDataGrid-cell:last-of-type":
                  {
                    borderRight: "none",
                  },
              }}
            />
          )}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Pagination
            count={Math.ceil(paginatedDoctors?.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size={isSmallScreen ? "small" : "medium"}
            shape="rounded"
          />
        </Box>
      </Box>
 

      <Dialog
        open={openDialog}
        onClose={handleCancelStatusChange}
        fullWidth
        maxWidth="md"
      >
        <DialogContent>
          <AddEditDoctorProfile onGoBack={handleCancelStatusChange} isEdit={false}/>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default DoctorsManagement;
