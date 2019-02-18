import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class EmpresaList extends Component {

  componentDidMount() {

  }
  render() {
    return (
      <div>adsd</div>
    );
  }
}

EmpresaList.propTypes = {
  router: PropTypes.object,
  // empresas: PropTypes.arrayOf(PropTypes.shape({
  //   name: PropTypes.string.isRequired,
  // })).isRequired,
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(EmpresaList);
