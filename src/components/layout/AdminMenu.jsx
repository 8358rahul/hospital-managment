import { Menu, MenuItem, Avatar, Typography, Box } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { logout } from '../../features/auth/authSlice';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentUser } from '../../features/auth/authSlice';

const AdminMenu = ({ anchorEl, handleClose, user }) => {
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleRoleClick = () => {
    navigate('profile'); // Update with your actual profile route
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };

  // Function to get initials from the user's name
  const getInitials = (name) => {
    if (!name) return 'U'; // Default to 'U' for User
    const nameParts = name.split(' ');
    const initials = nameParts.map((part) => part[0]).join('');
    return initials.toUpperCase();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 40,
            height: 40,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem>
        <Box sx={{ display: 'flex', alignItems: 'center' }} onClick={handleRoleClick}>
          <Avatar alt={user?.name} src={user?.avatar}>
            {!user?.avatar && getInitials(user?.first_name)} {/* Show initials if avatar is not available */}
          </Avatar>
          <Box sx={{ ml: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {user?.first_name || 'User'}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {user?.email || 'user@example.com'}
            </Typography>
          </Box>
        </Box>
      </MenuItem>
      {/* <MenuItem component={Link} to="/settings">
        Settings
      </MenuItem> */}
      <MenuItem onClick={handleLogout}>
        <Logout sx={{ mr: 1 }} /> Logout
      </MenuItem>
    </Menu>
  );
};

export default AdminMenu;