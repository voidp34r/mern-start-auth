import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class EmpresaError extends Component {

  componentDidMount() {}

  render() {
    return (
      <div>Error</div>
    );
  }
}

EmpresaError
.propTypes = {
  router: PropTypes.object,
  classes: PropTypes.object,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(EmpresaError);
