import React from "react";
import { saveIotDevice } from "../api/auth";
import {
  type SaveIoTDeviceRequest,
  type SaveIoTDeviceResponse,
} from "../types";
import { useGlobalAlert } from "../components/GlobalAlertProvider";

import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Stack,
} from "@mui/material";

/**
 * API helper
 */
async function saveDevice(payload: SaveIoTDeviceRequest): Promise<void> {
  const res: SaveIoTDeviceResponse = await saveIotDevice(payload);
  console.log(res);
}

interface IoTDeviceSaveCardProps {
  onSaved?: () => void;
}

const IoTDeviceSaveCard: React.FC<IoTDeviceSaveCardProps> = ({ onSaved }) => {
  const { showAlert } = useGlobalAlert();
  const [form, setForm] = React.useState<SaveIoTDeviceRequest>({
    name: "",
    type: "",
    location: "",
  });
  const [loading, setLoading] = React.useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.type || !form.location) return;

    setLoading(true);
    try {
      await saveDevice(form);
      showAlert({
        severity: "success",
        message: "new Iot Device created",
        autoHideDuration: 6000,
      });
      setForm({ name: "", type: "", location: "" });
      onSaved?.();
    } catch (e: any) {
      showAlert({
        severity: "error",
        message: "failed to save device, cause: "+e.message,
        autoHideDuration: 6000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ minWidth: 400, maxWidth: 500 }}>
      <CardHeader title="Add IoT Device" />
      <CardContent>
        <Stack spacing={2}>
          <TextField
            label="Device Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Device Type"
            name="type"
            value={form.type}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
            fullWidth
            required
          />

          <Button
            variant="contained"
            disabled={loading || !form.name || !form.type}
            onClick={handleSubmit}
          >
            Save Device
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default IoTDeviceSaveCard;
