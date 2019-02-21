import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_EMPRESA = 'ADD_EMPRESA';
export const GET_EMPRESA = 'GET_EMPRESA';
export const GET_EMPRESAS = 'GET_EMPRESAS';
export const DELETE_EMPRESA = 'DELETE_EMPRESA';

// Export Actions
export function addEmpresa(empresa) {
  return {
    type: ADD_EMPRESA,
    empresa,
  };
}

export function addEmpresaRequest(empresa) {
  return (dispatch) => {
    return callApi('empresas', 'POST', {
      id: empresa.id,
      name: empresa.name,
      sensorData: [empresa.sensorData],
    }).then(res => dispatch(addEmpresa(res)));
  };
}

export function getEmpresas(empresas) {
  return {
    type: GET_EMPRESAS,
    empresas,
  };
}

export function fetchEmpresas() {
  return (dispatch) => {
    return callApi('empresas').then(res => {
      dispatch(getEmpresas(res.empresas));
    });
  };
}

export function getEmpresa(empresa) {
  return {
    type: GET_EMPRESA,
    empresa,
  };
}

export function fetchEmpresa(cuid) {
  return (dispatch) => {
    return callApi(`empresas/${cuid}`).then(res => dispatch(getEmpresa(res.empresa === null ? [] : res.empresa)));
  };
}

export function deleteEmpresa(cuid) {
  return {
    type: DELETE_EMPRESA,
    cuid,
  };
}

export function deleteEmpresaRequest(cuid) {
  return (dispatch) => {
    return callApi(`empresas/${cuid}`, 'delete').then(() => dispatch(deleteEmpresa(cuid)));
  };
}
