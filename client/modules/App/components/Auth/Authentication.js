import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, Badge, Menu, MenuItem } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

// Import Selectors
import { logoutUser } from '../../../Auth/AuthActions';
import { getAuth } from '../../../Auth/AuthReducer';

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class Authentication extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toggleReg: false,
      anchorEl: null,
      mobileMoreAnchorEl: null,
    };
  }

  componentDidMount() {

  }

  // state = {
  //   anchorEl: null,
  //   mobileMoreAnchorEl: null,
  // };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  toLogin = (path) => {
    // this works. path updates and renders new component
    browserHistory.push(path);
    this.handleMenuClose();
    this.handleMobileMenuClose();
  }

  logout = () => {
    this.props.dispatch(logoutUser());
    this.handleMenuClose();
    this.handleMobileMenuClose();
  }
  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
        <MenuItem onClick={this.handleMenuClose}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>My account</p>
        </MenuItem>
        <MenuItem onClick={() => { this.logout(this); }}>
          <IconButton color="inherit">
            <PowerSettingsNewIcon />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
        {/* <Button variant="contained" onClick={this.logout.bind(this)}>Logout</Button> */}
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
        <MenuItem onClick={() => { this.logout(this); }}>
          <IconButton color="inherit">
            <PowerSettingsNewIcon />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
        <MenuItem onClick={() => { this.logout(this); }}>Logout</MenuItem>
      </Menu>
    );

    const loginMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={() => { this.toLogin('/login'); }}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Login</p>
        </MenuItem>
      </Menu>
    );

    const loginMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={() => { this.toLogin('/login'); }}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Login</p>
        </MenuItem>
      </Menu>
    );

    const userNotLoggedIn = (
      <div>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <IconButton
            aria-owns={isMenuOpen ? 'material-appbar' : undefined}
            aria-haspopup="true"
            onClick={this.handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </div>
        <div className={classes.sectionMobile}>
          <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
            <MoreIcon />
          </IconButton>
        </div>
        {loginMenu}
        {loginMobileMenu}
      </div>
    );

    const userLoggedIn = (
      <div>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            aria-owns={isMenuOpen ? 'material-appbar' : undefined}
            aria-haspopup="true"
            onClick={this.handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </div>
        <div className={classes.sectionMobile}>
          <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
            <MoreIcon />
          </IconButton>
        </div>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
    return (
      <div>
        {this.props.auth.loggedIn ? userLoggedIn : userNotLoggedIn}
      </div>
    );
  }
}

Authentication.propTypes = {
  intl: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  // children: PropTypes.object.isRequired,
  // loggedIn: PropTypes.bool.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store, state) {
  return {
    intl: store.intl,
    auth: store.auth,
    loggedIn: store.auth.data.loggedIn,
    username: store.auth.username,
    data: store.auth.data,
    token: store.auth.data.tokenID,
    authget: getAuth(state),
  };
}

// const mapStateToProps = state => ({
//   loggedIn: state.auth.loggedIn,
//   username: state.auth.username,
// });

export default connect(mapStateToProps)(withStyles(styles)(Authentication));
