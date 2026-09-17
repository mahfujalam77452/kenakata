const STORAGE_KEY = "kenakata_auth";

interface StoredSession {
  accessToken: string;
  refreshToken: string;
  savedAt: number; // epoch ms, used to expire the session client-side
}


// "logged out" after this window so the checkout redirect behaves sensibly.
const SESSION_MAX_AGE_MS = 15 * 60 * 1000;

export function saveSession(tokens: { access_token: string; refresh_token: string }) {
  if (typeof window === "undefined") return;
  const session: StoredSession = {
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    savedAt: Date.now(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function getSession(): StoredSession | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredSession;
  } catch {
    return null;
  }
}

export function isLoggedIn(): boolean {
  const session = getSession();
  if (!session) return false;
  return Date.now() - session.savedAt < SESSION_MAX_AGE_MS;
}

export function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}