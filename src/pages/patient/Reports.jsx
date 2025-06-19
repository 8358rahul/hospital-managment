import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Divider,
  Paper,
  Stack,
  TextField,
  InputAdornment,
  Skeleton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchReport,
  selectPatientReports,
  selectReportStatus,
} from "../../features/patientReport/patientReportSlice";

import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { toast } from "react-toastify"; 
import axios from "axios"; 


const PatientReports = () => {   
  const reports = useAppSelector(selectPatientReports);
  const [search, setSearch] = useState("");
  const status = useAppSelector(selectReportStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getReport();
  }, []);

  const getReport = async () => {
    try {
      const resultAction = await dispatch(fetchReport());
      if (fetchReport.fulfilled.match(resultAction)) {
      } else {
        console.error("Failed to fetch report:", resultAction.payload);
        toast.error("Failed to fetch report");
      }
    } catch (err) {
      console.error("Error dispatching fetchReport", err);
    }
  };

 

 

const downloadFile = async (filePath, fileName = "report") => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}${filePath}`,
      {
        responseType: "blob", // Important for binary data
      }
    );

    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);

    // Get file extension
    const ext = filePath.split(".").pop();
    const fullFileName = `${fileName}.${ext}`;

    // Create a temporary link and click it
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fullFileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Download error", err);
    toast.error("Failed to download report");
  }
};


  const columns = [
    { field: "created_at", headerName: "Date", width: 220 ,

   
    },
    {
      field: "document_type",
      headerName: "Report",
      width: 150,
      valueFormatter: (params) => `${params}`,
    },

    { field: "content", headerName: "Description", width: 250 },
    {field:"document",headerName:"File",width:220},
    {
      field: "actions",
      headerName: "Actions",
      width: 220,
      renderCell: (params) => (
        <Box>
          <Button
            variant="outlined"
            size="small"
            sx={{ ml: 1 }}
            onClick={() => {
              downloadFile(params.row.document, `report_${params.row.id}`);
            }}
          >
            Download Report
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Reports
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
            onClick={() => {
              getReport();
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
            rows={reports}
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
    </Box>
  );
};

export default PatientReports;
