import React, { useEffect } from "react";
import { Box, Card, Grid, Typography, Avatar, Container, useMediaQuery, useTheme } from "@mui/material";
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
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUserDetail } from "../../features/doctor/doctorSlice";
import { fetchDoctorDashboard, selectDoctorDashboardData, selectDoctorDashboardStatus } from "../../features/doctorDashboard/doctorDashboardSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/authSlice";

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
        // make the width responsive all screen sizes 
        width:"280px"

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
   const token = useSelector(selectCurrentToken);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUserDetail);
  const dashboardData = useAppSelector(selectDoctorDashboardData);
  
  const dashboardStatus = useAppSelector(selectDoctorDashboardStatus);

  useEffect(() => {
    // if (dashboardStatus === "idle" && user?.token) {
      dispatch(fetchDoctorDashboard(token));
    // }
  }, [dispatch]);

  if (dashboardStatus === "loading") {
    return <Typography align="center" mt={10}>Loading Dashboard...</Typography>;
  }

  const dashboardItems = [
    // {
    //   title: "Total Doctors",
    //   count: dashboardData?.total_doctors ?? 0,
    //   icon: <PeopleIcon fontSize="large" />,
    //   color: "#1976d2",
    // },
    {
      title: "Total Patients",
      count: dashboardData?.total_patients ?? 0,
      icon: <PeopleIcon fontSize="large" />,
      color: "#4caf50",
    },
    {
      title: "Total Appointments",
      count: dashboardData?.total_appointments ?? 0,
      icon: <EventNoteIcon fontSize="large" />,
      color: "#ff9800",
    },
    {
      title: "Pending Appointments",
      count: dashboardData?.total_pending_requests ?? 0,
      icon: <HelpOutlineIcon fontSize="large" />,
      color: "#d32f2f",
    },
  ];

  const todayAppointments = dashboardData?.today_appointment_status
    ? Object.entries(dashboardData.today_appointment_status).map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value,
      }))
    : [];

  const doctorSpecializationChart = dashboardData?.doctor_by_specialization?.map((item) => ({
    name: item.specialization || "Unknown",
    value: item.count,
  })) ?? [];

  const reports = [
    {
      title: "Weekly Patients",
      data: dashboardData?.weekly_unique_patients?.map((entry, i, arr) => ({
        name: `Week ${i + 1}`,
        // Last: i > 0 ? arr[i - 1]?.unique_patients : 0,
        Current: entry.unique_patients,
      })) ?? [],
      color: ["#2e7d32", "#81c784"],
    },
    {
      title: "Weekly Appointments",
      data: dashboardData?.weekly_appointments?.map((entry, i, arr) => ({
        name: `Week ${i + 1}`,
        // Last: i > 0 ? arr[i - 1]?.appointment_count : 0,
        Current: entry.appointment_count,
      })) ?? [],
      color: ["#d32f2f", "#ef9a9a"],
    },
  ];    return (
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.92), rgba(255,255,255,0.9)), url(${dashboardBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          py: { xs: 4, sm: 6 },
        }}
      >
        <Container maxWidth="lg" alignitems='center' justifycontent='center'>
          {/* Welcome Banner */}
          <Card
            sx={{
              mb: 6,
              p: { xs: 3, sm: 4 },
              borderRadius: 3,
              boxShadow: 4,
              background: 'linear-gradient(90deg, #1976d2, #00acc1)',
              color: '#fff',
              textAlign: 'center',
            }}
          >
            <Typography
              variant={isSmallScreen ? 'h5' : 'h4'}
              fontWeight="bold"
              gutterBottom
            >
              Welcome, {user?.fullname}
            </Typography>
            <Typography variant="subtitle1">
              Here's a quick overview of your hospital statistics
            </Typography>
          </Card>
  
          {/* Dashboard Grid */}
          <Grid container spacing={4} mt={4} justifyContent={'center'}>
            {dashboardItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} >
                <DashboardCard {...item} />
              </Grid>
            ))}
          </Grid>
          
      <Grid container spacing={4} mt={4} justifyContent={'center'}>
  {[...reports, {
    title: "Today’s Appointments Status",
    isPie: true,
    data: todayAppointments,
  }].map((chart, idx) => (
    <Grid item xs={12} sm={6} md={6} lg={4} key={idx}>
      <Box
        sx={{
          width: "100%",
          borderRadius: 2,
        }}
      >
        <Card
          sx={{
            p: 2,
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

          <Box sx={{ width: "280px", height: { xs: 250, sm: 300, md: 280 } }}>
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
                  {/* <Line
                    type="monotone"
                    dataKey="Last"
                    stroke={chart.color[0]}
                    strokeWidth={2}
                  /> */}
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

        </Container>
      </Box>
    ); 
};

export default DoctorDashboard;
