import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';
import ContactFilter from '../contacts/ContactFilter';
import { Link as RouterLink } from 'react-router-dom';
import Gravatar from 'react-gravatar';

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    display: 'none',
    fontSize: '15px',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  about: {
    color: '#fff',
    fontSize: '12px',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  wrapIcon: {
    verticalAlign: 'middle',
    display: 'inline-flex',
    marginRight: '3px',
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  home: {
    color: '#fff',
    fontSize: '12px',
    [theme.breakpoints.down('sm')]: {
      display: 'none!important',
    },
  },
}));

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const { isAuthenticated, logout, loadUser, user } = authContext;
  const { clearContacts } = contactContext;

  const classes = useStyles();

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
    clearContacts();
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'secondary-search-account-menu';
  const authLinks = (
    <MenuItem onClick={handleProfileMenuClose}>
      <Link component="button" color="secondary" onClick={onLogout}>
        Logout
      </Link>
    </MenuItem>
  );
  const guestLinks = (
    <div>
      <MenuItem onClick={handleProfileMenuClose}>
        <Button color="secondary" component={RouterLink} to="/login">
          Login
        </Button>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuClose}>
        <Button color="secondary" component={RouterLink} to="/register">
          Register
        </Button>
      </MenuItem>
    </div>
  );
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleProfileMenuClose}
    >
      {isAuthenticated ? authLinks : guestLinks}
    </Menu>
  );

  return (
    <div className={classes.grow} style={{ marginBottom: '1rem' }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Button component={RouterLink} className={classes.home} to="/">
            <PermContactCalendarIcon className={classes.wrapIcon} />
            <Typography className={classes.title} variant="h6">
              Kontakt
            </Typography>
          </Button>
          {isAuthenticated && (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <ContactFilter
                placeholder={'Search…'}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          )}
          <div className={classes.grow} />
          <div>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {isAuthenticated && user ? (
                <Avatar className={classes.small}>
                  {' '}
                  <Gravatar email={user.email || 'default.email.com'} />
                </Avatar>
              ) : (
                <AccountCircle />
              )}
            </IconButton>
          </div>
          <Button component={RouterLink} className={classes.about} to="/about">
            About
          </Button>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};

export default Navbar;
