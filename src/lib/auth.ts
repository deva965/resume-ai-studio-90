const API_URL = "https://resume-ai-studio-90-1.onrender.com/api/auth";

export interface SessionUser {
  id: number;
  name: string;
  email: string;
}

const USER_KEY = "resumely.user";
const TOKEN_KEY = "resumely.token";

// =======================
// Register
// =======================
export async function register(
  name: string,
  email: string,
  password: string
) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));

  return data.user;
}

// =======================
// Login
// =======================
export async function login(
  email: string,
  password: string
) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));

  return data.user;
}

// =======================
// Current User
// =======================
export function getUser(): SessionUser | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(USER_KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

// =======================
// JWT Token
// =======================
export function getToken(): string {
  if (typeof window === "undefined") return "";

  return localStorage.getItem(TOKEN_KEY) || "";
}

// =======================
// Logged In?
// =======================
export function isLoggedIn(): boolean {
  return getToken() !== "";
}

// =======================
// Logout
// =======================
export function signOut(): void {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
}
