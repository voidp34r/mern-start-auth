import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// Import Style
// import styles from './Sensor.css';

class Sensor extends Component {

  componentDidMount() {}
  render() {
    return (
      <div>Sensor</div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = () => {
  return {};
};

Sensor.propTypes = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sensor);
