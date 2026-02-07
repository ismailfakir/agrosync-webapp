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

// =====================
// USER TYPES
// =====================
export interface User {
  id: number;
  email: string;
  name: string;
  roles: string[];
}
export interface RoleBackend {
  _id: number;
  name: string;
  __v: number;
  permissions:string[];
  updatedAt: Date;
}
export interface UserBackend {
  _id: number;
  email: string;
  name: string;
  roles: RoleBackend[];
  __v: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface UserListResponse {
  users: UserBackend[];
}
export interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
}
export interface RegisterUserResponse {
  token: string;
  user: User;
}
export interface UserLoginRequest {
  email: string;
  password: string;
}
export interface UserLoginResponse {
  token: string;
  user: User;
}
/* export interface RegisterUserResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
    roles: string[];
  };
} */

// =====================
// DEVICE TYPES
// =====================

export interface SaveIoTDeviceRequest {
  name: string;
  location: string;
  type: string;
}

export interface SaveIoTDeviceResponse {
  _id: string;
  __v: number;
  name: string;
  location: string;
  type: string;
  status: string;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IoTDeviceOwner = {
  _id: string;
  name: string;
  email: string;
};

export type IoTDevice = {
  _id: string;
  __v: number;
  name: string;
  location: string;
  type: string;
  status: string;
  owner: IoTDeviceOwner;
  createdAt: Date;
  updatedAt: Date;
};

export type IoTDeviceListResponse = {
  devices: IoTDevice[];
};

export type IoTDeviceCommandRequest = {
  commandId: string;
  deviceId: string;
  command: string;
};

export type IoTDeviceCommandResponse = {
  commandId: string;
  deviceId: string;
  commandResponse: string;
};
