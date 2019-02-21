import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Card, Grid, List, ListItem, Typography, CardContent } from '@material-ui/core';
import { fetchEmpresa } from '../../../modules/Empresa/EmpresaActions';

class SensorDataList extends Component {

  componentDidMount() {
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
    const buildData = (data) => (
      data.map((item, l) => {
        return (
          <Grid key={l} item>
            <Card>
              <CardContent>
                <List>
                  <ListItem>
                    <Typography>
                      _id: {item._id}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>
                      temp: {item.temp}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>
                      datatime: {item.datatime}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>
                      data: {JSON.stringify(item)}
                    </Typography>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        );
      })
    );
    const BuildGrid = (
      <List>
        <ListItem>
          <Typography>
            Location: {`empresa/${this.props.params.cuid}/sensor/${this.props.params.sensorUid}/data`}
          </Typography>
        </ListItem>
        <ListItem>
              {
                this.props.empresas.map((empresa, key) => {
                  return (
                    <Grid key={key} container justify="center" spacing={Number(16)} direction={'row'} alignItems={'center'} >
                      {empresa.sensorData.map((sensor, k) => {
                        return sensor._id === this.props.params.sensorUid ? buildData(sensor.data, k) : <div></div>;
                      })}
                    </Grid>
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
          >
            {
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
SensorDataList.need = [() => { return fetchEmpresa(); }];

SensorDataList
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

export default connect(mapStateToProps)(SensorDataList);
