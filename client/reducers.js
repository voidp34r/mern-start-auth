/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import auth from './modules/Auth/AuthReducer';
import empresas from './modules/Empresa/EmpresaReducer';
import intl from './modules/Intl/IntlReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  auth,
  empresas,
  intl,
});
