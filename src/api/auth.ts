import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const loginRequest_T = (email: string, password: string) =>
  api.post("/auth/login", { email, password });

export const registerRequest_T = (email: string, password: string) =>
  api.post("/auth/register", { email, password });

// =====================
// src/api/auth.ts (FAKE BACKEND)
// =====================

// Simulated users database
const fakeUsers = [
  { email: "user@test.com", password: "123456", role: "user" },
  { email: "ismail@test.com", password: "open123", role: "user" },
  { email: "admin@test.com", password: "123456", role: "admin" }
];

export type FakeUser = {
  email: string;
  role: "user" | "admin";
};

// Simulate network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const loginRequest = async (email: string, password: string) => {
  await delay(800);

  const user = fakeUsers.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return Promise.reject({
      response: { data: { message: "Invalid email or password" } }
    });
  }

  return Promise.resolve({
    data: {
      user: { email: user.email, role: user.role } as FakeUser,
      token: "fake-jwt-token"
    }
  });
};

export const registerRequest = async (email: string, password: string) => {
  await delay(800);

  const exists = fakeUsers.some(u => u.email === email);
  if (exists) {
    return Promise.reject({
      response: { data: { message: "User already exists" } }
    });
  }

  fakeUsers.push({ email, password, role: "user" });

  return Promise.resolve({
    data: { message: "Registered successfully" }
  });
};