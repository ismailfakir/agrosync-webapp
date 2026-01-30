import React from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Stack,
} from "@mui/material";

/**
 * IoT Device payload
 */
export interface IoTDevicePayload {
  name: string;
  deviceId: string;
  location?: string;
}

/**
 * API helper
 */
async function saveIoTDevice(payload: IoTDevicePayload): Promise<void> {
  await axios.post("/api/iot/devices", payload);
}

interface IoTDeviceSaveCardProps {
  onSaved?: () => void;
}

const IoTDeviceSaveCard: React.FC<IoTDeviceSaveCardProps> = ({ onSaved }) => {
  const [form, setForm] = React.useState<IoTDevicePayload>({
    name: "",
    deviceId: "",
    location: "",
  });
  const [loading, setLoading] = React.useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.deviceId) return;

    setLoading(true);
    try {
      await saveIoTDevice(form);
      setForm({ name: "", deviceId: "", location: "" });
      onSaved?.();
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
            label="Device ID"
            name="deviceId"
            value={form.deviceId}
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
          />

          <Button
            variant="contained"
            disabled={loading || !form.name || !form.deviceId}
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
