import React from 'react';
import Plot from 'react-plotly.js';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
}

  layout = {
    width: '100%', height: '640', title: 'Historical Chart',
    xaxis: {
        range: ['2021-07-01', '2021-12-31'],
        autorange: true,
        type: 'date'
      },
      yaxis: {
        autorange: true,
        range: ['6.8700008333', '13338.870004167'],
        type: 'linear'
      }
  }

  render() {
    return this.props.data?.length ? (
      <Plot
        data = { this.props.data }
        layout={ this.layout }
        style = {{width: '100%'}}
      />
    )
    :<></>;
  }
}

export default Graph;