import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Bar } from 'react-chartjs-2';

import { Paper } from '@material-ui/core';



export class SensorChart extends Component {
  static propTypes = {
    prop: PropTypes
  }
  state = {
    data: [],
    labels: [],
  }

  // dataDumb = {
  //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //   datasets: [
  //     {
  //       label: 'My First dataset',
  //       backgroundColor: 'rgba(255,99,132,0.2)',
  //       borderColor: 'rgba(255,99,132,1)',
  //       borderWidth: 1,
  //       hoverBackgroundColor: 'rgba(255,99,132,0.4)',
  //       hoverBorderColor: 'rgba(255,99,132,1)',
  //       data: [],
  //       // data: [65, 59, 80, 81, 56, 55, 40],
  //     },
  //   ],
  // }

  componentDidMount() {
    let labelArr = [];
    let dataArr = [];
    this.props.data.map((item) => {
      labelArr.push(item.id);
      dataArr.push(item.temp);
      // dataArr.push(item.temp.map((valor) => { return valor; }));
      this.setState({ ['labels']: labelArr });
      this.setState({ ['data']: dataArr });
      this.data = dataArr;
      // return this.setState({ ['label']: item.id });
      return item;
    });
  }

  render() {
    const buildChart = (data) => (
      <Paper>
        <Bar
          data={data}
          width={500}
          height={500}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </Paper>
    );
    return (
      // <div>chart {JSON.stringify(this.props.data)}</div>
      // JSON.stringify(this.label),
      <div>
        {
            JSON.stringify(this.state)
        }
        {
          buildChart({
            labels: this.state.labels,
            datasets: [
              {
                label: 'Dataset Sensor Data',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: this.state.data,
              },
            ],
          })
        }
      </div>
      // buildChart(this.props.data)
    );
  }
}

const mapStateToProps = () => ({
});


export default connect(mapStateToProps)(SensorChart);
