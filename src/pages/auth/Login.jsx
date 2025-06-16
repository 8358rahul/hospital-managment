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
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {  loginUser } from '../../features/auth/authSlice';
import loginImage from '../../assets/loginImage.svg';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitError('');
      try {
        const result = await dispatch(loginUser(values));
        if (loginUser.fulfilled.match(result)) {
          const { role } = result.payload;  
          toast.success("Login success");
          navigate(`/${role}`);
        } else {
          setSubmitError(result.payload || 'Login failed');
        }
      } catch (err) {
        setSubmitError('Something went wrong');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box sx={{ display: 'flex', height: '100vh', flexDirection: { xs: 'column', md: 'row' } }}>
      {/* Left Image */}
      <Box
        sx={{
          width: { xs: '100%', md: '60%' },
          height: { xs: '40vh', md: '100%' },
          backgroundImage: `url(${loginImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Right Form */}
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
        <Paper elevation={1} sx={{ p: 4, width: '90%', maxWidth: 420 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>

            {/* <Button  title='press' onClick={()=>navigate('/doctor')}>check</Button> */}
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3, width: '100%' }}>
              <TextField
                fullWidth
                label={
                  <Box component="span">
                    Email Address <Box component="span" sx={{ color: 'red' }}>*</Box>
                  </Box>
                }
                name="email"
                id="email"
                margin="normal"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                label={
                  <Box component="span">
                    Password <Box component="span" sx={{ color: 'red' }}>*</Box>
                  </Box>
                }
                name="password"
                id="password"
                type="password"
                margin="normal"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />

              {submitError && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {submitError}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.3, borderRadius: 2 }}
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Signing in...' : 'Sign In'}
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
