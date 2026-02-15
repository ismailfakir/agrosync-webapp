import { useEffect, useState } from "react";
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
  const [error, setError] = useState<string | null>(null);

  //const user = localStorage.getItem("user");
  const { showAlert } = useGlobalAlert();

  const notYetImplemented = async () => {
    showAlert({
      severity: "error",
      message: "operation not yet implemented",
      autoHideDuration: 2000,
    });
  };

  useEffect(() => {
    let isMounted = true;

    const fetchIotDevices = async () => {
      setLoading(true);

      try {
        const response = await listIotDevices();

        if (isMounted) {
          setDevices(response);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          //setError(err.message || 'Failed to load users');
          setError(
            err?.response?.data?.message ||
              "failed to load devices from backend",
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchIotDevices();
    return () => {
      isMounted = false;
    };
  }, []);

  /* useEffect(() => {
    const fetchIotDevices = async () => {
      try {
        const response = await listIotDevices();

        setDevices(response);
        setError(null);
      } catch (err:any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIotDevices();
  }, []); */

  /* const refetchDevices = async () => {
    try {
      const response = await listIotDevices();

      setDevices(response);
      setError(null);
    } catch (err:any) {
      setError(err?.response?.data?.message || "failed to load devices from backend");
    } finally {
      setLoading(false);
    }
  }; */
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

  if (loading) return <div>Loading devices...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h3" gutterBottom>
        User Devices
      </Typography>

      <Typography variant="h6" gutterBottom>
        {error}
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
