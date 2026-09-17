import { LoginPayload,AuthTokens,AuthUser,RegisterPayload } from "@/lib/types/auth";

const base = process.env.NEXT_PUBLIC_BASE_API;

// Login
export async function login(payload: LoginPayload): Promise<AuthTokens> {
  const url = `${base}/auth/login`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json();

    throw new Error(errorData.message || "Something went wrong!");
  }

  return await res.json();
}

// Get Profile
export async function getProfile(
  accessToken: string
): Promise<AuthUser> {
  const url = `${base}/auth/profile`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Something went wrong!");
  }

  return await res.json();
}

// Register
export async function register(
  payload: RegisterPayload
): Promise<AuthUser> {
  const url = `${base}/users/`;
  console.log(payload);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      password: payload.password,
      avatar: "https://placehold.co/200x200?text=User"
    }),
  });
   console.log("I am response ",res)
  if (!res.ok) {
    const errorData = await res.json();
    
    throw new Error(errorData.message || "Something went wrong!");
  }

  return await res.json();
}