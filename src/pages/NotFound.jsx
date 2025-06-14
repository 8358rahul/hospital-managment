import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80vh',
          textAlign: 'center',
        }}
      >
        <Typography variant="h1" sx={{ mb: 2 }}>
          404
        </Typography>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Typography>
        <Button component={Link} to="/" variant="contained" size="large">
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;