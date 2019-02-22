import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Paper, Card, CardContent, CardActions, List, ListItem, TextField } from '@material-ui/core';

class SensorFilter extends Component {
  state = {
    datatimeStart: '2019-02-21T22:26:55',
    datatimeEnd: '2019-02-21T22:26:55',
  }
  componentDidMount() {

  }


  handleFilter() {
  }

  handleGenerate() {
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
                <div>Sensor Filter</div>
                <List>
                  <ListItem>
                    <TextField
                      id="datetime-local-start"
                      label="datatime Start"
                      type="datetime-local"
                      // defaultValue="2017-05-24T10:30"
                      value={this.state.datatimeStart}
                      onChange={this.handleChange('datatimeStart')}
                      // className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      id="datetime-local-end"
                      label="datatime End"
                      type="datetime-local"
                      // defaultValue="2017-05-24T10:30"
                      value={this.state.datatimeEnd}
                      onChange={this.handleChange('datatimeEnd')}
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
                <Button variant={'contained'} color={'primary'} onClick={() => this.handleFilter()}>Search Data</Button>
              </CardActions>
            </form>
          </Card>
        </Paper>
      </div>
    );
  }
}

SensorFilter.propTypes = {
  router: PropTypes.object,
  params: PropTypes.object,
  // empresas: PropTypes.arrayOf(PropTypes.shape({
  //   name: PropTypes.string.isRequired,
  // })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({

});


export default connect(mapStateToProps)(SensorFilter);
