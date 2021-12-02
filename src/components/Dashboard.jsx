import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';
import SelectMetric from './SelectMetric';
import { withStyles } from '@material-ui/core/styles';
import GetChart from './Chart';
// import LiveData from './LiveData';

const client = new ApolloClient({
  uri: 'https://react.eogresources.com/graphql',
  cache: new InMemoryCache(),
});

const useStyles = (theme) => ({
  selectMetricContainer: {
    width: 'calc(100% - 40px)',
    margin: '10px 20px',
  },
  chartContainerMain:{
    width: '100%',
    float: 'left',
    margin: '20px 0',
    boxSizing: 'border-box'
  }
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSelectedMetric: []
    }
}

  onMetricChange = (event, value) => {
    this.setState({currentSelectedMetric: value})
  }

  render() {
    const { classes } = this.props;
    return (
      <ApolloProvider client={client}>
        <div className = {classes.selectMetricContainer} >
          <SelectMetric
            onChange = {this.onMetricChange}/>
        </div>
        <div className = {classes.chartContainerMain}>
          <GetChart
            metric = { this.state.currentSelectedMetric }
            />
            {/* <LiveData/> */}
        </div>
      </ApolloProvider>
    );
  }
}

export default withStyles(useStyles)(Dashboard)
