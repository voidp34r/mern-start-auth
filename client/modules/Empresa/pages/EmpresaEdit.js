import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import mongoose from 'mongoose';
import { Button, Paper, Card, CardContent, CardActions, List, ListItem, Typography, TextField } from '@material-ui/core';

import { fetchEmpresa } from '../EmpresaActions';
export class EmpresaEdit extends Component {

  componentWillMount() {
    this.props.dispatch(fetchEmpresa(this.props.params.cuid));
    this.handleLoadCard();
  }

  componentDidMount() {
    this.handleLoadCard();
  }

  handleSaveEmpresa() {
    // this.props.dispatch(addEmpresaRequest(this.state));
    // this.props.dispatch(fetchEmpresas());
  }

  handleLoadCard() {
    this.setState({
      _id: this.props.empresas[0]._id,
      id: this.props.empresas[0].id,
      name: this.props.empresas[0].name,
    });
  }

  handleGenerate() {
    const uid = new mongoose.Types.ObjectId();
    this.setState({ _id: uid });
  }

  handleChange = name => event => {
    // console.table({ _name: name, _eventTarget: event.target, _eventTargetValue: event.target.value }, [name, event.target.value, event.target]);
    this.setState({ [name]: event.target.value });
  };

  render() {
    return (
      <div>
        <Paper >
          <Card >
            <form noValidate autoComplete="off">
              <CardContent>
                <div>Empresa Edit</div>
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
                      sensorData {JSON.stringify(this.props.empresas[0])}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>
                    sensorData {JSON.stringify(this.state)}
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

EmpresaEdit.propTypes = {
  router: PropTypes.object,
  params: PropTypes.object,
  empresas: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  empresas: store.empresas.data,
});

export default connect(mapStateToProps)(EmpresaEdit);
