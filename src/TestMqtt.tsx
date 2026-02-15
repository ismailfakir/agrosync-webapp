import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import "./App.css";
import mqtt from "mqtt";

function TestMqtt() {
  /* ========= ENV CONFIG ========= */
  const MQTT_BROKER_URL = import.meta.env.VITE_MQTT_BROKER_URL as string;
  const MQTT_USERNAME = import.meta.env.VITE_MQTT_USERNAME as string;
  const MQTT_PASSWORD = import.meta.env.VITE_MQTT_PASSWORD as string;

  const randomTemparature = function generateRandomInteger(): number {
    return Math.floor(10 - 0.5 + Math.random() * (100 - 10 + 1));
  };

  const client = mqtt.connect(
    MQTT_BROKER_URL,
    {
      username: MQTT_USERNAME,
      password: MQTT_PASSWORD,
    },
  );

  client.on("connect", () => {
    console.log("🌐 Connected via WebSocket");

    client.subscribe("agrosync/sensoreData");
    client.publish("agrosync/sensoreData", "Hello, HiveMQ! from Agrosync");
  });

  client.on("message", (topic, message) => {
    console.log(topic, message.toString());
  });

  function publishMqtt() {
    client.publish(
      "agrosync/sensoreData",
      "temparature:" + randomTemparature(),
    );
  }

  return (
    <>
      <h1>Agrosync webapp</h1>
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={() => publishMqtt()}>
          publish
        </Button>
      </Stack>
    </>
  );
}

export default TestMqtt;
