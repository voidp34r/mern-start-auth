import test from 'ava';
import { reducerTest } from 'redux-ava';
import AuthReducer, { getAuth } from '../AuthReducer';

import { authLoginRequest, authRegisterRequest, logoutUser } from '../AuthActions';

const user = {
  username: 'admin',
  password: 'admin',
};

const token1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.';
const token2 = 'eyJ1c2VybmFtZSI6ImFkbWluIiwiX2lkIjoiNWM2ODI2NjgxOTE4MGU0OGQ4Y2U1NzhlIiwiaWF0IjoxNTUwNDY0MTcyfQ';
const token3 = '.F7p0bFMPnEdNiF-2DphD0Cwf6z3oxSgB3BjEe098e_A';


const responseAuth = {
  success: 1,
  data: {
    tokenID: token1 + token2 + token3,
    username: 'admin',
  },
};

test('action for USER_REGISTERED is working', reducerTest(
  AuthReducer,
  { data: responseAuth },
  authRegisterRequest(user),
  { data: responseAuth }
));

test('action for USER_LOGGEDIN is working', reducerTest(
  AuthReducer,
  { data: responseAuth },
  authLoginRequest(user),
  { data: responseAuth }
));

test('action for USER_LOGOUT is working', reducerTest(
  AuthReducer,
  {
    loggedIn: false,
    data: {},
    username: '',
  },
  logoutUser,
  {
    loggedIn: false,
    data: {},
    username: '',
  },
));

test('getAuth selector', t => {
  t.deepEqual(
    getAuth({
      auth: [responseAuth],
    }),
    [responseAuth]
  );
});
