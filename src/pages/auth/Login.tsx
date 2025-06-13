// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux'; 
// import { Avatar, Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography } from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { mockDoctors, mockPatients } from '../../utils/mockData';
// import { login } from '../../features/auth/authSlice';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     // Mock authentication
//     let user: any = null;
//     let role: 'admin' | 'doctor' | 'patient' = 'patient';

//     if (email === 'admin@gmail.com' && password === 'admin123') {
//       user = {
//         id: 'admin1',
//         name: 'Admin User',
//         email: 'admin@gmail.com',
//         role: 'admin',
//       };
//       role = 'admin';
//     } else {
//       const doctor = mockDoctors.find(d => d.email === email);
//       if (doctor && password === 'doctor123') {
//         user = doctor;
//         role = 'doctor';
//       } else {
//         const patient = mockPatients.find(p => p.email === email);
//         if (patient && password === 'patient123') {
//           user = patient;
//           role = 'patient';
//         }
//       }
//     }

//     if (user) {
//       dispatch(login({ user, token: 'mock-token', role }));
//       navigate(`/${role}`);
//     } else {
//       setError('Invalid email or password');
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs" >
//       <CssBaseline />
//       <Box 
//         sx={{
//           marginTop: 8,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}
//       >
//         <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Sign in
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             autoFocus
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           {error && (
//             <Typography color="error" variant="body2">
//               {error}
//             </Typography>
//           )}
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Sign In
//           </Button>
//           <Grid container justifyContent="flex-end">
//             <Grid item>
//               <Link href="/register" variant="body2">
//                 Don't have an account? Sign Up
//               </Link>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default Login;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { mockDoctors, mockPatients } from '../../utils/mockData';
import { login } from '../../features/auth/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    let user: any = null;
    let role: 'admin' | 'doctor' | 'patient' = 'patient';

    if (email === 'admin@gmail.com' && password === 'admin123') {
      user = {
        id: 'admin1',
        name: 'Admin User',
        email: 'admin@gmail.com',
        role: 'admin',
      };
      role = 'admin';
    } else {
      const doctor = mockDoctors.find(d => d.email === email);
      if (doctor && password === 'doctor123') {
        user = doctor;
        role = 'doctor';
      } else {
        const patient = mockPatients.find(p => p.email === email);
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
    
    <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
    }}
  >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            maxWidth: 400,
            width: '100%',
            backgroundColor: 'white',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ borderRadius: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ borderRadius: 2 }}
            />
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 'bold',
              }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/register" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box> 
 
  );
};

export default Login;
