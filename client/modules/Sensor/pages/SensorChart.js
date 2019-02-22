import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Bar, Line, HorizontalBar } from 'react-chartjs-2';

import { Paper, List, ListItem, Card, Typography, Chip, Avatar, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export class SensorChart extends Component {
  static propTypes = {
    prop: PropTypes
  }
  state = {
    data: [],
    labels: [],
  }
  componentDidMount() {
    const labelArr = [];
    const dataArr = [];
    this.props.data.map((item) => {
      if (item.temp[0] > 37) {
        this.up37.push(item);
      }
      labelArr.push(item.id);
      dataArr.push(item.temp);
      this.data.push(item.temp);
      this.setState({ ['labels']: labelArr });
      this.setState({ ['data']: dataArr });
      // this.state.data = dataArr;
      return item;
    });
  }

  data = [];
  up37 = [];

  average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;

  median = (array) => {
    array.sort((a, b) => {
      return a - b;
    });
    const mid = array.length / 2;
    return mid % 1 ? array[mid - 0.5] : (array[mid - 1] + array[mid]) / 2;
  }
  sum = (array) => {
    let num = 0;
    for (let i = 0, l = array.length; i < l; i++) num += array[i];
    return num;
  }

  mean = (array) => {
    return this.sum(array) / array.length;
  }

  variance = (array) => {
    const mean = this.mean(array);
    return this.mean(array.map((num) => {
      return Math.pow(num - mean, 2);
    }));
  }

  standardDeviation = (array) => {
    return Math.sqrt(this.variance(array));
  }

  meanAbsoluteDeviation = (array) => {
    const mean = this.mean(array);
    return this.mean(array.map((num) => {
      return Math.abs(num - mean);
    }));
  }

  zScores = (array) => {
    const mean = this.mean(array);
    const standardDeviation = this.standardDeviation(array);
    return array.map((num) => {
      return (num - mean) / standardDeviation;
    });
  }

  dataDumb = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  }

  render() {
    const buildChartBar = (data) => (
      <Paper>
        <Bar
          data={data}
          width={500}
          height={500}
          options={{
            maintainAspectRatio: true,
          }}
        />
      </Paper>
    );
    const buildChartBarHorizontal = (data) => (
      <Paper>
        <HorizontalBar
          data={data}
          width={500}
          height={500}
          options={{
            maintainAspectRatio: true,
          }}
        />
      </Paper>
    );
    const buildChartLine = (data) => (
      <Paper>
        <Line
          data={data}
          width={500}
          height={500}
          options={{
            maintainAspectRatio: true,
          }}
        />
      </Paper>
    );
    return (
      <div>
        {
            // JSON.stringify(this.state)
        }
        <Card>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography > Estatistic </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <ListItem>
                  <Chip
                    avatar={<Avatar>AV</Avatar>}
                    label={`Average : ${this.average(this.state.data)}`}
                  />
                </ListItem>
                <ListItem>
                  <Chip
                    avatar={<Avatar>Min</Avatar>}
                    label={`Min :  ${Math.min.apply(Math, this.state.data)}`}
                  />
                </ListItem>
                <ListItem>
                  <Chip
                    avatar={<Avatar>Max</Avatar>}
                    label={` Max : ${Math.max.apply(Math, this.state.data)}`}
                  />
                </ListItem>
                <ListItem>
                  <Chip
                    avatar={<Avatar>MD</Avatar>}
                    label={`Median: ${this.median(this.state.data)}`}
                  />
                </ListItem>
                <ListItem>
                  <Chip
                    avatar={<Avatar>SD</Avatar>}
                    label={`Standard Deviation: ${this.standardDeviation(this.state.data)}`}
                  />
                </ListItem>
                <ListItem>
                  <Chip
                    avatar={<Avatar>MAD</Avatar>}
                    label={`Mean Absolute Deviation: ${this.meanAbsoluteDeviation(this.state.data)}`}
                  />
                </ListItem>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography> UP 37 </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
              {
                this.up37.map((item, key) => {
                  return (
                    <Card>
                      <ListItem key={key}>
                        <Typography>
                          id :{item.id} Temp :{item.temp} Datatime: {item.datatime}
                        </Typography>
                      </ListItem>
                    </Card>
                  );
                })
              }
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>

        </Card>
        {
          buildChartBar({
            labels: this.state.labels,
            datasets: [
              {
                label: 'Sensor Data',
                backgroundColor: 'rgba(255,99,12,0.2)',
                borderColor: 'rgba(255,99,12,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,12,0.4)',
                hoverBorderColor: 'rgba(255,99,12,1)',
                data: this.data,
              },
            ],
          })
        }
        {
          buildChartBarHorizontal({
            labels: this.state.labels,
            datasets: [
              {
                label: 'Sensor Data',
                backgroundColor: 'rgba(255,1,12,0.2)',
                borderColor: 'rgba(255,1,12,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,1,12,0.4)',
                hoverBorderColor: 'rgba(255,1,12,1)',
                data: this.data,
              },
            ],
          })
        }
        {
          buildChartLine({
            labels: this.state.labels,
            datasets: [
              {
                label: 'Sensor data',
                backgroundColor: 'rgba(14,99,12,0.2)',
                borderColor: 'rgba(13,99,12,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(13,99,12,0.4)',
                hoverBorderColor: 'rgba(13,99,12,1)',
                data: this.data,
              },
            ],
          })
        }
      </div>
    );
  }
}

const mapStateToProps = () => ({
});


export default connect(mapStateToProps)(SensorChart);
