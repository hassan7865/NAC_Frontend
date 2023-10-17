import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Logout } from '../Redux/LoginRedux';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
  const dispatch = useDispatch()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleLogout=()=>{
    dispatch(Logout())
  }
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar src='https://www.nedadmissioncell.com/NED.png' sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, width: "50px", height: "50px" }}></Avatar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            NAC
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Link to="/News" style={{color:"inherit",textDecoration:"none"}}>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">News</Typography>
                </MenuItem>
              </Link>
              <Link to="/PastPapers"  style={{color:"inherit",textDecoration:"none"}}>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">PastPapers</Typography>
              </MenuItem>
              </Link>
              <Link to="/Blogs"  style={{color:"inherit",textDecoration:"none"}}>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Blogs</Typography>
              </MenuItem>
              </Link>
              <Link to="/Faqs"  style={{color:"inherit",textDecoration:"none"}}>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Faqs</Typography>
              </MenuItem>
              </Link>
              <Link to="/Tests"  style={{color:"inherit",textDecoration:"none"}}>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Tests</Typography>
              </MenuItem>
              </Link>

            </Menu>
          </Box>
          <Avatar src='https://www.nedadmissioncell.com/NED.png' sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, width: "50px", height: "50px" }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            NAC
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Link to="/News" style={{color:"inherit",textDecoration:"none"}}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              News
            </Button>
            </Link>
            <Link to="/PastPapers"  style={{color:"inherit",textDecoration:"none"}}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              PastPapers
            </Button>
            </Link>
            <Link to="/Blogs"  style={{color:"inherit",textDecoration:"none"}}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Blogs
            </Button>
            </Link>
            <Link to="/Faqs"  style={{color:"inherit",textDecoration:"none"}}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Faqs
            </Button>
            </Link>
            <Link to="/Tests"  style={{color:"inherit",textDecoration:"none"}}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Tests
            </Button>
            </Link>

          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Link to="/login" style={{textDecoration:"none",color:"inherit"}}>
              <MenuItem onClick={handleLogout} sx={{display:"flex",alignItems:"center",gap:"5px"}}>
                <LogoutRoundedIcon/>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
              </Link>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;