import React, { useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import {
  useQuery,
  gql,
} from '@apollo/client';

const useStyles = makeStyles({
  wrapper: {
    height: '100vh',
  },
  stackContainer:{
    background: '#fff',
    margin: '20px 0 10px',
    width: '100%',
    maxWidth: '500px',
    float: 'right'
  }
});



const query = gql`
     {
        getMetrics,
      __typename
    }
`;


const SelectMetric = (props) => {
  const [metricList, setMetricList] = useState([]);
  const classes = useStyles();
  const { loading, error, data:metricResponseData } = useQuery(query);
  
  useEffect(() => {
    if(metricResponseData){
      const tmpMetricList = [];
      metricResponseData.getMetrics.forEach((tmpQueryResult, index) => {
        const tmpMetric = {
            label: tmpQueryResult, value: tmpQueryResult
        }
        tmpMetricList.push(tmpMetric);
      })
      setMetricList(tmpMetricList)
    }
          
  },[metricResponseData])
  

    return (
        <Stack spacing={3} className = { classes.stackContainer }>
            <Autocomplete
                multiple
                id="tags-outlined"
                options={metricList}
                getOptionLabel={(option) => option?.label}
                onChange = { props.onChange }
                filterSelectedOptions
                renderInput={(params) => (
                <TextField
                    {...params}
                    label="Select Metric"
                    placeholder="Metric"
                />
                )}
            />
        </Stack>

    )
};

export default SelectMetric;

