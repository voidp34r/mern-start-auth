// Import Actions
import { USER_REGISTERED, USER_LOGGEDIN, USER_LOGOUT } from './AuthActions';

// Initial State
const initialState = { data: [] };

const EmpresaReducer = (state = initialState, action) => {
  const auth = Object.assign({}, state);

  switch (action.type) {
    case USER_REGISTERED :
      // eslint-disable-next-line
      auth['loggedIn'] = true;
      // eslint-disable-next-line
      auth['data'] = action.data;
      // eslint-disable-next-line
      auth['username'] = action.username;
      return auth;

    case USER_LOGGEDIN :
      // eslint-disable-next-line
      auth['loggedIn'] = true;
      // eslint-disable-next-line
      auth['data'] = action.data;
      // eslint-disable-next-line
      auth['username'] = action.username;
      return auth;

    case USER_LOGOUT :
      // eslint-disable-next-line
      auth['loggedIn'] = false;
      // eslint-disable-next-line
      auth['data'] = {};
      // eslint-disable-next-line
      auth['username'] = '';
      return auth;

    default:
      return state;
  }
};
/* Selectors */

// Get all Empresas
export const getAuth = state => state.auth;

// Export Reducer
export default EmpresaReducer;
