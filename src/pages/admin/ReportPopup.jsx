import React, { useState, useEffect } from 'react';
import {
  Box, Modal, Typography, IconButton,
  FormControl, InputLabel, Select, MenuItem,
  Divider, Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';

const months = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

// Helper to get number of days in a given month/year
const getDaysInMonth = (monthIndex, year) => {
  return new Date(year, monthIndex + 1, 0).getDate();
};

// Generate weekly data based on days in month
const generateWeeklyDataForMonth = (monthName) => {
  const monthIndex = months.indexOf(monthName);
  const year = new Date().getFullYear();
  const daysInMonth = getDaysInMonth(monthIndex, year);
  const weeks = Math.ceil(daysInMonth / 7); // Approximate 7-day weeks

  const data = [];
  for (let i = 1; i <= weeks; i++) {
    data.push({
      name: `Week ${i}`,
      value: Math.floor(Math.random() * 500) + 100,
    });
  }
  return data;
};

const getDifferenceNote = (data) => {
  const prev = data[data.length - 2]?.value || 0;
  const current = data[data.length - 1]?.value || 0;
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

const ReportPopup = ({ open, onClose, reportType }) => {
  const currentMonthIndex = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(months[currentMonthIndex]);
  const [data, setData] = useState(generateWeeklyDataForMonth(selectedMonth));

  useEffect(() => {
    setData(generateWeeklyDataForMonth(selectedMonth));
  }, [selectedMonth]);

  const { note, isIncrease } = getDifferenceNote(data);

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

        {/* Month Selector */}
        <FormControl fullWidth sx={{ mt: 3, mb: 3 }}>
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

        {/* Chart */}
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#1976d2"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Summary */}
        <Divider sx={{ my: 3 }} />
        <Stack spacing={1}>
          <Typography variant="subtitle1" fontWeight="bold">
            Report Type: <span style={{ color: '#1976d2' }}>{reportType}</span>
          </Typography>
          <Typography variant="subtitle2">
            Selected Month: <strong>{selectedMonth}</strong>
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: isIncrease ? 'green' : 'red', fontWeight: 'bold' }}
          >
            {note}
          </Typography>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ReportPopup;
