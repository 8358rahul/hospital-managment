import React, { useState, useEffect } from 'react';
import {
  Box, Modal, Typography, IconButton,
  FormControl, InputLabel, Select, MenuItem,
  Divider, Stack, CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAdminWeekwiseReport,
  selectAdminReportData,
  selectAdminReportStatus,
  selectAdminReportError,
  resetAdminReportState
} from '../../features/adminDashboard/adminReportSlice';

// Month names
const months = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

// Helper to get report key based on type
const getReportKey = (type) => {
  const key = type?.toLowerCase();
  if (key.includes('patient')) return 'patient_report';
  if (key.includes('appointment')) return 'appointment_report';
  return null;
};

// Generate years (past N years)
const generateYearOptions = (range = 5) => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: range }, (_, i) => currentYear - i);
};

const ReportPopup = ({ open, onClose, reportType }) => {
  const dispatch = useDispatch();

  const currentMonthIndex = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(months[currentMonthIndex]);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const numericMonth = months.indexOf(selectedMonth) + 1;

  const token = useSelector((state) => state.auth.token);
  const data = useSelector(selectAdminReportData);
  const status = useSelector(selectAdminReportStatus);
  const error = useSelector(selectAdminReportError);

  const reportKey = getReportKey(reportType);
  const reportData = reportKey && data?.[reportKey] ? data[reportKey] : { weekly_data: [] };

  useEffect(() => {
    if (open && token) {
      dispatch(fetchAdminWeekwiseReport({ token, month: numericMonth, year: selectedYear }));
    }
    return () => {
      dispatch(resetAdminReportState());
    };
  }, [selectedMonth, selectedYear, token, dispatch, open]);

  const getDifferenceNote = () => {
    const weekly = reportData?.weekly_data || [];
    if (weekly.length < 2) return { note: '', isIncrease: true };

    const prev = weekly[weekly.length - 2]?.count || 0;
    const current = weekly[weekly.length - 1]?.count || 0;
    const diff = current - prev;
    const isIncrease = diff >= 0;
    const percent = ((Math.abs(diff) / (prev || 1)) * 100).toFixed(1);

    return {
      note: isIncrease
        ? `↑ Increased by ${percent}% compared to previous week`
        : `↓ Decreased by ${percent}% compared to previous week`,
      isIncrease,
    };
  };

  const { note, isIncrease } = getDifferenceNote();

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: 750,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: { xs: 2, sm: 4 },
        outline: 'none',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight="bold">{reportType} Report</Typography>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Box>

        {/* Month and Year Selector */}
        <Box sx={{ display: 'flex', gap: 2, mt: 3, mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Select Month</InputLabel>
            <Select
              value={selectedMonth}
              label="Select Month"
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {months.map((month) => (
                <MenuItem key={month} value={month}>{month}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Select Year</InputLabel>
            <Select
              value={selectedYear}
              label="Select Year"
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {generateYearOptions(10).map((year) => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Chart */}
        {status === 'loading' ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" textAlign="center">{error}</Typography>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={reportData.weekly_data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#1976d2"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}

        {/* Summary */}
        {reportData?.weekly_data?.length > 0 && (
          <>
            <Divider sx={{ my: 3 }} />
            <Stack spacing={1}>
              <Typography variant="subtitle1" fontWeight="bold">
                Report Type: <span style={{ color: '#1976d2' }}>{reportType}</span>
              </Typography>
              <Typography variant="subtitle2">
                Selected: <strong>{selectedMonth} {selectedYear}</strong>
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: isIncrease ? 'green' : 'red', fontWeight: 'bold' }}
              >
                {note}
              </Typography>
            </Stack>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ReportPopup;
