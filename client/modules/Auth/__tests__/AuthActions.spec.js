import test from 'ava';
import {
  actionTest,
} from 'redux-ava';

import {
  USER_LOGGEDIN,
  USER_REGISTERED,
  USER_LOGOUT,
  // authLoginRequest,
  logout,
  userLoggedIn,
  userRegisterIn,
} from '../AuthActions';


// eslint-disable-next-line max-len
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiX2lkIjoiNWM2ODI2NjgxOTE4MGU0OGQ4Y2U1NzhlIiwiaWF0IjoxNTUwNDY0MTcyfQ.F7p0bFMPnEdNiF-2DphD0Cwf6z3oxSgB3BjEe098e_A';


const responseAuth = {
  success: 1,
  data: {
    tokenID: token,
    username: 'admin',
  },
};

test('should return the correct user login response', actionTest(
  userLoggedIn,
  responseAuth, {
    type: USER_LOGGEDIN,
    data: responseAuth,
    username: responseAuth.username,
  },
));


test('should return the correct user Register response', actionTest(
  userRegisterIn,
  responseAuth, {
    type: USER_REGISTERED,
    data: responseAuth,
    username: responseAuth.username,
  },
));


test('should return the correct user logout response', actionTest(
  logout, {
    type: USER_LOGOUT,
  },
));
