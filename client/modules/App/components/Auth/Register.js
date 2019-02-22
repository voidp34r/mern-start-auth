import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { authRegisterRequest } from '../../../Auth/AuthActions';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: 40, // theme.spacing(3),
    marginRight: 100, // theme.spacing(3),
    [theme.breakpoints.up(400 + 50 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: 50, // theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 15,
  },
  avatar: {
    // margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: 10, // theme.spacing(1),
  },
  submit: {
    marginTop: 10, // theme.spacing(3),
  },
});

class Register extends Component {

  constructor() {
    super();

    this.state = {
      details: {},
    };
  }

  updateDetails(event) {
    const updateDetails = Object.assign({}, this.state.details);

    updateDetails[event.target.id] = event.target.value;
    this.setState({
      details: updateDetails,
    });
  }

  submitRegister() {
    this.props.dispatch(authRegisterRequest(this.state.details));
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* <form>
        Username <input onChange={this.updateDetails.bind(this)} id="username" type="text" placeholder= "Username"/><br/>
        Password <input onChange={this.updateDetails.bind(this)} id="password" type="password" placeholder= "Password"/><br/>

        <button onClick={this.register.bind(this)}>Go</button>
        </form> */}
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input id="username" name="username" autoComplete="username" onChange={this.updateDetails.bind(this)} autoFocus />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input name="password" type="password" id="password" onChange={this.updateDetails.bind(this)}/>
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => { this.submitRegister(this); }}
              >
                Sign in
              </Button>
            </form>
          </Paper>
        </main>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  updateDetails: PropTypes.func.isRequired,
};

// eslint-disable-next-line no-unused-varss
const mapStateToProps = () => {
  return {
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Register));
