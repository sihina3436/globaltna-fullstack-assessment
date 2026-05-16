import axios from "axios";

const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type LoginDto = { email: string; password: string };
export type RegisterDto = { name: string; email: string; password: string };

type AuthResponse = {
  success: boolean;
  token: string;
  data?: { id: string; name: string; email: string };
  message?: string;
};

export async function login(dto: LoginDto): Promise<AuthResponse> {
  const { data } = await axios.post<AuthResponse>(`${BASE}/api/auth/login`, dto);
  return data;
}

export async function register(dto: RegisterDto): Promise<AuthResponse> {
  const { data } = await axios.post<AuthResponse>(`${BASE}/api/auth/register`, dto);
  return data;
}