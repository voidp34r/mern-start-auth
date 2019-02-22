import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { Card, Grid, List, ListItem, Typography, CardActions, Button, CardContent } from '@material-ui/core';

import { fetchEmpresa } from '../../../modules/Empresa/EmpresaActions';

import SensorChart from './SensorChart';
class SensorDetail extends Component {

  componentDidMount() {
    // this.props.dispatch(fetchEmpresa(this.props.params.cuid));
  }

  handlerCheck = (empresas) => {
    if (empresas.length > 0) {
      if (empresas[0] != null) return true;
    } else {
      return false;
    }
    return false;
  }
  render() {
    const buildSensor = (sensor, k) => (
      <Grid key={k} item>
        <Card>
          <CardContent>
            <List>
              <ListItem>
                <Typography>
                  _id: {sensor._id}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  id: {sensor.id}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  datatime: {sensor.datatime}
                </Typography>
                <Typography>
                  N leituras: {sensor.data.length}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                N leituras: {sensor.data.length}
                </Typography>
              </ListItem>
            </List>
          </CardContent>
          <CardActions>
            {/* {JSON.stringify(sensor)} */}
            <Button variant={'contained'} onClick={() => browserHistory.push(`/empresa/${this.props.params.cuid}/sensor/${sensor._id}/data`)}>Mostrar</Button>
            <Button variant={'contained'}>Editar</Button>
            <Button variant={'contained'}>Deletar</Button>
          </CardActions>
        </Card>
      </Grid>
    );
    const BuildGrid = (
      <List>
        <ListItem>
          <Typography>
            Location: {`empresa/${this.props.params.cuid}/sensor/${this.props.params.sensorUid}/detail`}
            {/* params : {JSON.stringify(this.props.params)} */}
            {/* params.cuid : {JSON.stringify(this.props.params.cuid)} */}
          </Typography>
        </ListItem>
        <ListItem>
              {
                this.props.empresas.map((empresa, key) => {
                  return (
                    <div>
                      <Grid key={key} container justify="center" spacing={Number(16)} direction={'row'} alignItems={'center'} >
                      {empresa.sensorData.map((sensor, k) => {
                        return sensor._id === this.props.params.sensorUid ? buildSensor(sensor, k) : <div></div>;
                      })}
                      </Grid>
                      {/* {empresa.sensorData.map((sensor, k) => {
                        return sensor._id === this.props.params.sensorUid ? <SensorChart data={sensor.data} key={k} /> : <div></div>;
                      })} */}
                    </div>
                  );
                })
              }
        </ListItem>
        <ListItem>
          {
            this.props.empresas.map((empresa) => {
              return (
                <div>
                  {empresa.sensorData.map((sensor, k) => {
                    return sensor._id === this.props.params.sensorUid ? <SensorChart data={sensor.data} key={k} /> : <div></div>;
                  })}
                </div>
              );
            })
          }
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
SensorDetail.need = [() => { return fetchEmpresa(); }];

SensorDetail
.propTypes = {
  router: PropTypes.object,
  classes: PropTypes.object,
  params: PropTypes.object,
  empresas: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    // sensorData: PropTypes.array.isRequired,
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

export default connect(mapStateToProps)(SensorDetail);
