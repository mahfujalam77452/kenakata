export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
}