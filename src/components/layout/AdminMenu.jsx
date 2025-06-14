import { Menu, MenuItem } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { logout } from '../../features/auth/authSlice';
 

const AdminMenu = ({ anchorEl, handleClose }) => {
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
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
            width: 32,
            height: 32,
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
      <MenuItem component={Link} to="/profile">
        Profile
      </MenuItem>
      <MenuItem component={Link} to="/settings">
        Settings
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <Logout sx={{ mr: 1 }} /> Logout
      </MenuItem>
    </Menu>
  );
};

export default AdminMenu;