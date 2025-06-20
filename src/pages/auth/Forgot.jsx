import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { forgotPassword, loginUser } from '../../features/auth/authSlice';
import loginImage from '../../assets/loginImage.svg';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Forgot = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      new_password: '',
      confirm_password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      new_password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      confirm_password: Yup.string().oneOf([Yup.ref('new_password'), null], 'Passwords must match').required('Confirm Password is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitError('');
      try {
        const result = await dispatch(forgotPassword(values));
        if (forgotPassword.fulfilled.match(result)) { 
          navigate('/login');
          toast.success("Login success"); 
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

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

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
              Reset Password
            </Typography>

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
                    New Password <Box component="span" sx={{ color: 'red' }}>*</Box>
                  </Box>
                }
                name="new_password"
                id="new_password"
                type={showPassword ? 'text' : 'password'}
                margin="normal"
                value={formik.values.new_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.new_password && Boolean(formik.errors.new_password)}
                helperText={formik.touched.new_password && formik.errors.new_password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              /> 

              <TextField
                fullWidth
                label={
                  <Box component="span">
                    Confirm Password <Box component="span" sx={{ color: 'red' }}>*</Box>
                  </Box>
                }
                name="confirm_password"
                id="confirm_password"
                type={showPassword ? 'text' : 'password'}
                margin="normal"
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                helperText={formik.touched.confirm_password && formik.errors.confirm_password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
                {formik.isSubmitting ? 'Signing in...' : 'Submit'}
              </Button>

              <Box textAlign="center">
                <Link href="/login" variant="body2"> 
                Back to login 
                </Link>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Forgot;
