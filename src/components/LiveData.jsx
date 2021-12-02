import React, { FC, useEffect, useState } from 'react';
import {
  gql,
  useSubscription
} from '@apollo/client';

const query = gql`
subscription ($input: [MeasurementQuery]) {
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

function LiveData({  }) {
    const [dateBeforeHalfHour, setDateBeforeHalfHour] = useState(new Date( new Date().getTime() - 30000 * 60 ).getTime());
    const [tmpGraphData, setTmpGraphData] = useState(null);
  
    // const input = props.metric?.map((tmpMetric) => {
    //   return {metricName : tmpMetric.value, after: dateBeforeHalfHour}
    // })
    const input = [
        {metricName : 'waterTemp', after: dateBeforeHalfHour}
    ]

  const { data, loading } = useSubscription(
    query,
    { variables: { input } }
  );
  return <h4>New comment: {!loading && 'loaded successfuly'}</h4>;
}

export default LiveData;