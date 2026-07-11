const API_URL = "http://localhost:5000/api/auth";

export type SessionUser = {
  id: number;
  name: string;
  email: string;
};

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

  return data;
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

  return data;
}

// =======================
// Get Current User
// =======================
export function getUser(): SessionUser | null {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem(USER_KEY);

  if (!user) return null;

  return JSON.parse(user);
}

// =======================
// Get JWT Token
// =======================
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// =======================
// Logout
// =======================
export function signOut() {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
}

// =======================
// Check Login
// =======================
export function isLoggedIn() {
  return !!localStorage.getItem(TOKEN_KEY);
}
