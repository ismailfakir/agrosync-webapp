import axios from './axiosInstance'; // or wherever your instance is

// Define response shapes
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

// ─── Generics make it very pleasant to use ───
export const getUsers = async (): Promise<User[]> => {
  const { data } = await axios.get<User[]>('/users');
  return data;
};

export const getUserById = async (id: number | string): Promise<User> => {
  const { data } = await axios.get<User>(`/users/${id}`);
  return data;
};

export const createUser = async (user: CreateUserDto): Promise<User> => {
  const { data } = await axios.post<User>('/users', user);
  return data;
};

export const updateUser = async (
  id: number | string,
  updates: Partial<CreateUserDto>
): Promise<User> => {
  const { data } = await axios.patch<User>(`/users/${id}`, updates);
  return data;
};

export const deleteUser = async (id: number | string): Promise<void> => {
  await axios.delete(`/users/${id}`);
};