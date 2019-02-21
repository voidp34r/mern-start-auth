import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import mongoose from 'mongoose';
import { Button, Paper, Card, CardContent, CardActions, List, ListItem, Typography, TextField } from '@material-ui/core';

import { addEmpresaRequest } from '../EmpresaActions';

class EmpresaAdd extends Component {
  state = {
    _id: '156151131515',
    id: 'id001',
    name: 'Matheus Rafael company',
    sensorData: [{
      _id: '156151131515',
      id: 'id001',
      datatime: '',
      data: [{
        _id: '',
        id: 'data01',
        temp: 11,
        datatime: '',
      }],
    }],
  }

  componentDidMount() {

  }

  dummyData = {
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
  }

  handleAddEmpresa() {
    this.props.dispatch(addEmpresaRequest(this.state));
    // this.props.dispatch(fetchEmpresas());
  }

  handleGenerate() {
    const uid = new mongoose.Types.ObjectId();
    this.setState({ _id: uid });
  }

  handleChange = name => event => {
    // eslint-disable-next-line no-console
    console.table({ _name: name, _eventTarget: event.target, _eventTargetValue: event.target.value }, [name, event.target.value, event.target]);
    this.setState({ [name]: event.target.value });
  };
  render() {
    return (
      <div>
        <Paper>
          <Card>
            <form noValidate autoComplete="off">
              <CardContent>
                <div>Empresa Add</div>
                <List>
                  <ListItem>
                    <TextField
                      id="standard-_id"
                      label="_id"
                      // className={classes.textField}
                      variant="outlined"
                      value={this.state._id}
                      onChange={this.handleChange('_id')}
                      margin="normal"
                    />
                    <Button onClick={() => this.handleGenerate()}> + Key Generate</Button>
                  </ListItem>
                  <ListItem>
                    <TextField
                      id="standard-id"
                      label="id"
                      // className={classes.textField}
                      variant="outlined"
                      value={this.state.id}
                      onChange={this.handleChange('id')}
                      margin="normal"
                    />
                  </ListItem>
                  <ListItem>
                    <TextField
                      id="standard-name"
                      label="Name"
                      // className={classes.textField}
                      value={this.state.name}
                      variant="outlined"
                      onChange={this.handleChange('name')}
                      margin="normal"
                    />
                  </ListItem>
                  <ListItem>
                    <Typography>
                      linha 2
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>
                      linha 3
                    </Typography>
                  </ListItem>
                </List>
              </CardContent>
              <CardActions>
                <Button variant={'contained'} onClick={() => (this.state)}>Limpar</Button>
                <Button variant={'contained'} color={'primary'} onClick={() => this.handleAddEmpresa()}>Criar empresa</Button>
              </CardActions>
            </form>
          </Card>
        </Paper>
      </div>
    );
  }
}

EmpresaAdd.propTypes = {
  router: PropTypes.object,
  // params: PropTypes.object,
  // empresas: PropTypes.arrayOf(PropTypes.shape({
  //   name: PropTypes.string.isRequired,
  // })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({

});

// const mapDispatchToProps = {

// };

export default connect(mapStateToProps)(EmpresaAdd);
