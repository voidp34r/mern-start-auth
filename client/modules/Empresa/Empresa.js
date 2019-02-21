import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
// import { bindActionCreators } from 'redux';


// Import Style

// Import Components
import EmpresaList from './pages/EmpresaList';

// Import Actions
import { addEmpresaRequest, fetchEmpresas } from './EmpresaActions';

// Import Selectors
import { Button, List, ListItem, Typography } from '@material-ui/core';

class Empresa extends Component {
  state = {
    dummyData: {
      id: '001',
      name: 'matrix',
      sensorData: [{
        id: 'sensor 001',
        data: [{
          temp: 11,
          datatime: '2019-02-09T00:00:01.488Z',
        }, {
          temp: 22,
          datatime: '2019-02-09T00:00:02.488Z',
        }],
      }, {
        id: 'sensor 001',
        data: [{
          temp: 11,
          datatime: '2019-02-09T00:00:01.488Z',
        }, {
          temp: 22,
          datatime: '2019-02-09T00:00:02.488Z',
        }],
      }],
    },
  }
  componentDidMount() {
    this.props.dispatch(fetchEmpresas());
  }

  handleAddEmpresa = () => {
    this.props.dispatch(addEmpresaRequest(this.state.dummyData));
  }

  handleAddEmpresaPage = () => {
    browserHistory.push('/empresa/add');
  }

  render() {
    return (
      <div >
        {/* props:{JSON.stringify(this.props)} */}
        <List>
          <ListItem>
            <Typography>
              Location: {this.props.route.path}
            </Typography>
          </ListItem>
        </List>
        {
          this.props.empresas.length > 0 ? <EmpresaList empresas={this.props.empresas} dispatch={this.props.dispatch} /> : <div>{JSON.stringify(this.props.empresas)}</div>
        }
        <List>
          <ListItem>
            <Button variant={'contained'} color={'primary'} onClick={() => this.handleAddEmpresaPage()}>Criar empresa | Page</Button>
          </ListItem>
          <ListItem>
            <Button variant={'contained'} color={'primary'} onClick={() => this.handleAddEmpresa()}>Criar empresa random!</Button>
          </ListItem>
        </List>
      </div>
    );
  }
}
// Actions required to provide data for this component to render in sever side.
Empresa.need = [() => { return fetchEmpresas(); }];

const mapStateToProps = (store) => {
  return {
    // showAddPost: getShowAddPost(state),
    empresas: store.empresas.data,
    // empresaList: getEmpresas(state),
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {};
// };

Empresa.propTypes = {
  router: PropTypes.object,
  route: PropTypes.object,
  classes: PropTypes.object,
  empresas: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    // sensorData: PropTypes.array.isRequired,
  })).isRequired,
  // showAddPost: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Empresa);
