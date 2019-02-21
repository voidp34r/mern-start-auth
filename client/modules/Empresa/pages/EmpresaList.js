import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Card, Grid, List, ListItem, Typography, CardActions, Button } from '@material-ui/core';

import { deleteEmpresaRequest } from '../EmpresaActions';

class EmpresaList extends Component {

  componentDidMount() {

  }

  handleronClickShow(path) {
    browserHistory.push(`empresa/${path}`);
  }

  handleronClickEdit(path) {
    browserHistory.push(`empresa/${path}/edit`);
  }

  handleronClickDel(empresa) {
    if (confirm('Do you want to delete this post')) { // eslint-disable-line
      this.props.dispatch(deleteEmpresaRequest(empresa._id));
      // this.props.dispatch(fetchEmpresas());
    }
  }

  handlerCheck = (empresas) => {
    if (empresas.length > 0) {
      // if (empresas[0] !== null && empresas[0] !== undefined) return true;
      // eslint-disable-next-line
      empresas.map((empresa) => {
        if (empresa != null) return true;
      });
    } else {
      return false;
    }
    return false;
  }

  render() {
    const BuildGrid = (
      <Grid container justify="center" spacing={Number(16)} direction={'row'} alignItems={'center'}>
          {
            this.props.empresas.map((empresa, key) => {
              return (<Grid key={empresa._id ? empresa._id : 'id'} item>
                <Card key={empresa._id ? empresa._id : 'id'}>
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
                    <ListItem>
                      <Typography>
                        {/* SensorList: {empresa.sensorData ? JSON.stringify(empresa.sensorData) : 'error'} */}
                      </Typography>
                    </ListItem>
                  </List>
                  <CardActions>
                    <Button variant={'contained'} onClick={() => { this.handleronClickShow(empresa._id); }}>Mostrar</Button>
                    <Button variant={'contained'} onClick={() => { this.handleronClickEdit(empresa._id); }}>Editar</Button>
                    <Button variant={'contained'} onClick={() => { this.handleronClickDel(empresa); }}>Deletar</Button>
                  </CardActions>
                </Card>
              </Grid>);
            })
          }
      </Grid>
    );
    return (
      <div >
        <Grid container spacing={Number(24)} justify="flex-start" direction={'row'} alignItems={'center'} >
          <Grid
            item xs={12}
          >
            {/* props:{JSON.stringify(this.props)} */}
            <div></div>
            {
              this.handlerCheck(this.props.empresas) ? <div>{JSON.stringify(this.props.empresas)}</div> : BuildGrid
            }
          </Grid>
        </Grid>
      </div>
    );
  }
}

EmpresaList.propTypes = {
  router: PropTypes.object,
  classes: PropTypes.object,
  empresas: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
  };
}

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(EmpresaList);
