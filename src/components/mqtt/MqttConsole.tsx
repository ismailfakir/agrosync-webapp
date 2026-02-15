import React, { useEffect, useRef, useState } from "react";
import mqtt, { type IClientOptions, type MqttClient } from "mqtt";
import { Card, CardContent, Divider, Typography } from "@mui/material";

import { type MqttMessage, type MqttStatus, type QoS } from "../../types";
import MqttStatusChip from "./MqttStatusChip";
import MqttSubscriber from "./MqttSubscriber";
import MqttPublisher from "./MqttPublisher";
import MqttMessageList from "./MqttMessageList";

/* ENV */
const BROKER_URL = import.meta.env.VITE_MQTT_BROKER_URL as string;
const USERNAME = import.meta.env.VITE_MQTT_USERNAME as string;
const PASSWORD = import.meta.env.VITE_MQTT_PASSWORD as string;

const MqttConsole: React.FC = () => {
  const clientRef = useRef<MqttClient | null>(null);

  const [status, setStatus] = useState<MqttStatus>("Disconnected");
  const [messages, setMessages] = useState<MqttMessage[]>([]);

  const [subTopic, setSubTopic] = useState("/agrosync/sensordata");
  const [pubTopic, setPubTopic] = useState("/agrosync/sensordata");
  const [payload, setPayload] = useState("");
  const [qos, setQos] = useState<QoS>(1);

  useEffect(() => {
    const options: IClientOptions = {
      protocol: "wss",
      username: USERNAME,
      password: PASSWORD,
      clientId: `react-${crypto.randomUUID()}`,
      clean: true,
      reconnectPeriod: 2000,
      connectTimeout: 10_000,
    };

    const client = mqtt.connect(BROKER_URL, options);
    clientRef.current = client;

    client.on("connect", () => {
      setStatus("Connected");
      client.subscribe(subTopic, { qos });
    });

    client.on("reconnect", () => setStatus("Reconnecting"));
    client.on("close", () => setStatus("Disconnected"));
    client.on("error", () => setStatus("Error"));

    client.on("message", (topic, payload) => {
      setMessages((prev) =>
        [
          {
            topic,
            payload: payload.toString(),
            time: new Date().toLocaleTimeString(),
          },
          ...prev,
        ].slice(0, 50),
      );
    });

    return () => {
      client.end(true);
    };
  }, []);

  return (
    <Card sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <CardContent>
        <Typography variant="h5">MQTT Console</Typography>
        <MqttStatusChip status={status} />

        <Divider sx={{ my: 2 }} />

        <MqttSubscriber
          topic={subTopic}
          onTopicChange={setSubTopic}
          onSubscribe={() => clientRef.current?.subscribe(subTopic, { qos })}
        />

        <MqttMessageList messages={messages} />

        <Divider sx={{ my: 2 }} />

        <MqttPublisher
          topic={pubTopic}
          payload={payload}
          qos={qos}
          disabled={status !== "Connected" || !payload}
          onTopicChange={setPubTopic}
          onPayloadChange={setPayload}
          onQosChange={setQos}
          onPublish={() => {
            clientRef.current?.publish(pubTopic, payload, { qos });
            setPayload("");
          }}
        />
      </CardContent>
    </Card>
  );
};

export default MqttConsole;
