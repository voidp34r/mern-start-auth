import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_EMPRESA = 'ADD_EMPRESA';
export const ADD_EMPRESAS = 'ADD_EMPRESAS';
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
    return callApi('empresas', 'empresa', {
      empresa: {
        name: empresa.name,
        title: empresa.title,
        content: empresa.content,
      },
    }).then(res => dispatch(addEmpresa(res.empresa)));
  };
}

export function addEmpresas(empresas) {
  return {
    type: ADD_EMPRESAS,
    empresas,
  };
}

export function fetchEmpresas() {
  return (dispatch) => {
    return callApi('empresas').then(res => {
      dispatch(addEmpresas(res.empresas));
    });
  };
}

export function fetchEmpresa(cuid) {
  return (dispatch) => {
    return callApi(`empresas/${cuid}`).then(res => dispatch(addEmpresa(res.empresa)));
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
