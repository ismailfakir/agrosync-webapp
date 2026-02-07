import React from "react";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

interface SensorDataViewerProps {
  data: unknown;
  title?: string;
}

export const SensorDataViewer: React.FC<SensorDataViewerProps> = ({ data, title }) => {
  return (
    <Stack spacing={1} sx={{ alignItems: 'center' }}>
      {title && (
        <h3 className="mb-2 font-semibold text-sm text-gray-700">{title}</h3>
      )}

      {/* <Stack direction="row" spacing={1} sx={{ alignItems: 'right' }}>
        <Chip label={"Time: "+data.updated_at} color="primary" variant="outlined"/>
        <Chip label={"Device Name: "+data.device_name} color="primary" variant="outlined"/>
        <Chip label={"Temperature: "+data.temperature} color="success" variant="outlined"/>
        <Chip label={"Humidity: "+data.humidity} color="primary" variant="outlined"/>
        
      </Stack> */}
      <Chip label={JSON.stringify(data)} color="primary" variant="outlined"/>
    </Stack>
  );
};
