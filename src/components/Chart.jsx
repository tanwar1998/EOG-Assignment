import React, { FC, useEffect, useState } from 'react';
import {
  useQuery,
  gql,
} from '@apollo/client';
import LinearProgress from '@material-ui/core/LinearProgress';
import Graph from './Graph';

const colorList = [
  '#db9310',
  '#6ac507',
  '#07c599',
  '#070dc5',
  '#c507ae',
  '#db1010'
]

const query = gql`
  query ($input: [MeasurementQuery]) {
    getMultipleMeasurements(input: $input) {
      measurements{
        at,
        metric,
        unit,
        value,
        __typename
      }
      metric
      __typename
    }
  }
`;

// interface MeasurementObject {
//   at: number,
//   metric: string,
//   unit: string,
//   value: number,
//   __typename: string
// };

// interface MeasurementQuery  {
//   metric: string,
//   measurements: Array<MeasurementObject>;
//   __typename: string
// };


// type WeatherDataResponse = {
//   getMultipleMeasurements: Array<MeasurementQuery>;
// };

// const GetChart: FC = () => {
export default (props) => {
  const [dateBeforeHalfHour, setDateBeforeHalfHour] = useState(new Date( new Date().getTime() - 30000 * 60 ).getTime());
  const [tmpGraphData, setTmpGraphData] = useState(null);

  const input = props.metric?.map((tmpMetric) => {
    return {metricName : tmpMetric.value, after: dateBeforeHalfHour}
  })
  
  const { loading, error, data:metricResponseData } = useQuery(query, {
      variables: {
          input,
      },
  });

  useEffect(() => {
    if(metricResponseData){
      const tmpGraphDataList = [];
      metricResponseData.getMultipleMeasurements.forEach((tmpQueryResult, index) => {
        const { metric, measurements, __typename } = tmpQueryResult;
        const xAxis = [];
        const yAxis = [];
        measurements.forEach((tmpMeasure)=>{
            xAxis.push(new Date(tmpMeasure.at))
            yAxis.push(tmpMeasure.value)
        })

        const tmpWaterTempData =  {
            type: "scatter",
            mode: "lines",
            name: metric,
            x: xAxis,
            y: yAxis,
            line: {color: colorList[index]}
        }
        tmpGraphDataList.push(tmpWaterTempData);
      })
      setTmpGraphData(tmpGraphDataList)
    }
          
  },[metricResponseData])
  
  if (loading) return <LinearProgress />;
  
  return (
    <Graph
      data = { tmpGraphData }
    />
  );
};
