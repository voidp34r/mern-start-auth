// Import Actions
import { ADD_EMPRESA, ADD_EMPRESAS, DELETE_EMPRESA } from './EmpresaActions';

// Initial State
const initialState = { data: [] };

const EmpresaReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EMPRESA :
      return {
        data: [action.empresa, ...state.data],
      };

    case ADD_EMPRESAS :
      return {
        data: action.empresas,
      };

    case DELETE_EMPRESA :
      return {
        data: state.data.filter(empresa => empresa.cuid !== action.cuid),
      };

    default:
      return state;
  }
};
/* Selectors */

// Get all Empresas
export const getEmpresas = state => state.empresas.data;

// Get Empresa by cuid
export const getEmpresa = (state, cuid) => state.empresas.data.filter(empresa => empresa.cuid === cuid)[0];

// Export Reducer
export default EmpresaReducer;
