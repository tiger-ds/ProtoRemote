import React from 'react';
import { Slider, Stack, Typography } from '@mui/material';
import { VolumeDown, VolumeUp } from '@mui/icons-material';

export default function SliderExample() {
    const [value, setValue] = React.useState(128);

    const handleChange = (_: any, newValue : any) => {
        setValue(newValue);
        console.log(newValue);
    };

    return (
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <VolumeDown />
        <Slider aria-label="Volume" value={value} onChange={handleChange} valueLabelDisplay="on" min={0} max={255}/>
        <VolumeUp />
      </Stack>
    );
}