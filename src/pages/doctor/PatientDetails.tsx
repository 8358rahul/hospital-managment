import { Box, Container } from "@mui/material";
import type { PatientReport } from "../../@types";
import { useAppDispatch } from "../../app/hooks";
import { shareReport } from "../../features/patientReport/patientReportSlice";
import ShareReportForm from "../../components/doctor/ShareReportForm";

 

const PatientDetails = () => {
  // ... existing code ...
  const dispatch = useAppDispatch();

  const handleShareReport = (report: Omit<PatientReport, 'id' | 'isShared'>) => {
    // In a real app, this would be an API call
    const newReport: PatientReport = {
      ...report,
      id: `report-${Date.now()}`,
      isShared: true,
      doctorId: user?.id || '',
      doctorName: user?.name || 'Dr. Unknown'
    };
    dispatch(shareReport(newReport));
  };

  return (
    <Container maxWidth="lg">
      {/* ... existing patient details ... */}
      
      <Box sx={{ mt: 4 }}>
        <ShareReportForm
          patientId={patient.id} 
          onShare={handleShareReport} 
        />
      </Box>

      {/* ... rest of the component ... */}
    </Container>
  );
};