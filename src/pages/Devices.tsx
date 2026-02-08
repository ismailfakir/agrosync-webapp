import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IoTDeviceTable from "../components/IoTDeviceTable";
import { useGlobalAlert } from "../components/GlobalAlertProvider";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { listIotDevices } from "../api/auth";
import { type IoTDevice } from "../types";

export default function Devices() {
  const [devices, setDevices] = useState<IoTDevice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = localStorage.getItem("user");
  const { showAlert } = useGlobalAlert();

  const notYetImplemented = async () => {
    
    showAlert({
      severity: "error",
      message: "operation not yet implemented",
      autoHideDuration: 2000,
    });
  };

  useEffect(() => {
    const fetchIotDevices = async () => {
      setLoading(true);
      
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
        User Devices
      </Typography>

      {loading && <LoadingIndicator message="Fetching data from server…" />}

      <Grid container spacing={2}>
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
    </Box>
  );
}
