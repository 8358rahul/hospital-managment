import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Avatar,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Link,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { mockDoctors, mockPatients } from '../../utils/mockData';
import { login } from '../../features/auth/authSlice';
import loginImage from '../../assets/loginImage.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    let user = null;
    let role = 'patient';

    if (email === 'admin@gmail.com' && password === 'admin123') {
      user = {
        id: 'admin1',
        name: 'Admin User',
        email: 'admin@gmail.com',
        role: 'admin',
      };
      role = 'admin';
    } else {
      const doctor = mockDoctors.find((d) => d.email === email);
      if (doctor && password === 'doctor123') {
        user = doctor;
        role = 'doctor';
      } else {
        const patient = mockPatients.find((p) => p.email === email);
        if (patient && password === 'patient123') {
          user = patient;
          role = 'patient';
        }
      }
    }

  if (user) {
    dispatch(login({ user, token: 'mock-token', role }));
    navigate(`/${role}`);
  } else {
    setError('Invalid email or password');
  }
};

return (
  <Box sx={{ display: 'flex', height: '100vh', width: '100%', flexDirection: { xs: 'column', md: 'row' } }}>
    {/* Left Image Section */}
    <Box
      sx={{
        width: { xs: '100%', md: '60%' },
        height: { xs: '40vh', md: '100%' },
        backgroundImage: `url(${loginImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />

    {/* Right Form Section */}
    <Box
      sx={{
        width: { xs: '100%', md: '40%' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        py: { xs: 4, md: 0 },
      }}
    >
      <Paper elevation={1} sx={{ p: 4, width: '90%', maxWidth: 420, backgroundColor: '#fff' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.3, borderRadius: 2 }}
            >
              Sign In
            </Button>

            <Box textAlign="center">
              <Link href="/register" variant="body2">
                Don&apos;t have an account? Sign Up
              </Link>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  </Box>
);
};

export default Login;
