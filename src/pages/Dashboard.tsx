import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IoTDeviceCommandCard from "../components/IoTDeviceCommandCard";
import IoTDeviceSaveCard from "../components/IoTDeviceSaveCard";
import IoTDeviceTable from "../components/IoTDeviceTable";
import { useGlobalAlert } from "../components/GlobalAlertProvider";
/**
 * Command enum
 */
export enum DeviceCommand {
  ON = "ON",
  OFF = "OFF",
}
export enum DeviceStatus {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}
export interface IoTDevice {
  id: string;
  name: string;
  deviceId: string;
  location?: string;
  status: DeviceStatus;
}
export default function Dashboard() {
  const { showAlert } = useGlobalAlert();
  const refetchDevices = () => {};
  const fetchDevices = () => {
    showAlert({
      severity: "error",
      message: "Failed to connect to device",
      autoHideDuration: 6000,
    });
  };
  const editDevice = () => {
    showAlert({
      severity: "success",
      message: "Device command sent successfully",
    });
  };
  const deleteDevice = () => {};
  const controllDevice = () => {};
  const rowClick = () => {};
  const devices1 = [
    {
      id: "lamp-001",
      name: "Living Room Lamp",
      deviceId: "1001",
      location: "home",
      status: DeviceStatus.OFFLINE,
    },
    {
      id: "lamp-002",
      name: "Outside Lamp",
      deviceId: "1002",
      location: "home",
      status: DeviceStatus.ONLINE,
    },
    {
      id: "lamp-003",
      name: "Bed Room Lamp",
      deviceId: "1003",
      location: "home",
      status: DeviceStatus.OFFLINE,
    },
  ];
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h3" gutterBottom>
        User Dashboard
      </Typography>
      <IoTDeviceTable
        devices={devices1}
        onRefresh={() => fetchDevices()}
        onEdit={() => editDevice()}
        onDelete={() => deleteDevice()}
        onControl={() => controllDevice()}
        onRowClick={() => rowClick()}
      />
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <IoTDeviceSaveCard onSaved={() => refetchDevices()} />

        <IoTDeviceCommandCard
          devices={[
            {
              id: "lamp-001",
              name: "Living Room Lamp",
              state: DeviceCommand.ON,
            },
            {
              id: "lamp-002",
              name: "Bedroom Lamp",
              state: DeviceCommand.OFF,
            },
          ]}
        />
      </Stack>
    </Box>
  );
}
