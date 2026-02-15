import Stack from "@mui/material/Stack";
import MqttConsole from "../components/mqtt/MqttConsole";
export default function Admin() {
return (
    <>
      <h1>Admin Panel</h1>
      <Stack spacing={2} direction="row">
        <MqttConsole/>
      </Stack>
    </>
  );
}