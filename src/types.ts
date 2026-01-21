export interface MqttMessage {
  topic: string;
  payload: string;
  time: string;
}

export type QoS = 0 | 1 | 2;

export type MqttStatus =
  | "Connected"
  | "Disconnected"
  | "Reconnecting"
  | "Error";
