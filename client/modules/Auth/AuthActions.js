// import callApi from '../../util/apiCaller';
import callApiAuth from '../../util/apiCallerAuth';

// Export Constants
export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_LOGGEDIN = 'USER_LOGGEDIN';
export const USER_LOGOUT = 'USER_LOGOUT';

export function userLoggedIn(user) {
  return {
    type: USER_LOGGEDIN,
    data: user,
    username: user.username,
  };
}

export function userRegisterIn(user) {
  return {
    type: USER_REGISTERED,
    data: user,
    username: user.username,
  };
}

export function logout() {
  return {
    type: USER_LOGOUT,
  };
}


// Export Actions
export function authLoginRequest(user) {
  return (dispatch) => {
    return callApiAuth(user.username, 'POST', {
      username: user.username,
      password: user.password,
    }).then(res => dispatch(userLoggedIn(res.data)));
  };
}

export function authRegisterRequest(user) {
  return (dispatch) => {
    return callApiAuth('/', 'POST', {
      user: {
        username: user.username,
        password: user.password,
      },
    }).then(res => dispatch(userRegisterIn(res.data)));
  };
}

export function logoutUser() {
  return (dispatch) => {
    dispatch(logout());
  };
}
