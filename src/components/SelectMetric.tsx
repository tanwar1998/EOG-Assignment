import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

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

const metricsList = [
    { label: 'WaterTemp', value: 'waterTemp' },
    { label: 'flareTemp', value: 'flareTemp' },
    { label: 'injValveOpen', value: 'injValveOpen' },
    { label: 'tubingPressure', value: 'tubingPressure' },
    { label: 'casingPressure', value: 'casingPressure' },
    { label: 'oilTemp', value: 'oilTemp' }
]

type Props = { 
    onChange: (event: React.SyntheticEvent<Element, Event>, value: { label: string; value: string; }[]) => void
  };

const SelectMetric = (props: Props) => {
  const classes = useStyles();
    return (
        <Stack spacing={3} className = { classes.stackContainer }>
            <Autocomplete
                multiple
                id="tags-outlined"
                options={metricsList}
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

