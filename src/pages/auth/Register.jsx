import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, selectAuthError, selectAuthStatus } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';
import registerImage from '../../assets/loginImage.svg';

const validationSchema = Yup.object({
  fullname: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  role: Yup.string().required('Role is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const authStatus = useSelector(selectAuthStatus);
  const authError = useSelector(selectAuthError);

  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const handleToggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'patient',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const resultAction = await dispatch(
          registerUser({
            fullname: values.fullname,
            username: values.fullname,
            email: values.email,
            password: values.password,
            confirm_password: values.password,
            role: values.role,
          })
        );

        if (registerUser.fulfilled.match(resultAction)) {
          toast.success('Registration successful!');
          navigate('/login');
        } else {
          toast.error(resultAction.payload || 'Registration failed');
        }
      } catch (err) {
        toast.error('Something went wrong');
      }
    },
  });

  const getLabel = (label) => (
    <span>
      {label} <span style={{ color: 'red' }}>*</span>
    </span>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100%', flexDirection: { xs: 'column', md: 'row' } }}>
      {/* Left image section */}
      <Box
        sx={{
          width: { xs: '100%', md: '60%' },
          height: { xs: '40vh', md: '100%' },
          backgroundImage: `url(${registerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Right form section */}
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
              Sign Up
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3, width: '100%' }}>
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  fullWidth
                  id="fullname"
                  name="fullname"
                  label={getLabel('Full Name')}
                  value={formik.values.fullname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                  helperText={formik.touched.fullname && formik.errors.fullname}
                />
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label={getLabel('Email Address')}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <FormControl fullWidth error={formik.touched.role && Boolean(formik.errors.role)}>
                  <InputLabel id="role-label">{getLabel('Role')}</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    name="role"
                    value={formik.values.role}
                    label="Role"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value="patient">Patient</MenuItem>
                    <MenuItem value="doctor">Doctor</MenuItem>
                  </Select>
                  {formik.touched.role && formik.errors.role && (
                    <Typography variant="caption" color="error">
                      {formik.errors.role}
                    </Typography>
                  )}
                </FormControl>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label={getLabel('Password')}
                  type={showPassword ? 'text' : 'password'}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  id="confirmPassword"
                  name="confirmPassword"
                  label={getLabel('Confirm Password')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleToggleConfirmPassword} edge="end">
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {authError && (
                <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                  {authError}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.3, borderRadius: 2 }}
                disabled={authStatus === 'loading'}
              >
                {authStatus === 'loading' ? 'Registering...' : 'Sign Up'}
              </Button>

              <Box textAlign="center">
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  Already have an account? Sign in
                </Link>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Register;
