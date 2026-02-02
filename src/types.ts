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
export interface UserListResponse {
  users: User[];
  total: number;
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
