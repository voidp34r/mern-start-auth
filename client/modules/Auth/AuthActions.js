// import callApi from '../../util/apiCaller';
import callApiAuth from '../../util/apiCallerAuth';

// Export Constants
export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_LOGGEDIN = 'USER_LOGGEDIN';
export const USER_LOGOUT = 'USER_LOGOUT';

function userLoggedIn(user) {
  return {
    type: USER_LOGGEDIN,
    data: user,
    username: user.username,
  };
}

function userRegisterIn(user) {
  return {
    type: USER_REGISTERED,
    data: user,
    username: user.username,
  };
}

function logout() {
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
    // localStorage.removeItem('username');
    // localStorage.removeItem('token');
    dispatch(logout());
  };
}

// export function addEmpresas(empresas) {
//   return {
//     type: ADD_EMPRESAS,
//     empresas,
//   };
// }

// export function fetchEmpresas() {
//   return (dispatch) => {
//     return callApi('empresas').then(res => {
//       dispatch(addEmpresas(res.empresas));
//     });
//   };
// }

// export function fetchEmpresa(cuid) {
//   return (dispatch) => {
//     return callApi(`empresas/${cuid}`).then(res => dispatch(addEmpresa(res.empresa)));
//   };
// }

// export function deleteEmpresa(cuid) {
//   return {
//     type: DELETE_EMPRESA,
//     cuid,
//   };
// }

// export function deleteEmpresaRequest(cuid) {
//   return (dispatch) => {
//     return callApi(`empresas/${cuid}`, 'delete').then(() => dispatch(deleteEmpresa(cuid)));
//   };
// }
