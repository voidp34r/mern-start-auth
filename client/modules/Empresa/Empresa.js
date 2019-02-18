import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';


// Import Style
// import styles from './Empresa.css';

// Import Components
// import { EmpresaList } from './pages/EmpresaList';

// Import Actions
import { addEmpresaRequest, fetchEmpresas, deleteEmpresaRequest } from './EmpresaActions';
import { toggleAddPost } from '../App/AppActions';

// Import Selectors
import { getShowAddPost } from '../App/AppReducer';
import { getEmpresas } from './EmpresaReducer';
import EmpresaList from './pages/EmpresaList';

class Empresa extends Component {
  componentDidMount() {
    this.props.dispatch(fetchEmpresas());
  }

  handleDeletePost = post => {
    if (confirm('Do you want to delete this post')) { // eslint-disable-line
      this.props.dispatch(deleteEmpresaRequest(post));
    }
  };

  handleAddPost = (name, title, content) => {
    this.props.dispatch(toggleAddPost());
    this.props.dispatch(addEmpresaRequest({ name, title, content }));
  }

  render() {
    return (
      <div>
        <EmpresaList></EmpresaList>
      </div>
    );
  }
}

Empresa.need = [() => { return fetchEmpresas(); }];

const mapStateToProps = (state) => {
  return {
    showAddPost: getShowAddPost(state),
    empresas: getEmpresas(state),
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {};
// };

Empresa.propTypes = {
  router: PropTypes.object,
  empresas: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
  showAddPost: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Empresa);
