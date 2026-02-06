import React, { useEffect, useState } from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IoTDeviceCommandCard from "../components/IoTDeviceCommandCard";
import IoTDeviceSaveCard from "../components/IoTDeviceSaveCard";
import IoTDeviceTable from "../components/IoTDeviceTable";
import { useGlobalAlert } from "../components/GlobalAlertProvider";
import { listIotDevices } from "../api/auth";
import { type IoTDevice } from "../types";
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
/* export interface IoTDevice {
  id: string;
  name: string;
  deviceId: string;
  location?: string;
  status: DeviceStatus;
} */
export default function Dashboard() {

  const [devices, setDevices] = useState<IoTDevice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const user = localStorage.getItem("user");
  const { showAlert } = useGlobalAlert();

  useEffect(() => {
    const fetchIotDevices = async () => {
      try {
        const response = await listIotDevices();
        
        setDevices(response);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIotDevices();
  }, []);
  
  const refetchDevices = async () => {
    try {
        const response = await listIotDevices();
        
        setDevices(response);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
  };
  const fetchDevices = async () => {
     //const res: IoTDeviceListResponse = await listIotDevices();
    
    /* showAlert({
      severity: "success",
      message: "devices: "+res,
      autoHideDuration: 6000,
    }); */
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
  
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h3" gutterBottom>
        User Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid size={6}>
          <IoTDeviceCommandCard
            devices={devices}
          />
        </Grid>
        <Grid size={6}>
          <IoTDeviceSaveCard onSaved={() => refetchDevices()} />
        </Grid>
        <Grid size={12}>
          <IoTDeviceTable
            devices={devices}
            onRefresh={() => fetchDevices()}
            onEdit={() => editDevice()}
            onDelete={() => deleteDevice()}
            onControl={() => controllDevice()}
            onRowClick={() => rowClick()}
          />
        </Grid>
      </Grid>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Typography variant="h6" gutterBottom>
          {user}
        </Typography>
      </Stack>
    </Box>
  );
}
