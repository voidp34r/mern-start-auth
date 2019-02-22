import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import mongoose from 'mongoose';
import { Button, Paper, Card, CardContent, CardActions, List, ListItem, TextField } from '@material-ui/core';

import { addSensorRequest } from '../SensorActions';
class SensorAdd extends Component {
  state = {
    _id: '156151131515',
    id: 'id001',
    datatime: '2019-02-21T22:26:55',
    data: [{
      _id: '',
      id: 'data01',
      temp: 11,
      datatime: '2019-02-21T22:26:55.151Z',
    }],
  }

  componentDidMount() {

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


  handleAddSensor() {
    this.props.dispatch(addSensorRequest(this.state, this.props.params.cuid));
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
                <div>Sensor Add</div>
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
                      id="datetime-local"
                      label="datatime"
                      type="datetime-local"
                      // defaultValue="2017-05-24T10:30"
                      value={this.state.datatime}
                      onChange={this.handleChange('datatime')}
                      // className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </ListItem>
                </List>
              </CardContent>
              <CardActions>
                <Button variant={'contained'} onClick={() => console.log(this.state)}>Limpar</Button>
                <Button variant={'contained'} color={'primary'} onClick={() => this.handleAddSensor()}>Criar Sensor</Button>
              </CardActions>
            </form>
          </Card>
        </Paper>
      </div>
    );
  }
}

SensorAdd.propTypes = {
  router: PropTypes.object,
  params: PropTypes.object,
  // empresas: PropTypes.arrayOf(PropTypes.shape({
  //   name: PropTypes.string.isRequired,
  // })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({

});

// const mapDispatchToProps = {

// };

export default connect(mapStateToProps)(SensorAdd);
