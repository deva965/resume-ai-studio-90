const KEY = "resumely.auth";

export type SessionUser = {
  name: string;
  email: string;
};

export function getUser(): SessionUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function signIn(user: SessionUser) {
  localStorage.setItem(KEY, JSON.stringify(user));
}

export function signOut() {
  localStorage.removeItem(KEY);
}
