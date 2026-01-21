import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import "./App.css";
import MqttConsole from "./components/mqtt/MqttConsole"

function App() {

  return (
    <>
      <h1>Agrosync webapp</h1>
      <Stack spacing={2} direction="row">
        <MqttConsole/>
      </Stack>
    </>
  );
}

export default App;
