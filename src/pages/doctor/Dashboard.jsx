import React, { useEffect } from "react";
import { Box, Card, Grid, Typography, Avatar } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import EventNoteIcon from "@mui/icons-material/EventNote";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import dashboardBg from "../../assets/dashboard.jpg";
import { fetchDoctor } from "../../features/doctor/doctorSlice";
import { useAppDispatch } from "../../app/hooks";

const totalDoctors = 12;
const totalPatients = 58;
const totalAppointments = 25;
const totalRequests = 7;

const dashboardItems = [
  {
    title: "Total Appointments",
    count: totalAppointments,
    icon: <EventNoteIcon fontSize="large" />,
    color: "#1976d2",
  },
  {
    title: "Total Patients",
    count: totalPatients,
    icon: <PeopleIcon fontSize="large" />,
    color: "#4caf50",
  },
  {
    title: "Total Requests",
    count: 25,
    icon: <HelpOutlineIcon fontSize="large" />,
    color: "#ed6c02",
  },
];

const DashboardCard = ({ title, count, icon, color }) => {
  return (
    <Card
      sx={{
        height: "100%",
        px: 3,
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: 4,
        borderRadius: 3,
        textAlign: "center",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
        width: "250px",
      }}
    >
      <Avatar sx={{ bgcolor: color, width: 70, height: 70, mb: 2 }}>
        {icon}
      </Avatar>
      <Typography variant="subtitle1" fontWeight="600" color="text.secondary">
        {title}
      </Typography>
      <Typography
        variant="h5"
        fontWeight="bold"
        mt={1}
        sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
      >
        {count}
      </Typography>
    </Card>
  );
};

const COLORS = ["#ff9800", "#4caf50", "#1976d2", "#d32f2f", "#00acc1"];

const DoctorDashboard = () => {
  const reports = [
    {
      title: "Patient Report",
      data: [
        { name: "Week 1", Last: 20, Current: 25 },
        { name: "Week 2", Last: 30, Current: 35 },
        { name: "Week 3", Last: 40, Current: 50 },
        { name: "Week 4", Last: 45, Current: 60 },
      ],
      color: ["#2e7d32", "#81c784"],
    },
    {
      title: "Appointment Report",
      data: [
        { name: "Week 1", Last: 10, Current: 12 },
        { name: "Week 2", Last: 15, Current: 18 },
        { name: "Week 3", Last: 20, Current: 25 },
        { name: "Week 4", Last: 22, Current: 30 },
      ],
      color: ["#d32f2f", "#ef9a9a"],
    },
  ];

  const todayAppointments = [
    { name: "Completed", value: 10 },
    { name: "Pending", value: 8 },
  ];

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getProfile = async () => {
      await dispatch(fetchDoctor());
    };
    getProfile();
  }, []);

  return (
    <Box
      px={{ xs: 2, sm: 4 }}
      py={4}
      sx={{
        backgroundImage: `linear-gradient(rgba(224, 246, 246, 0.85), rgba(255,255,255,0.95)), url(${dashboardBg})`,
        backgroundSize: "cover",
        borderRadius: "5px",
        backgroundPosition: "center",
        minHeight: "100vh",
        px: { xs: 2, sm: 4 },
        py: 4,
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Welcome Dr Darshan,
      </Typography>

      <Grid container spacing={6} mt={2}>
        {dashboardItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <DashboardCard {...item} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} mt={4}>
        {[
          ...reports,
          {
            title: "Today’s Appointments Status",
            isPie: true,
            data: todayAppointments,
          },
        ].map((chart, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Box
              sx={{
                width: "410px",
                mx: "auto",
                borderRadius: 2,
              }}
            >
              <Card
                sx={{
                  p: 3,
                  boxShadow: 3,
                  borderRadius: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  mb={2}
                  sx={{ textAlign: "center" }}
                >
                  {chart.title}
                </Typography>

                <Box sx={{ width: "100%", height: 250 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    {chart.isPie ? (
                      <PieChart>
                        <Pie
                          data={chart.data}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius="80%"
                          label
                        >
                          {chart.data.map((entry, index) => (
                            <Cell
                              key={`cell-${idx}-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    ) : (
                      <LineChart data={chart.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="Last"
                          stroke={chart.color[0]}
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="Current"
                          stroke={chart.color[1]}
                          strokeWidth={2}
                        />
                      </LineChart>
                    )}
                  </ResponsiveContainer>
                </Box>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DoctorDashboard;
