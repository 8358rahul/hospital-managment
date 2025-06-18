import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUserDetail, shareReport } from "../../features/doctor/doctorSlice";
import { toast } from "react-toastify";

const ShareReportForm = ({ patientId, setShareDialog }) => {
    const user = useAppSelector(selectUserDetail);

  const [report, setReport] = useState({ 
    document_type: "lab",
    content: "",
    document: [""],
    appointment: user?.id
  });

  const dispatch = useAppDispatch();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).map((file) => file.name);
    setReport((prev) => ({ ...prev, document: files }));
  };

 

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const resultAction = await dispatch(
      shareReport({ ...report, id:patientId })
    );

    if (shareReport.rejected.match(resultAction)) {
      // ❌ Handle the error (e.g., show toast or dialog)
      console.error("Error:", resultAction.payload); 
      toast.error("Failed to share report: " +resultAction.payload?.detail);
    } else {
      // ✅ Success
      setShareDialog(false);
      setReport({
        document_type: "lab",
        content: "",
        document: [""],
        appointment: "",
      });
    }
  } catch (error) {
    console.error("Unexpected Error:", error);
  }
};


  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Share New Report with Patient
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2} direction="column">
            {/* <Grid item xs={12}>
              <TextField
                fullWidth
                label="Report Title"
                value={report.title}
                onChange={(e) =>
                  setReport({ ...report, title: e.target.value })
                }
                required
              />
            </Grid> */}

            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Report Type</InputLabel>
                <Select
                  value={report.type}
                  label="Report Type"
                  onChange={(e) =>
                    setReport({ ...report, type: e.target.value })
                  }
                >
                  <MenuItem value="lab">Lab Results</MenuItem>
                  <MenuItem value="diagnostic">Diagnostic Report</MenuItem>
                  <MenuItem value="prescription">Prescription</MenuItem>
                  <MenuItem value="summary">Visit Summary</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Report Content"
                multiline
                rows={4}
                value={report.content}
                onChange={(e) =>
                  setReport({ ...report, content: e.target.value })
                }
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="outlined" component="label" fullWidth>
                Upload Attachment(s)
                <input
                  type="file"
                  hidden
                  multiple
                  onChange={handleFileChange}
                />
              </Button>
              {report.document?.length > 0 &&
                report?.document.map((file, idx) => (
                  <Typography key={idx} variant="body2" mt={0.5}>
                    📎 {file}
                  </Typography>
                ))}
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Share Report
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ShareReportForm;
