import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import IoTDeviceCommandCard from "../components/IoTDeviceCommandCard";
import IoTDeviceSaveCard from "../components/IoTDeviceSaveCard";
import IoTDeviceTable from "../components/IoTDeviceTable";
import { useGlobalAlert } from "../components/GlobalAlertProvider";
import { listIotDevices, sendIotDeviceCommand } from "../api/auth";
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

export default function Dashboard() {
  const [devices, setDevices] = useState<IoTDevice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = localStorage.getItem("user");
  const { showAlert } = useGlobalAlert();

  const notYetImplemented= async () =>{
    showAlert({
      severity: "error",
      message: "operation not yet implemented",
      autoHideDuration: 2000,
    });

  }

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
    notYetImplemented();
  };
  const editDevice = () => {
    notYetImplemented();
  };
  const deleteDevice = () => {
    notYetImplemented();
  };
  const controllDevice = () => {
    notYetImplemented();
  };
  const rowClick = () => {
    notYetImplemented();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h3" gutterBottom>
        User Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid size={6}>
          <IoTDeviceCommandCard devices={devices} />
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
        <Stack direction="row" spacing={1}>
          <Chip label={user} color="primary" variant="outlined" />
        </Stack>
      </Stack>
    </Box>
  );
}
