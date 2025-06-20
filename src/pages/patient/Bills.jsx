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
  Grid,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  fetchBills,
  selectAllBills,
  selectAllBillsStatus,
} from "../../features/billing/billingSlice";
import { selectUserDetail } from "../../features/doctor/doctorSlice";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { useDebounce } from "../../app/useDebounce";

const PatientBills = () => {
  const user = useAppSelector(selectUserDetail);
  // inside component
  const billRef = useRef();
  const bills = useAppSelector(selectAllBills);
  const [selectedBill, setSelectedBill] = useState(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const [billsList, setBillsList] = useState([]);
  const status = useAppSelector(selectAllBillsStatus);
  const debouncedSearch = useDebounce(search, 300); 
    useEffect(() => {
      setBillsList(
        bills?.filter((p) =>{
          
          return p?.payment_method.toLowerCase().includes(debouncedSearch.toLowerCase())

        }
        )
      );
    }, [debouncedSearch]);




  const handleViewDetails = (bill) => {
    setSelectedBill(bill);
    setOpen(true);
  };

  useEffect(() => {
    setBillsList(bills);
  }, [bills]);

  const getBills = () => {
    dispatch(fetchBills());
  };

  useEffect(() => {
    getBills();
  }, [dispatch]);
  const handleClose = () => {
    setOpen(false);
    setSelectedBill(null);
  };

  const handleDownload = async () => {
    if (!billRef.current) return;

    const canvas = await html2canvas(billRef.current, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Bill-${selectedBill?.id || "Unknown"}.pdf`);
  };

  const columns = [
    { field: "date", headerName: "Date", width: 220 },
    {
      field: "total_amount",
      headerName: "Amount",
      width: 250,
      valueFormatter: (params) => `$${params}`,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => (
        <Chip
          label={params.value}
          sx={{
            backgroundColor:
              params.value === "paid"
                ? "success.main"
                : params.value === "pending"
                ? "warning.main"
                : "error.main",
            color: "white",
            borderRadius: "16px",
            fontWeight: "bold",
            padding: "0 8px",
          }}
        />
      ),
    },
    { field: "payment_method", headerName: "Payment Method", width: 220 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleViewDetails(params.row)}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Bills
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
          placeholder="Search by payment method"
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
              getBills();
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
            rows={billsList}
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

      {/* Styled Bill Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
          Hospital Bill
        </DialogTitle>
        <DialogContent>
          {selectedBill && (
            <Paper sx={{ p: 3, border: "1px solid #ccc" }} ref={billRef}>
              <Box sx={{ mb: 2, textAlign: "center" }}>
                <Typography variant="h6">Sunrise Medical Center</Typography>
                <Typography variant="body2">
                  123 Health Lane, Wellness City
                </Typography>
                <Typography variant="body2">Phone: (123) 456-7890</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box>
                <Typography variant="body1">
                  <strong>Patient Name:</strong> {user?.fullname}
                </Typography>
                <Typography variant="body1">
                  <strong>Gender:</strong> {user?.gender || "N/A"}
                </Typography>
                <Typography variant="body1">
                  <strong>Blood Group:</strong> {user?.blood_type || "N/A"}
                </Typography>
                <Typography variant="body1">
                  <strong>Bill Date:</strong> {selectedBill.date}
                </Typography>
                <Typography variant="body1">
                  <strong>Bill ID:</strong> #{selectedBill.id}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box>
                <Typography variant="body1">
                  <strong>Service Description:</strong>
                </Typography>
                <Box sx={{ ml: 2 }}>
                  {selectedBill.items?.map((item, index) => (
                    <div
                      key={index}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Grid container spacing={8}>
                        <Grid item xs={12} sm={6}>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                          >
                            Description
                          </Typography>
                          <Typography variant="body1">
                            {item.description}
                          </Typography>
                        </Grid>

                        <Grid item xs={4} sm={2}>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                          >
                            Qty
                          </Typography>
                          <Typography variant="body1">
                            {item.quantity}
                          </Typography>
                        </Grid>

                        <Grid item xs={4} sm={2}>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                          >
                            Unit Price
                          </Typography>
                          <Typography variant="body1">
                            ₹ {item.unit_price}
                          </Typography>
                        </Grid>

                        <Grid item xs={4} sm={2}>
                          <Typography
                            variant="subtitle2"
                            color="text.secondary"
                          >
                            Amount
                          </Typography>
                          <Typography variant="body1">
                            ₹ {item.amount}
                          </Typography>
                        </Grid>
                      </Grid>
                    </div>
                  ))}
                </Box>

                <Typography variant="body1" sx={{ mt: 2 }}>
                  <strong>Payment Method:</strong> {selectedBill.payment_method}
                </Typography>

                <Typography variant="body1">
                  <strong>Status:</strong> {selectedBill.status}
                </Typography>

                <Typography variant="body1" sx={{ mt: 1 }}>
                  <strong>Total Amount:</strong> ${selectedBill.total_amount}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="body2"
                sx={{ textAlign: "center", color: "gray" }}
              >
                This is a computer-generated bill and does not require a
                signature.
              </Typography>
            </Paper>
          )}
        </DialogContent>

        <DialogActions sx={{ justifyContent: "space-between", px: 3 }}>
          <Button onClick={handleClose}>Close</Button>
          <Button variant="contained" color="primary" onClick={handleDownload}>
            Download Bill
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PatientBills;
