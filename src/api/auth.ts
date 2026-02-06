import axios from "axios";
import { type RegisterUserRequest, type RegisterUserResponse, type UserLoginRequest, type UserLoginResponse,type SaveIoTDeviceRequest,type SaveIoTDeviceResponse, type IoTDeviceListResponse } from "../types";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  //withCredentials: true,
});

// check https://medium.com/@ignatovich.dm/creating-a-type-safe-api-client-with-typescript-and-react-ce1b82bf8b9b
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export const loginRequest = (email: string, password: string) =>
  api.post("/auth/login", { email, password });

/* export const registerRequest = (
  email: string,
  password: string,
  name: string,
) => api.post("/auth/register", { email, password, name }); */

export const registerUser = async (
  userData: RegisterUserRequest
): Promise<RegisterUserResponse> => {
  const response = await api.post<RegisterUserResponse>("/auth/register", userData);

  return response.data;
};

export const loginUser = async (
  userData: UserLoginRequest
): Promise<UserLoginResponse> => {
  const response = await api.post<UserLoginResponse>("/auth/login", userData);

  return response.data;
};

// =====================
// DEVICES
// =====================
export const saveIotDevice = async (
  deviceData: SaveIoTDeviceRequest
): Promise<SaveIoTDeviceResponse> => {
  const response = await api.post<SaveIoTDeviceResponse>("/devices", deviceData);
  console.log(response.data);

  return response.data;
};

export const listIotDevices = async (): Promise<IoTDeviceListResponse> => {
  const response = await api.get<IoTDeviceListResponse>("/devices");
  console.log(response.data);
  return response.data;
};

// =====================
// src/api/auth.ts (FAKE BACKEND)
// =====================

// Simulated users database
const fakeUsers = [
  { email: "user@test.com", password: "123456", role: "user" },
  { email: "ismail@test.com", password: "open123", role: "user" },
  { email: "admin@test.com", password: "123456", role: "admin" },
];

export type FakeUser = {
  email: string;
  role: "user" | "admin";
};

// Simulate network delay
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const loginRequest_T = async (email: string, password: string) => {
  await delay(800);

  const user = fakeUsers.find(
    (u) => u.email === email && u.password === password,
  );

  if (!user) {
    return Promise.reject({
      response: { data: { message: "Invalid email or password" } },
    });
  }

  return Promise.resolve({
    data: {
      user: { email: user.email, role: user.role } as FakeUser,
      token: "fake-jwt-token",
    },
  });
};

export const registerRequest_T = async (email: string, password: string) => {
  await delay(800);

  const exists = fakeUsers.some((u) => u.email === email);
  if (exists) {
    return Promise.reject({
      response: { data: { message: "User already exists" } },
    });
  }

  fakeUsers.push({ email, password, role: "user" });

  return Promise.resolve({
    data: { message: "Registered successfully" },
  });
};
