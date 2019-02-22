import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { browserHistory } from 'react-router';

import { connect } from 'react-redux';

import { Card, Grid, List, ListItem, Typography, CardActions, Button } from '@material-ui/core';

import { fetchEmpresa } from '../EmpresaActions';
import { addSensorRequest } from '../../Sensor/SensorActions';

class EmpresaDetails extends Component {

  componentDidMount() {
    this.props.dispatch(fetchEmpresa(this.props.params.cuid));
  }

  dummyData = {
    id: 'sensor 001',
    data: [{
      temp: 11,
      datatime: '2019-02-09T00:00:01.488Z',
    }, {
      temp: 22,
      datatime: '2019-02-09T00:00:02.488Z',
    }],
  }

  handlerCheck = (empresas) => {
    if (empresas.length > 0) {
      if (empresas[0] != null) return true;
    } else {
      return false;
    }
    return false;
  }

  handleAddSensor = () => {
    this.props.dispatch(addSensorRequest(this.dummyData, this.props.params.cuid));
  }

  handleAddSensorPage = () => {
    browserHistory.push(`/empresa/${this.props.params.cuid}/add`);
  }
  render() {
    const BuildGrid = (
      <List>
        <ListItem>
          <Typography>
            {/* Location: {this.props.route.path + '/' + this.props.params.cuid} */}
            Location: {`/empresa/${this.props.params.cuid}`}
          </Typography>
        </ListItem>
        <ListItem>
          <Grid container justify="center" spacing={Number(16)} direction={'row'} alignItems={'center'}>
              {
                this.props.empresas.map((empresa, key) => {
                  return (<Grid key={empresa._id} item>
                    <Card key={empresa._id}>
                      <List>
                        <ListItem>
                          <Typography>
                            Item: {key}
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <Typography>
                            Empresa _id: {empresa._id ? empresa._id : 'error _id'}
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <Typography>
                            Empresa id: {empresa.id ? empresa.id : 'error id'}
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <Typography>
                            Name: {empresa.name ? empresa.name : 'error name'}
                          </Typography>
                        </ListItem>
                        <ListItem>
                          <Typography>
                          N Sensores: {empresa.sensorData ? empresa.sensorData.length : 'error sensorData'}
                          </Typography>
                        </ListItem>
                      </List>
                      <CardActions>
                        <Button variant={'contained'} onClick={() => browserHistory.push(`/empresa/${this.props.params.cuid}/sensor`)}>Mostrar</Button>
                        <Button variant={'contained'}>Editar</Button>
                        <Button variant={'contained'}>Deletar</Button>
                      </CardActions>
                    </Card>
                  </Grid>);
                })
              }
          </Grid>
        </ListItem>
        <ListItem>
          <Button variant={'contained'} color={'primary'} onClick={() => this.handleAddSensorPage()}>Criar Sensor | Page</Button>
        </ListItem>
        <ListItem>
          <Button variant={'contained'} color={'primary'} onClick={() => this.handleAddSensor()}>Criar Sensor random!</Button>
        </ListItem>
      </List>
    );

    return (
      <div >
        <Grid container spacing={Number(24)} justify="flex-start" direction={'row'} alignItems={'center'} >
          <Grid
            item xs={12}
            // spacing={Number(16)}
            // className={classes.demo}
            // justify={'justify'}
          >
            {/* {JSON.stringify(this.props.params)} */}
            {
              // this.props.empresas.length > 0 ? <div>{JSON.stringify(this.props.empresas)}</div> : <div>menor que zero</div>
              // TODO verificar a mudança de estado nulo
              this.handlerCheck(this.props.empresas) ? BuildGrid : <div>{JSON.stringify(this.props.empresas)}</div>
            }
          </Grid>
        </Grid>
      </div>
    );
  }
}
// Actions required to provide data for this component to render in sever side.
EmpresaDetails.need = [() => { return fetchEmpresa(); }];

EmpresaDetails
.propTypes = {
  router: PropTypes.object,
  classes: PropTypes.object,
  params: PropTypes.object,
  empresas: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    sensorData: PropTypes.array.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  empresas: store.empresas.data,
});

// const mapDispatchToProps = dispatch => {
//   return {
//     // dispatching plain actions
//     // dispatch: () => dispatch({ type: 'GET_EMPRESA',  }),
//   };
// };

export default connect(mapStateToProps)(EmpresaDetails);
