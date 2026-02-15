import React from "react";
import axios from "axios";
import {v4 as uuidv4} from 'uuid';
import { type IoTDevice,type IoTDeviceCommandRequest } from "../types";
import { sendIotDeviceCommand } from "../api/auth";
import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

/**
 * Command enum
 */
const DeviceCommand = {
  ON:"ON",
  OFF:"OFF",
} as const;

export type DeviceCommand = typeof DeviceCommand[keyof typeof DeviceCommand];

/**
 * API helper
 */
async function sendDeviceCommand(
  deviceId: string,
  command: DeviceCommand,
): Promise<void> {

  const uuId = uuidv4();

  const commandData: IoTDeviceCommandRequest = {
    deviceId: deviceId,
    commandId: uuId,
    command:command
  }

  sendIotDeviceCommand(commandData);
}

interface IoTDeviceCommandCardProps {
  devices: IoTDevice[];
}

const IoTDeviceCommandCard: React.FC<IoTDeviceCommandCardProps> = ({
  devices,
}) => {
  const [selectedDeviceId, setSelectedDeviceId] = React.useState<string>("");
  const [currentState, setCurrentState] = React.useState<DeviceCommand | null>(
    null,
  );
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const getState = function (device:IoTDevice) {

  if (device === undefined) {
    return null;
  } else if(device.status === "online"){
    return DeviceCommand.ON;
  }else if(device.status === "offline"){
    return DeviceCommand.OFF;
  }
}

  // Sync state when device selection changes
  React.useEffect(() => {
    const device = devices.find((d) => d._id === selectedDeviceId) as IoTDevice;
    console.log(device)
    setCurrentState(getState(device) as DeviceCommand); //TODO fix
  }, [selectedDeviceId, devices]);

  const handleSend = async (command: DeviceCommand) => {
    if (!selectedDeviceId || loading) return;

    // optimistic update
    setCurrentState(command);
    setLoading(true);
    setError(null);

    try {
      await sendDeviceCommand(selectedDeviceId, command);
    } catch (err) {
      // rollback on failure
      const device = devices.find((d) => d._id === selectedDeviceId) as IoTDevice;
      setCurrentState(getState(device)as DeviceCommand); //TODO fix

      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message);
      } else {
        setError((err as Error).message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ minWidth: 400, maxWidth: 500 }}>
      <CardHeader title="IoT Device Control" />
      <CardContent>
        <Stack spacing={2}>
          <FormControl fullWidth>
            <InputLabel id="device-select-label">Device</InputLabel>
            <Select
              labelId="device-select-label"
              label="Device"
              value={selectedDeviceId}
              onChange={(e) => setSelectedDeviceId(e.target.value)}
            >
              {devices.map((device) => (
                <MenuItem key={device._id} value={device._id}>
                  {device.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <ToggleButtonGroup
            exclusive
            fullWidth
            value={currentState}
            disabled={!selectedDeviceId || loading}
            onChange={(_, value) => value && handleSend(value)}
          >
            <ToggleButton value={DeviceCommand.ON} color="success">
              ON
            </ToggleButton>
            <ToggleButton value={DeviceCommand.OFF} color="error">
              OFF
            </ToggleButton>
          </ToggleButtonGroup>

          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default IoTDeviceCommandCard;